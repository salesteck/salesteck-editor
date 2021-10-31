/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module clipboard/dragdrop
 */

/* globals setTimeout, clearTimeout */

import {Plugin} from 'ckeditor5/src/core';
import {LiveRange, MouseObserver} from 'ckeditor5/src/engine';
import {Widget, isWidget} from 'ckeditor5/src/widget';
import {uid, env} from 'ckeditor5/src/utils';

import SalesteckClipboardPipeline from './salesteck-clipboardpipeline';
import SalesteckClipboardObserver from './salesteck-clipboardobserver';

import {throttle, debounce} from 'lodash-es';

import '../theme/clipboard.css';
import '../theme/drad-and-drop.css';
import {DATA_CHILD_COUNT} from "../../../const";
import {_isStrNotEmpty} from "../../../general";
import {createViewElementFromHighlightDescriptor} from "@ckeditor/ckeditor5-engine/src/conversion/downcasthelpers";

import arrowLeft from '../theme/icon/chevron-left.svg';
import boxArrowInDown from '../theme/icon/box-arrow-in-down.svg';
import {
    findDraggableWidget,
    findDropTargetRange,
    getClosestMappedModelElement,
    getFinalDropEffect,
    removeGhostImage, setGhostImageDragging
} from "./utils";
import InlineElement from "../../inline/element/inline-element";
import InlineElementEditing from "../../inline/element/inline-element-editing";
import BlocksEditing from "../../../_block/block/blocks-editing";
import BlockWidgetEditing from "../../block-widget/block-widget-editing";

const DROP_AT = `drop-target`;
const DROP_SELECTED = `drop-element-selected`;
const DROP_IN = `drop-in-target`;
const DROP_AROUND = `drop-around`;
const HOVER_DROP_TARGET = `hover-drop-target`;

const ROOT_MARKER = `root-marker`;

// Drag and drop events overview:
//
//                ┌──────────────────┐
//                │     mousedown    │   Sets the draggable attribute.
//                └─────────┬────────┘
//                          │
//                          └─────────────────────┐
//                          │                     │
//                          │           ┌─────────V────────┐
//                          │           │      mouseup     │   Dragging did not start, removes the draggable attribute.
//                          │           └──────────────────┘
//                          │
//                ┌─────────V────────┐   Retrieves the selected model.DocumentFragment
//                │     dragstart    │   and converts it to view.DocumentFragment.
//                └─────────┬────────┘
//                          │
//                ┌─────────V────────┐   Processes view.DocumentFragment to text/html and text/plain
//                │  clipboardOutput │   and stores the results in data.dataTransfer.
//                └─────────┬────────┘
//                          │
//                          │   DOM dragover
//                          ┌────────────┐
//                          │            │
//                ┌─────────V────────┐   │
//                │     dragging     │   │   Updates the drop target marker.
//                └─────────┬────────┘   │
//                          │            │
//            ┌─────────────└────────────┘
//            │             │            │
//            │   ┌─────────V────────┐   │
//            │   │     dragleave    │   │   Removes the drop target marker.
//            │   └─────────┬────────┘   │
//            │             │            │
//        ┌───│─────────────┘            │
//        │   │             │            │
//        │   │   ┌─────────V────────┐   │
//        │   │   │     dragenter    │   │   Focuses the editor view.
//        │   │   └─────────┬────────┘   │
//        │   │             │            │
//        │   │             └────────────┘
//        │   │
//        │   └─────────────┐
//        │   │             │
//        │   │   ┌─────────V────────┐
//        └───┐   │       drop       │   (The default handler of the clipboard-modified pipeline).
//            │   └─────────┬────────┘
//            │             │
//            │   ┌─────────V────────┐   Resolves the final data.targetRanges.
//            │   │  clipboardInput  │   Aborts if dropping on dragged content.
//            │   └─────────┬────────┘
//            │             │
//            │   ┌─────────V────────┐
//            │   │  clipboardInput  │   (The default handler of the clipboard-modified pipeline).
//            │   └─────────┬────────┘
//            │             │
//            │ ┌───────────V───────────┐
//            │ │  inputTransformation  │   (The default handler of the clipboard-modified pipeline).
//            │ └───────────┬───────────┘
//            │             │
//            │  ┌──────────V──────────┐
//            │  │   contentInsertion  │   Updates the document selection to drop range.
//            │  └──────────┬──────────┘
//            │             │
//            │  ┌──────────V──────────┐
//            │  │   contentInsertion  │   (The default handler of the clipboard-modified pipeline).
//            │  └──────────┬──────────┘
//            │             │
//            │  ┌──────────V──────────┐
//            │  │   contentInsertion  │   Removes the content from the original range if the insertion was successful.
//            │  └──────────┬──────────┘
//            │             │
//            └─────────────┐
//                          │
//                ┌─────────V────────┐
//                │      dragend     │   Removes the drop marker and cleans the state.
//                └──────────────────┘
//
export const DROP_POSITION = {
    in: 'IN',
    on: 'ON',
    before: 'BEFORE',
    after: 'AFTER'
}
/**
 * The drag and drop feature. It works on top of the {@link @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline}.
 *
 * Read more about the clipboard-modified integration in the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 *
 */
export default class SalesteckDragdrop extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckDragdrop';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [SalesteckClipboardPipeline, Widget];
    }

    /**
     * @inheritDoc
     */
    init() {

        const editor = this.editor;
        const view = editor.editing.view;

        /**
         * The live range over the original content that is being dragged.
         *
         * @private
         * @type {LiveRange}
         */
        this._draggedRange = null;

        /**
         * The UID of current dragging that is used to verify if the drop started in the same editor as the drag start.
         *
         * **Note**: This is a workaround for broken 'dragend' events (they are not fired if the source text node got removed).
         *
         * @private
         * @type {String}
         */
        this._draggingUid = '';

        /**
         * The reference to the model element that currently has a `draggable` attribute set (it is set while dragging).
         *
         * @private
         * @type {Element}
         */
        this._draggableElement = null;

        /**
         * A throttled callback for updating the root marker that show in which editor root we are and which modelElement we are dragging
         * @private
         */
        this._updateRootMarkerThrottled2 = throttle(
            ({targetModel, draggableElement}) => this._updateRootMarker(targetModel, draggableElement),
            200
        );

        /**
         * A delay function for removing the root marker
         * @private
         */
        this._removeRootMarkerDelay2 = delay(() => this._removeRootMarker(), 40);

        /**
         * A throttled callback for updating the marker that show in which element root we are dragging
         * @private
         */
        this._updateDropElementSelectedThrottled2 = debounce(
            ({targetRange}) => this._updateDropElementSelectedMarker({targetRange}),
            40
        );
        /**
         * A delay callback for removing the drop at marker.
         * @private
         */
        this._removeDropElementSelectedDelay2 = delay(() => this._removeDropElementSelectedMarker(), 40);


        /**
         * update drop in marker
         * display the buttons drop in
         * @private
         */
        this._updateDropInMarkerThrottled2 = throttle(
            ({targetRange}) => this._updateDropInMarker({targetRange}),
            100
        );
        /**
         * A throttled callback for removing the drop at marker.
         * @private
         */
        this._removeDropInMarkerDelay2 = delay(() => this._removeDropInMarker(), 40);


        /**
         * update drop around marker
         * display the buttons left and right for allowing drop
         * @private
         */
        this._updateDropAroundMarkerThrottled2 = throttle(
            ({targetRange}) => this._updateDropAroundMarker({targetRange}),
            100
        );
        this._removeDropAroundMarkerDelay2 = delay(() => this._removeDropAroundMarker(), 40);


        this._updateHoverTargetButtonMarkerThrottled2 = throttle(
            ({
                 targetRange,
                 targetPosition
             }) => this._updateHoverTargetButtonMarker({targetRange, targetPosition}),
            100
        );
        /**
         * A throttled callback for removing the drop at marker.
         * @private
         */
        this._removeHoverTargetButtonMarkerThrottle2 = throttle(() => this._removeHoverTargetButtonMarker(), 100);


        /**
         * A throttled callback updating the drop marker.
         *
         * @private
         * @type {Function}
         */
        this._updateDropAtMarkerThrottled = throttle(
            ({targetRange}) => this._updateDropAtMarker({targetRange}),
            40
        );

        /**
         * @private
         */
        this._removeDropAtMarkerThrottled = throttle(() => this._removeDropAtMarker(), 100);


        /**
         * A delayed callback removing the drop marker.
         *
         * @private
         * @type {Function}
         */
        this._removeDropMarkerDelayed = delay(() => this._removeDropMarker(), 40);

        /**
         * A delayed callback removing draggable attributes.
         *
         * @private
         * @type {Function}
         */
        this._clearDraggableAttributesDelayed = delay(() => this._clearDraggableAttributes(), 40);

        view.addObserver(SalesteckClipboardObserver);
        view.addObserver(MouseObserver);


        this._setupDragging();
        this._setupContentInsertionIntegration();
        this._setupClipboardInputIntegration();
        this._setupDropMarker();
        this._setupDraggableAttributeHandling();

        this.listenTo(editor, 'change:isReadOnly', (evt, name, isReadOnly) => {
            if (isReadOnly) {
                this.forceDisabled('readOnlyMode');
            } else {
                this.clearForceDisabled('readOnlyMode');
            }
        });

        this.on('change:isEnabled', (evt, name, isEnabled) => {
            if (!isEnabled) {
                this._finalizeDragging(false);
            }
        });

        if (env.isAndroid) {
            this.forceDisabled('noAndroidSupport');
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        if (this._draggedRange) {
            this._draggedRange.detach();
            this._draggedRange = null;
        }

        this._updateDropAtMarkerThrottled.cancel();
        this._removeDropMarkerDelayed.cancel();
        this._clearDraggableAttributesDelayed.cancel();

        return super.destroy();
    }

    afterInit() {
        // const originalDragDrop = this.editor.plugins.get('DragDrop');
        // console.log({ originalDragDrop, originalDragDropIsEnabled : originalDragDrop.isEnabled})
        this.editor.plugins.get('DragDrop').forceDisabled('salesteckDragDrop');
        // console.log({ originalDragDrop, originalDragDropIsEnabled : originalDragDrop.isEnabled})
    }

    /**
     * Drag and drop events handling.
     *
     * @private
     */
    _setupDragging() {
        const editor = this.editor;
        const model = editor.model;
        const modelDocument = model.document;
        const view = editor.editing.view;
        const viewDocument = view.document;


        // The handler for the drag start; it is responsible for setting data transfer object.
        this.listenTo(viewDocument, 'dragstart', (evt, data) => {
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data});
            const selection = modelDocument.selection;

            // Don't drag the editable element itself.
            if (data.target && data.target.is('editableElement')) {
                data.preventDefault();
                return;
            }


            // Check if this is dragstart over the widget (but not a nested editable).
            const draggableWidgetView = data.target ? findDraggableWidget(data.target) : null;

            let selectedElement;
            let modelElement;
            if (draggableWidgetView) {
                modelElement = editor.editing.mapper.toModelElement(draggableWidgetView);

                this._draggedRange = LiveRange.fromRange(model.createRangeOn(modelElement));

                // Disable toolbars so they won't obscure the drop area.
                if (editor.plugins.has('WidgetToolbarRepository')) {
                    editor.plugins.get('WidgetToolbarRepository').forceDisabled(SalesteckDragdrop.pluginName);
                }
            }
            // If this was not a widget we should check if we need to drag some text content.
            else if (!viewDocument.selection.isCollapsed) {
                selectedElement = viewDocument.selection.getSelectedElement();

                if (!selectedElement || !isWidget(selectedElement)) {
                    this._draggedRange = LiveRange.fromRange(selection.getFirstRange());
                }
            }
            if (modelElement) {
                // TODO we could clone this node somewhere and style it to match editing view but without handles,
                //  selection outline, WTA buttons, etc.
                data.dataTransfer._native.setDragImage(setGhostImageDragging(modelElement.name), 0, -10);
            }

            if (!this._draggedRange) {
                data.preventDefault();

                return;
            }

            this._draggingUid = uid();

            data.dataTransfer.effectAllowed = this.isEnabled ? 'copyMove' : 'copy';
            data.dataTransfer.setData('application/salesteck-dragging-uid', this._draggingUid);

            const draggedSelection = model.createSelection(this._draggedRange.toRange());
            const content = editor.data.toView(model.getSelectedContent(draggedSelection), {blockFillerMode: ''});
            // console.log('dragstart', {evt, data, modelElement});

            viewDocument.fire('salesteckClipboardOutput', {
                dataTransfer: data.dataTransfer,
                content,
                method: evt.name,
                _draggableElement: this._draggableElement
            });

            if (!this.isEnabled) {
                if (this._draggedRange) {
                    this._draggedRange.detach();
                    this._draggedRange = null;
                }
                this._draggingUid = '';
            }
            evt.stop()
        }, {priority: 'normal'});

        this.listenTo(viewDocument, 'dragend', (evt, data) => {
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data});
            this._finalizeDragging(!data.dataTransfer.isCanceled && data.dataTransfer.dropEffect === 'move');
            evt.stop();
        }, {priority: 'normal'});

        // Dragging over the editable.
        this.listenTo(viewDocument, 'dragenter', () => {
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data});
            if (!this.isEnabled) {
                return;
            }

            view.focus();
        }, {priority: 'high'});


        // Dragging out of the editable.
        this.listenTo(viewDocument, 'dragleave', () => {
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data});
            // We do not know if the mouse left the editor or just some element in it, so let us wait a few milliseconds
            // to check if 'dragover' is not fired.
            this._removeDropMarkerDelayed();
        }, {priority: 'high'});

        /**
         * first initialization for dragging check if dragging is valid
         */
        this.listenTo(viewDocument, 'dragging', (evt, data) => {
            // console.log(`highest:${evt.name}`, {evt, data});
            /**
             * if this plugin is not enabled stop the event
             */
            if (!this.isEnabled) {
                // if its not, stop the event
                data.dataTransfer.dropEffect = 'none';
                evt.stop();
                return;
            }
            /**
             * cancel the removal of all markers
             */
            this._removeDropMarkerDelayed.cancel();
            // console.log(`${evt.name}`, {evt, data, _draggedRange : this._draggedRange, targetView});


            // If this is content being dragged from another editor, moving out of current editor instance
            // is not possible until 'dragend' event case will be fixed.
            if (!this._draggedRange) {
                data.dataTransfer.dropEffect = 'copy';
            }
            let targetView = data.target;
            /**
             * find the target range that we are dragging over
             * @type {*|@ckEditor5/engine/model/range~Range|oa|oa}
             */
            const targetRange = findDropTargetRange(editor, data.targetRanges, targetView);
            if (!targetRange) {
                return;
            }

            /**
             * check if the target range is valid
             * @type {boolean|*}
             */
            const isTargetRangeValid = _isTargetRangeValid(this._draggedRange, targetRange);

            /**
             * if we can't find a target range or the target range is not valid, stop the event
             */
            if (!targetRange || !isTargetRangeValid) {
                // console.log(`SalesteckDragdrop:${evt.name}:targetRange is not valid`, {isTargetRangeValid, targetRange});
                data.dataTransfer.dropEffect = 'none';
                evt.stop();
                return;
            }

            // console.log(`SalesteckDragdrop:${evt.name}:rangeIsValid`, {targetRange, _draggedRange : this._draggedRange});

            let targetModel = getClosestMappedModelElement(editor, targetView);
            const draggableElement = this._draggableElement;

            /**
             * update the editor root with that's we are dragging over
             */
            this._updateRootMarkerThrottled2({targetModel, draggableElement});
            // second initialization

            // console.log('dragging', {evt, data, targetView, targetRange});

            if (!targetRange.isCollapsed) {
                //TODO remove drop at marker
                this._removeDropAtMarkerThrottled();
                const isTargetDroppable = _isTargetDroppableElement(targetView);
                const isTargetSelectionHandle = _isTargetSelectionHandle(targetView);
                if (isTargetDroppable || isTargetSelectionHandle) {
                    //TODO update drop element selected
                    this._removeDropElementSelectedDelay2.cancel();
                    this._updateDropElementSelectedThrottled2({targetRange});

                    /**
                     * check if the element that we are dragging over is a button and an element that allow release the mouse
                     */
                    if (isTargetDroppable) {
                        data.dataTransfer.dropEffect = 'move';

                        this._removeHoverTargetButtonMarkerThrottle2.cancel();
                        /**
                         * if the targetView is a droppable element, update the target position relative to the target range
                         */
                        this._updateHoverTargetButtonMarkerThrottled2({
                            targetRange,
                            targetPosition: targetView.getCustomProperty('target-position')
                        });
                        // console.log(`SalesteckDragdrop:${evt.name}:targetIsDroppable`, {targetView, targetRange, evt, data});
                        evt.stop();
                        return;
                    }
                    this._removeHoverTargetButtonMarkerThrottle2();
                    let isAllowOn = false;
                    let isAllowIn = false;
                    if (isTargetSelectionHandle) {
                        isAllowOn = this._isAllowOn({targetModel, draggableElement, targetRange});
                        isAllowIn = this._isAllowIn({targetModel, draggableElement});
                    }
                    if (isAllowOn) {
                        this._removeDropAroundMarkerDelay2.cancel();
                        // console.log(evt.name, {targetView, targetRange, draggableElement, targetModel});
                        this._updateDropAroundMarkerThrottled2({targetRange});
                    } else {
                        this._removeDropAroundMarkerDelay2();
                    }
                    if (isAllowIn) {
                        this._removeDropInMarkerDelay2.cancel();
                        // console.log(evt.name, {targetView, targetRange, draggableElement, targetModel});
                        this._updateDropInMarkerThrottled2({targetModel, targetRange, draggableElement});
                    } else {
                        this._removeDropInMarkerDelay2();
                    }
                    data.dataTransfer.dropEffect = isAllowOn || isAllowIn ? "move" : 'none';
                    evt.stop();
                    return;

                } else {
                    data.dataTransfer.dropEffect = 'none';
                    //TODO remove drop element selected
                    this._removeDropElementSelectedDelay2();
                    //TODO element is neither selection handle or droppable target
                    this._removeHoverTargetButtonMarkerThrottle2();
                    this._removeDropAroundMarkerDelay2();
                    this._removeDropInMarkerDelay2();
                }
                evt.stop();
            }
        }, {priority: 'highest'});


        /**
         * Handler for moving dragged content over the target area.
         */
        this.listenTo(viewDocument, 'dragging', (evt, data) => {
            // console.log(`normal:${evt.name}`, {evt, data});
            let targetView = data.target;
            // A UIElement is not a valid drop element, use parent (this could be a drop marker or any other UIElement).
            // Scroll certain amounts from current position

            const targetRange = findDropTargetRange(editor, data.targetRanges, targetView);
            if (!targetRange) {
                return;
            }
            if (targetRange.isCollapsed === false) {
                return
            }


            //TODO remove drop element selected
            this._removeDropElementSelectedDelay2();
            //TODO element is neither selection handle or droppable target
            this._removeHoverTargetButtonMarkerThrottle2();
            this._removeDropAroundMarkerDelay2();
            this._removeDropInMarkerDelay2();

            const draggableElement = this._draggableElement;
            const targetModel = getClosestMappedModelElement(editor, targetView);


            // If this is content being dragged from another editor, moving out of current editor instance
            // is not possible until 'dragend' event case will be fixed.
            if (!this._draggedRange) {
                data.dataTransfer.dropEffect = 'copy';
            }

            // In Firefox it is already set and effect allowed remains the same as originally set.
            if (!env.isGecko) {
                if (data.dataTransfer.effectAllowed === 'copy') {
                    data.dataTransfer.dropEffect = 'copy';
                } else if (['all', 'copyMove'].includes(data.dataTransfer.effectAllowed)) {
                    data.dataTransfer.dropEffect = 'move';
                }
            }
            let dropEffect = 'none';
            /* istanbul ignore else */
            // const isAllowAt = this._isAllowAt(targetRange, draggableElement, targetModel);
            const isAllowAt = this._isAllowAt(targetRange, draggableElement, targetModel);
            const isAllowOn = this._isAllowOn({targetModel, draggableElement, targetRange});

            // console.log(`${evt.name}`, {targetView, targetRange, isAllowOn, isAllowAt, isCollapsed : targetRange.isCollapsed, targetModel, draggableElement});
            if (isAllowAt || isAllowOn) {
                this._updateDropAtMarkerThrottled({targetRange});
                dropEffect = 'move';
            } else {
                this._removeDropAtMarkerThrottled();

            }
            data.dataTransfer.dropEffect = dropEffect;
            evt.stop();
        }, {priority: 'normal'});
    }

    /**
     * Integration with the `clipboardInput` event.
     *
     * @private
     */
    _setupClipboardInputIntegration() {
        const _this = this;
        const editor = this.editor;
        const view = editor.editing.view;
        const viewDocument = view.document;

        // Update the event target ranges and abort dropping if dropping over itself.
        this.listenTo(viewDocument, 'salesteckClipboardInput', (evt, data) => {
            let targetView = data.target;
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data, targetView});
            if (data.method !== 'drop') {
                return;
            }
            if (!targetView) {
                return;
            }
            // if (targetView.is('editableElement')) {
            //     targetView = targetView.parent;
            // }
            const targetRange = findDropTargetRange(editor, data.targetRanges, targetView);
            let targetModel = getClosestMappedModelElement(editor, targetView);
            // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data, targetView, targetModel, targetRange});
            if (targetView.is('uiElement')) {
                const targetPositionProperty = targetView.getCustomProperty('target-position');

                if (_isStrNotEmpty(targetPositionProperty) && targetModel) {
                    // console.log(`viewDocument:${evt.name}:targetPositionProperty`, { evt, targetView, data, targetPositionProperty, targetRange, targetModel});
                    let targetContext = targetPositionProperty === DROP_POSITION.in ? targetModel : targetModel.parent;

                    data.targetPosition = targetPositionProperty;
                    data.targetContext = targetContext;
                    this._finalizeDragging(true);
                    return;
                }
            } else {
                const draggableElement = _this._draggableElement;

                // console.log(`viewDocument:${evt.name}:targetPositionProperty`, { evt, targetView, data, targetRange, targetModel, draggableElement});
                if (_this._isAllowOn({targetModel, draggableElement, targetRange})) {
                    // let targetContext = targetModel.parent;
                    data.targetContext = targetModel.parent;

                }
            }
            // else {
            //     targetRange = findDropTargetRange(editor, data.targetRanges, data.target);
            // }

            // console.log(evt.name, {evt, data, targetRange});

            // The dragging markers must be removed after searching for the target range because sometimes
            // the target lands on the marker itself.
            this._removeDropMarker();

            /* istanbul ignore if */
            if (!targetRange) {
                this._finalizeDragging(false);
                evt.stop();
                return;
            }

            // Since we cannot rely on the drag end event, we must check if the local drag range is from the current drag and drop
            // or it is from some previous not cleared one.
            if (this._draggedRange && this._draggingUid !== data.dataTransfer.getData('application/salesteck-dragging-uid')) {
                this._draggedRange.detach();
                this._draggedRange = null;
                this._draggingUid = '';
            }

            // Do not do anything if some content was dragged within the same document to the same position.
            const isMove = getFinalDropEffect(data.dataTransfer) === 'move';

            if (isMove && this._draggedRange && this._draggedRange.containsRange(targetRange, true)) {
                this._finalizeDragging(false);
                evt.stop();

                return;
            }

            // Override the target ranges with the one adjusted to the best one for a drop.
            data.targetRanges = [editor.editing.mapper.toViewRange(targetRange)];
        }, {priority: 'high'});
    }

    /**
     * Integration with the `contentInsertion` event of the clipboard-modified pipeline.
     *
     * @private
     */
    _setupContentInsertionIntegration() {
        const editor = this.editor;
        const salesteckClipboardPipeline = editor.plugins.get(SalesteckClipboardPipeline);
        this.listenTo(editor.model, 'deleteContent', (evtInfo, [selection, property]) => {
            const firstPosition = selection.getFirstPosition();
            editor.model.change(writer => {
                writer.setAttribute(DATA_CHILD_COUNT, firstPosition.parent.childCount, firstPosition.parent);
            })
        });

        salesteckClipboardPipeline.on('salesteckContentInsertion', (evt, data) => {
            // console.log(evt.name, {evt, data});
            if (!this.isEnabled || data.method !== 'drop') {
                return;
            }
            const model = editor.model;
            let modelRange = null;
            let containedModelElement;
            if (_isStrNotEmpty(data.targetPosition) && data.targetRanges) {
                containedModelElement = editor.editing.mapper.toModelElement(data.targetRanges[0].start.parent);
                // console.log(`SalesteckDragdrop:${evt.name}`, {evt, data, containedModelElement, modelRange});
                switch (data.targetPosition) {
                    case  DROP_POSITION.before :
                        modelRange = model.createRange(model.createPositionBefore(containedModelElement));
                        break;
                    case  DROP_POSITION.after :
                        modelRange = model.createRange(model.createPositionAfter(containedModelElement));
                        break;
                    case  DROP_POSITION.on :
                        modelRange = model.createRangeOn(containedModelElement);
                        break;
                    case  DROP_POSITION.in :
                        modelRange = model.createRange(model.createPositionAt(containedModelElement, 'end'));
                        break;
                }
            } else {
                // Update the selection to the target range in the same change block to avoid selection post-fixing
                // and to be able to clone text attributes for plain text dropping.
                const ranges = data.targetRanges.map(viewRange => editor.editing.mapper.toModelRange(viewRange));
                if (ranges[0].isCollapsed) {
                    modelRange = ranges[0];
                }
                // console.log('clipboardPipeline:contentInsertion', {evt, data, content : data.content, ranges, targetRanges : data.targetRanges});
            }
            // console.log('clipboardPipeline:contentInsertion', {evt, data, content : data.content, modelRange});
            if (modelRange) {

                // console.log('clipboardPipeline:contentInsertion', {evt, data, content : data.content, modelRange});
                model.change(writer => writer.setSelection(modelRange));
            } else {
                // console.log('clipboardPipeline:contentInsertion', {evt, data, content : data.content, modelRange});
                data.dataTransfer.dropEffect = 'none';
                evt.stop();
                this._finalizeDragging(false);
            }

        }, {priority: 'high'});

        salesteckClipboardPipeline.on('salesteckContentInsertion', (evt, data) => {
            // console.log(`SalesteckDragdrop:salesteckClipboardPipeline:${evt.name}`, {evt, data});
            if (!this.isEnabled || data.method !== 'drop') {
                return;
            }
            // console.log('salesteckContentInsertion', {evt, data});
            if (data.resultRange) {
                const modelParent = data.resultRange.start.parent;
                editor.model.change(writer => {
                    writer.setAttribute(DATA_CHILD_COUNT, modelParent.childCount, modelParent);
                })
                // viewWriter.setAttribute(data.attributeKey, modelParent.childCount, viewParentElement);
            }

            // Remove dragged range content, remove markers, clean after dragging.
            const isMove = getFinalDropEffect(data.dataTransfer) === 'move';

            // Whether any content was inserted (insertion might fail if the schema is disallowing some elements
            // (for example an image caption allows only the content of a block but not blocks themselves.
            // Some integrations might not return valid range (i.e., table pasting).
            const isSuccess = !data.resultRange || !data.resultRange.isCollapsed;
            // console.log(`SalesteckDragdrop:salesteckClipboardPipeline:${evt.name}`, {evt, data, isMove, isSuccess});

            this._finalizeDragging(isSuccess && isMove);
        }, {priority: 'lowest'});
    }

    /**
     * Adds listeners that add the `draggable` attribute to the elements while the mouse button is down so the dragging could start.
     *
     * @private
     */
    _setupDraggableAttributeHandling() {
        const editor = this.editor;
        const viewEditing = editor.editing.view;
        const viewDocument = viewEditing.document;

        // Add the 'draggable' attribute to the widget while pressing the selection handle.
        // This is required for widgets to be draggable. In Chrome it will enable dragging text nodes.
        this.listenTo(viewDocument, 'mousedown', (evt, data) => {
            // console.log('mousedown', {evt, data});
            // The lack of data can be caused by editor tests firing fake mouse events. This should not occur
            // in real-life scenarios but this greatly simplifies editor tests that would otherwise fail a lot.
            if (env.isAndroid || !data) {
                return;
            }

            this._clearDraggableAttributesDelayed.cancel();

            // Check if this is a mousedown over the widget (but not a nested editable).
            let draggableViewElement = findDraggableWidget(data.target);


            // Note: There is a limitation that if more than a widget is selected (a widget and some text)
            // and dragging starts on the widget, then only the widget is dragged.

            // If this was not a widget then we should check if we need to drag some text content.
            // In Chrome set a 'draggable' attribute on closest editable to allow immediate dragging of the selected text range.
            // In Firefox this is not needed. In Safari it makes the whole editable draggable (not just textual content).
            // Disabled in read-only mode because draggable="true" + contenteditable="false" results
            // in not firing selectionchange event ever, which makes the selection stuck in read-only mode.
            let selectedElement;
            if (env.isBlink && !editor.isReadOnly && !draggableViewElement && !viewDocument.selection.isCollapsed) {
                selectedElement = viewDocument.selection.getSelectedElement();

                if (!selectedElement || !isWidget(selectedElement)) {
                    draggableViewElement = viewDocument.selection.editableElement;
                }
            }

            if (draggableViewElement) {
                viewEditing.change(writer => {
                    writer.setAttribute('draggable', 'true', draggableViewElement);
                });

                // Keep the reference to the model element in case the view element gets removed while dragging.
                this._draggableElement = editor.editing.mapper.toModelElement(draggableViewElement);
            }
            // console.log('mousedown', {evt, data, draggableViewElement, selectedElement, draggableElement : this._draggableElement});
        });

        // Remove the draggable attribute in case no dragging started (only mousedown + mouseup).
        this.listenTo(viewDocument, 'mouseup', () => {
            if (!env.isAndroid) {
                this._clearDraggableAttributesDelayed();
            }
        });
    }

    /**
     * Removes the `draggable` attribute from the element that was used for dragging.
     *
     * @private
     */
    _clearDraggableAttributes() {
        // console.log('_clearDraggableAttributes');
        const editing = this.editor.editing;
        if (this._draggableElement && this._draggableElement.root) {
            editing.view.change(writer => {
                // Remove 'draggable' attribute.
                if (this._draggableElement && this._draggableElement.root.rootName !== '$graveyard') {
                    writer.removeAttribute('draggable', editing.mapper.toViewElement(this._draggableElement));
                }

                this._draggableElement = null;
            });
        } else {

            this._draggableElement = null;
        }
    }

    /**
     * Creates downcast conversion for the drop target marker.
     *
     * @private
     */
    _setupDropMarker() {
        const editor = this.editor;
        const conversion = editor.conversion;

        // _addDropMarker(conversion, 'drop-on', DROP_POSITION.on, replaceIcon);
        _addDropInMarker(conversion, DROP_IN, DROP_POSITION.in, boxArrowInDown);
        _addDropAroundDowncastMarker(conversion);
        _addDropElementSelectedMarker(conversion);

        _addHoverMarker(conversion);
        _addRootMarker(conversion);


        // _addDropAtMarker(conversion);

        // Drop marker conversion for hovering over widgets.
        editor.conversion.for('editingDowncast').markerToHighlight({
            model: DROP_AT,
            view: {
                classes: ['ck-clipboard-drop-target-range']
            }
        });
        // Drop marker conversion for in text drop target.
        editor.conversion.for('editingDowncast').markerToElement({
            model: DROP_AT,
            view: (data, {writer}) => {
                const inText = editor.model.schema.checkChild(data.markerRange.start, '$text');


                if (!inText) {
                    return;
                }
                // console.log({data});

                return writer.createUIElement('span', {class: 'ck ck-clipboard-drop-target-position'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    // console.log(domElement);

                    // Using word joiner to make this marker as high as text and also making text not break on marker.
                    domElement.innerHTML = '&NoBreak;<span></span>&NoBreak;';

                    return domElement;
                });
            }
        });
    }

    /**
     * @param targetModel
     * @param draggableElement
     * @private
     */
    _updateRootMarker(targetModel, draggableElement) {
        const editor = this.editor;
        const markers = editor.model.markers;
        const modelRange = editor.model.createRangeIn(targetModel.root);
        if (modelRange) {
            // console.log('_updateHoverMarker', {modelRange});
            let dragElementName = _isStrNotEmpty(draggableElement) ? draggableElement : draggableElement.name || null;
            if (_isStrNotEmpty(dragElementName)) {
                const markerName = `${ROOT_MARKER}:${dragElementName}`;
                // console.log('_updateHoverMarker', {targetModel, modelRange, markers, markerName});
                editor.model.change(writer => {
                    for (const marker of markers.getMarkersGroup(ROOT_MARKER)) {
                        if (marker.name !== markerName) {
                            console.log('_updateRootMarker:marker.name !== markerName', {
                                targetModel,
                                modelRange,
                                markers,
                                markerName
                            });
                            writer.removeMarker(marker.name);
                        }
                    }

                    if (markers.has(markerName)) {
                        // console.log(`_updateRootMarker:markers.has(${markerName})`, {targetModel, modelRange, markers, markerName});
                        if (!markers.get(markerName).getRange().isEqual(modelRange)) {
                            // console.log(`_updateRootMarker:markers.has(${markerName})`, {targetModel, modelRange, markers, markerName});
                            writer.updateMarker(markerName, {range: modelRange});
                        }
                    } else {
                        // console.log(`_updateRootMarker:markers.hasNot(${markerName})`, {targetModel, modelRange, markers, markerName});
                        writer.addMarker(markerName, {
                            range: modelRange,
                            usingOperation: false,
                            affectsData: false
                        });
                    }
                });
            }
        }


    }

    _removeRootMarker() {
        this._removeUniqueMarker(ROOT_MARKER);
    }

    _updateDropElementSelectedMarker({targetRange}) {
        this._updateUniqueMarker(DROP_SELECTED, targetRange);
    }

    _removeDropElementSelectedMarker() {
        // console.log(`SalesteckDragdrop:_removeDropElementSelectedMarker`);
        this._removeUniqueMarker(DROP_SELECTED);
    }

    _updateDropInMarker({targetRange}) {
        // console.log('_updateDropInMarker', {targetRange, draggableElement, targetModel});
        this._updateUniqueMarker(DROP_IN, targetRange);
    }

    _removeDropInMarker() {
        // console.log(`SalesteckDragdrop:_removeDropElementSelectedMarker`);
        this._removeUniqueMarker(DROP_IN);
    }

    _updateDropAroundMarker({targetRange}) {
        // console.log('_updateDropAroundMarker', {targetRange});
        this._updateUniqueMarker(DROP_AROUND, targetRange);
    }

    _removeDropAroundMarker() {
        // console.log(`SalesteckDragdrop:_removeDropElementSelectedMarker`);
        this._removeUniqueMarker(DROP_AROUND);
    }


    /**
     * Updates the drop target marker to the provided range.
     *
     * @private
     * @param {@ckEditor5/engine/model/range~Range} targetRange The range to set the marker to.
     * @param {@ckEditor5/engine/model/element} draggableElement The range to set the marker to.
     */
    _updateDropAtMarker({targetRange}) {
        // console.log('_updateDropAtMarker', {targetRange});
        this._updateUniqueMarker(DROP_AT, targetRange);
    }

    /**
     * remove the marker for position in between text range
     * @private
     */
    _removeDropAtMarker() {
        this._removeUniqueMarker(DROP_AT);
    }


    _updateUniqueMarker(markerName, targetRange) {
        const editor = this.editor;
        const markers = editor.model.markers;
        editor.model.change(writer => {
            if (markers.has(markerName)) {
                if (!markers.get(markerName).getRange().isEqual(targetRange)) {
                    writer.updateMarker(markerName, {range: targetRange});
                }
            } else {
                writer.addMarker(markerName, {
                    range: targetRange,
                    usingOperation: false,
                    affectsData: false
                });
            }
        });
    }

    _removeUniqueMarker(markerName) {

        const editor = this.editor;
        const markers = editor.model.markers;
        /**
         * remove drop at marker
         */

        if (markers.has(markerName)) {
            editor.model.change(writer => {
                writer.removeMarker(markerName);
            });
        }

    }

    /**
     * update the marker for the position place holder. before | in | after
     * @param targetRange the model range where we drop
     * @param targetPosition the position relative to the model before | in | after
     * @private
     */
    _updateHoverTargetButtonMarker({targetRange, targetPosition}) {
        const editor = this.editor;
        const markers = editor.model.markers;
        const markerName = `${HOVER_DROP_TARGET}:${targetPosition}`;


        // console.log('_updateHoverMarker', { targetRange, targetPosition, markers, markerName});
        editor.model.change(writer => {
            for (const marker of markers.getMarkersGroup(HOVER_DROP_TARGET)) {
                // console.log('_updateHoverMarker', {name : marker.name, markerName});
                if (marker.name !== markerName) {
                    // console.log('_updateHoverMarker', {name : marker.name, markerName});
                    writer.removeMarker(marker.name);
                }
            }
            if (markers.has(markerName)) {
                if (!markers.get(markerName).getRange().isEqual(targetRange)) {
                    writer.updateMarker(markerName, {range: targetRange});
                }
            } else {
                writer.addMarker(markerName, {
                    range: targetRange,
                    usingOperation: false,
                    affectsData: false
                });
            }
        });
    }


    _removeHoverTargetButtonMarker() {

        const editor = this.editor;
        const markers = editor.model.markers;


        // console.log('_updateHoverMarker', { targetRange, targetPosition, markers, markerName});
        editor.model.change(writer => {
            for (const marker of markers.getMarkersGroup(HOVER_DROP_TARGET)) {
                // console.log(`_removeHoverTargetButtonMarker:${marker.name}`, {marker});
                writer.removeMarker(marker.name);
            }
        });
    }

    _isAllowAt(targetRange, draggableElement, targetModel) {
        const model = this.editor.model;
        let isAllowAt = false;
        // let isAllowOn = false;
        //TODO check if widgetElement is allowed there
        if (
            (draggableElement.name === InlineElementEditing.modelName || draggableElement === InlineElementEditing.modelName)
            && targetModel.name === InlineElementEditing.textContainerModelName) {
            return false;
        }
        // console.log(
        //     `${draggableElement.name}_isAllowAt`,
        //     {targetRange, draggableElement, isAllowAt, targetModel}
        // );
        if (targetRange && targetRange.isCollapsed) {
            isAllowAt = model.schema.checkChild(targetModel, draggableElement);
        }
        // console.log(
        //     `${draggableElement.name}_isAllowAt`,
        //     {targetRange, draggableElement, isAllowAt, targetModel}
        // );
        return isAllowAt/* || isAllowOn*/;

    }

    _isAllowIn({targetModel, draggableElement}) {
        return this.editor.model.schema.checkChild(targetModel, draggableElement);
    }

    _isAllowOn({targetModel, draggableElement, targetRange}) {
        let isAllowOn = false;
        const editor = this.editor;
        const model = editor.model;
        if(targetModel.name === 'listItem'){
            if(
                (draggableElement.name === BlocksEditing.blockPluginName || draggableElement === BlocksEditing.blockPluginName ) ||
                (draggableElement.name === BlockWidgetEditing.modelName || draggableElement === BlockWidgetEditing.modelName ) ||
                (draggableElement.name === 'imageBlock' || draggableElement === 'imageBlock' ) ||
                (draggableElement.name === 'media' || draggableElement === 'media' )
            ){
                return false;
            }
        }
        // console.log(`${draggableElement.name}_isAllowOn`, {targetModel, draggableElement, isAllowOn, targetRange});
        if (!targetRange.isCollapsed) {
            isAllowOn = model.schema.checkChild(targetRange.start.parent, draggableElement);
        } else {
            if (targetModel) {
                isAllowOn = model.schema.checkChild(targetModel.parent, draggableElement);
            }
        }
        // console.log(`${draggableElement.name}_isAllowOn`, {targetModel, draggableElement, isAllowOn, targetRange});
        return isAllowOn;
    }

    /**
     * Removes the drop target marker.
     *
     * @private
     */
    _removeDropMarker() {
        const model = this.editor.model;
        // console.log(`SalesteckDragdrop:_removeDropMarker`);

        this._removeDropMarkerDelayed.cancel();
        this._updateDropElementSelectedThrottled2.cancel();
        this._updateDropAtMarkerThrottled.cancel();
        this._updateHoverTargetButtonMarkerThrottled2.cancel();
        this._updateDropInMarkerThrottled2.cancel();
        this._updateDropAroundMarkerThrottled2.cancel();
        this._updateRootMarkerThrottled2.cancel();
        const markersName = [];
        if (model.markers.has(DROP_AT)) {
            markersName.push(DROP_AT);
        }
        if (model.markers.has(DROP_IN)) {
            markersName.push(DROP_IN);
        }
        if (model.markers.has(DROP_SELECTED)) {
            markersName.push(DROP_SELECTED);
        }

        if (model.markers.has(DROP_AROUND)) {
            markersName.push(DROP_AROUND);
        }
        let rootMarkers = Array.from(model.markers.getMarkersGroup(ROOT_MARKER));
        if (rootMarkers.length) {
            for (const marker of rootMarkers) {
                markersName.push(marker.name);
            }
        }
        let hoverDropMarkers = Array.from(model.markers.getMarkersGroup(HOVER_DROP_TARGET));
        if (hoverDropMarkers.length) {
            for (const marker of hoverDropMarkers) {
                markersName.push(marker.name);
            }
        }
        // console.log({hoverDropMarkers, markersName});

        if (markersName.length) {
            model.change(writer => {
                for (const marker of markersName) {
                    writer.removeMarker(marker);
                }
            });
        }
    }

    /**
     * Deletes the dragged content from its original range and clears the dragging state.
     *
     * @private
     * @param {Boolean} moved Whether the move succeeded.
     */
    _finalizeDragging(moved) {
        // console.log('_finalizeDragging', {moved});
        const editor = this.editor;
        const model = editor.model;

        removeGhostImage();
        this._removeDropMarker();
        this._clearDraggableAttributes();

        if (editor.plugins.has('WidgetToolbarRepository')) {
            editor.plugins.get('WidgetToolbarRepository').clearForceDisabled(SalesteckDragdrop.pluginName);
        }

        this._draggingUid = '';

        if (!this._draggedRange) {
            return;
        }

        // Delete moved content.
        if (moved && this.isEnabled) {
            model.change(writer => {
                // console.log('_finalizeDragging:deleteContent', {_draggedRange : this._draggedRange, _draggableElement : this._draggableElement})

                model.deleteContent(model.createSelection(this._draggedRange), {doNotAutoparagraph: true});
            })
        }
        // console.log('_finalizeDragging', {_draggedRange : this._draggedRange, _draggableElement : this._draggableElement})
        // if (this._draggedRange) {
        //     this._draggedRange.detach();
        //     this._draggedRange = null;
        // }
        this._draggedRange.detach();
        this._draggedRange = null;
    }
}


export function _isTargetSelectionHandle(targetView) {
    return targetView && targetView.is('uiElement') && targetView.hasClass('ck-widget__selection-handle');
}

export function _isTargetDroppableElement(targetView) {
    return targetView && targetView.is('uiElement') && targetView.hasClass('drop-target-element');
}

export function _addDropElementSelectedMarker(conversion) {
    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on(`addMarker:${DROP_SELECTED}`, (evt, data, conversionApi) => {
            if (!data.item) {
                return;
            }
            if (!conversionApi.consumable.test(data.item, evt.name)) {
                return;
            }
            // console.log(evt.name, {data, evt});
            const markerRange = data.markerRange;

            // Marker that is collapsed has consumable lang differently that non-collapsed one.
            // For more information see `addMarker` event description.
            // If marker's range is collapsed - check if it can be consumed.
            if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
                return;
            }

            // If marker's range is not collapsed - consume all items inside.
            for (const value of markerRange) {
                if (!conversionApi.consumable.consume(value.item, evt.name)) {
                    return;
                }
            }

            const viewWriter = conversionApi.writer;
            const viewElement = conversionApi.mapper.toViewElement(data.item);
            // console.log(evt.name, {viewElement, data})
            if (viewElement) {
                viewWriter.addClass(`${DROP_SELECTED}`, viewElement);
                conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
            }
            // Add "opening" element.

            evt.stop();
        });
        dispatcher.on(`removeMarker:${DROP_SELECTED}`, (evt, data, conversionApi) => {

            // This conversion makes sense only for non-collapsed range.
            if (data.markerRange.isCollapsed) {
                return;
            }
            // console.log(evt.name, {data, evt});


            // Get all elements bound with given marker name.
            const elements = conversionApi.mapper.markerNameToElements(data.markerName);

            if (!elements) {
                return;
            }

            for (const element of elements) {

                // conversionApi.writer.addClass(`${markerName}-element`, viewElement);
                if (element.is('attributeElement')) {
                    // console.log(evt.name, {element})
                } else if (element.is('containerElement')) {
                    // console.log(evt.name, {element})
                    conversionApi.writer.removeClass(`${DROP_SELECTED}`, element)
                    // element.getCustomProperty( 'removeHighlight' )( element, descriptor.id, conversionApi.writer );
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                } else {
                    // console.log(evt.name, {element})
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                    conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);

                }
            }

            conversionApi.writer.clearClonedElementsGroup(data.markerName);

            evt.stop();
        });
    });

}

export function _addDropAroundDowncastMarker(conversion) {

    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on(`addMarker:${DROP_AROUND}`, (evt, data, conversionApi) => {
            if (!data.item) {
                return;
            }
            // Create two view elements. One will be inserted at the beginning of marker, one at the end.
            // If marker is collapsed, only "opening" element will be inserted.
            data.isOpening = true;
            const viewStartElement = _createDropView(conversionApi, {
                class: 'drop-target-element drop-around-target before',
                'data-block-name': data.item.name
            }, arrowLeft);
            conversionApi.writer.setCustomProperty('target-position', DROP_POSITION.before, viewStartElement);

            data.isOpening = false;
            const viewEndElement = _createDropView(conversionApi, {
                class: 'drop-target-element drop-around-target after',
                'data-block-name': data.item.name
            }, arrowLeft);

            // const viewEndElement = conversionApi.writer.createUIElement(
            //     'div',
            //     {
            //         class: 'drop-target-element drop-around-target after',
            //         'data-block-name': data.item.name
            //     },
            //     function( domDocument ) {
            //         const domElement = this.toDomElement( domDocument );
            //
            //         // Using word joiner to make this marker as high as text and also making text not break on marker.
            //         domElement.innerHTML = arrowLeft;
            //
            //         return domElement;
            //     });
            conversionApi.writer.setCustomProperty('target-position', DROP_POSITION.after, viewEndElement);


            if (!viewStartElement) {
                return;
            }

            const markerRange = data.markerRange;

            // Marker that is collapsed has consumable lang differently that non-collapsed one.
            // For more information see `addMarker` event description.
            // If marker's range is collapsed - check if it can be consumed.
            if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
                return;
            }

            // If marker's range is not collapsed - consume all items inside.
            for (const value of markerRange) {
                if (!conversionApi.consumable.consume(value.item, evt.name)) {
                    return;
                }
            }
            let viewElement = conversionApi.mapper.toViewElement(data.item);
            if (viewElement) {
                const viewWriter = conversionApi.writer;
                const viewRange = viewWriter.createRangeIn(viewElement);
                // viewWriter.addClass(`${DROP_AROUND}-element`, viewElement);
                viewWriter.insert(viewRange.end, viewEndElement);
                viewWriter.insert(viewRange.end, viewStartElement);
                conversionApi.mapper.bindElementToMarker(viewStartElement, data.markerName);
                conversionApi.mapper.bindElementToMarker(viewEndElement, data.markerName);
            }

            evt.stop();
        });
        dispatcher.on(`removeMarker:${DROP_AROUND}`, (evt, data, conversionApi) => {
            const elements = conversionApi.mapper.markerNameToElements(data.markerName);
            // console.log(`removeMarker:${data.markerName}`, {data});

            if (!elements) {
                return;
            }

            for (const element of elements) {
                // conversionApi.writer.removeClass(`${DROP_AROUND}-element`, element)
                conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);
            }

            conversionApi.writer.clearClonedElementsGroup(data.markerName);

            evt.stop();
        });
    });
}

export function _addDropInMarker(conversion, markerName, targetPosition, icon) {
    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on(`addMarker:${markerName}`, (evt, data, conversionApi) => {
            if (!data.item) {
                return;
            }
            if (!conversionApi.consumable.test(data.item, evt.name)) {
                return;
            }
            // console.log(evt.name, {evt, data});
            const markerRange = data.markerRange;

            // Marker that is collapsed has consumable lang differently that non-collapsed one.
            // For more information see `addMarker` event description.
            // If marker's range is collapsed - check if it can be consumed.
            if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
                return;
            }

            // If marker's range is not collapsed - consume all items inside.
            for (const value of markerRange) {
                if (!conversionApi.consumable.consume(value.item, evt.name)) {
                    return;
                }
            }

            const viewWriter = conversionApi.writer;
            const viewElement = conversionApi.mapper.toViewElement(data.item);
            // console.log(evt.name, {viewElement, data})
            if (viewElement) {
                viewWriter.addClass(`${markerName}-element`, viewElement);
                const viewStartElement = conversionApi.writer.createUIElement(
                    'div',
                    {
                        class: `drop-target-element ${markerName}`,
                        'data-block-name': data.item.name
                    },
                    function (domDocument) {
                        const domElement = this.toDomElement(domDocument);

                        // Using word joiner to make this marker as high as text and also making text not break on marker.
                        domElement.innerHTML = icon;

                        return domElement;
                    }
                );
                conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
                conversionApi.writer.setCustomProperty('target-position', targetPosition, viewStartElement);
                viewWriter.insert(viewWriter.createRangeIn(viewElement).end, viewStartElement);
                conversionApi.mapper.bindElementToMarker(viewStartElement, data.markerName);
            }
            // Add "opening" element.
            evt.stop();
        });
        dispatcher.on(`removeMarker:${markerName}`, (evt, data, conversionApi) => {

            // This conversion makes sense only for non-collapsed range.
            if (data.markerRange.isCollapsed) {
                return;
            }

            // console.log(evt.name, {evt, data});

            const descriptor = {
                classes: [markerName]
            };

            // View element that will be used to unwrap `AttributeElement`s.
            const viewHighlightElement = createViewElementFromHighlightDescriptor(conversionApi.writer, descriptor);

            // Get all elements bound with given marker name.
            const elements = conversionApi.mapper.markerNameToElements(data.markerName);

            if (!elements) {
                return;
            }

            for (const element of elements) {

                // conversionApi.writer.addClass(`${markerName}-element`, viewElement);
                if (element.is('attributeElement')) {
                    // console.log(evt.name, {element})
                    conversionApi.writer.unwrap(conversionApi.writer.createRangeOn(element), viewHighlightElement);
                } else if (element.is('containerElement')) {
                    // console.log(evt.name, {element})
                    conversionApi.writer.removeClass(`${markerName}-element`, element)
                    // element.getCustomProperty( 'removeHighlight' )( element, descriptor.id, conversionApi.writer );
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                } else {
                    // console.log(evt.name, {element})
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                    conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);

                }
            }

            conversionApi.writer.clearClonedElementsGroup(data.markerName);

            evt.stop();
        });
    });

}

export function _addRootMarker(conversion) {

    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on(`addMarker:${ROOT_MARKER}`, (evt, data, conversionApi) => {
            const draggableElementName = data.markerName.split(':')[1] || null;
            if (!data.item || !_isStrNotEmpty(draggableElementName)) {
                return;
            }
            const dataModel = data.item;
            if (!conversionApi.consumable.test(dataModel, evt.name)) {
                return;
            }
            const markerRange = data.markerRange;

            // Marker that is collapsed has consumable lang differently that non-collapsed one.
            // For more information see `addMarker` event description.
            // If marker's range is collapsed - check if it can be consumed.
            if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
                return;
            }

            // If marker's range is not collapsed - consume all items inside.
            for (const value of markerRange) {
                if (!conversionApi.consumable.consume(value.item, evt.name)) {
                    return;
                }
            }
            const viewWriter = conversionApi.writer;
            const viewElement = conversionApi.mapper.toViewElement(dataModel);
            const rootView = viewElement.root;
            // console.log(evt.name, {data, dataModel, viewElement, rootView});
            if (rootView) {
                viewWriter.addClass(`${ROOT_MARKER}-element`, rootView);
                viewWriter.setAttribute(`data-dragging-model-name`, draggableElementName, rootView);
                conversionApi.mapper.bindElementToMarker(rootView, data.markerName);
            }
            // Add "opening" element.
            evt.stop();
        });
        dispatcher.on(`removeMarker:${ROOT_MARKER}`, (evt, data, conversionApi) => {
            // console.log(evt.name, {evt, data});

            // This conversion makes sense only for non-collapsed range.
            if (data.markerRange.isCollapsed) {
                return;
            }

            const descriptor = {
                classes: [`${ROOT_MARKER}-element`]
            };

            // View element that will be used to unwrap `AttributeElement`s.
            const viewHighlightElement = createViewElementFromHighlightDescriptor(conversionApi.writer, descriptor);

            // Get all elements bound with given marker name.
            const elements = conversionApi.mapper.markerNameToElements(data.markerName);

            if (!elements) {
                return;
            }

            for (const element of elements) {

                // conversionApi.writer.addClass(`${markerName}-element`, viewElement);
                if (element.is('attributeElement')) {
                    // console.log(evt.name, {element})
                    conversionApi.writer.unwrap(conversionApi.writer.createRangeOn(element), viewHighlightElement);
                } else if (element.is('containerElement')) {
                    // console.log(evt.name, {element})
                    conversionApi.writer.removeClass(`${ROOT_MARKER}-element`, element);
                    conversionApi.writer.removeAttribute(`data-dragging-model-name`, element);
                    // element.getCustomProperty( 'removeHighlight' )( element, descriptor.id, conversionApi.writer );
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                } else {
                    // console.log(evt.name, {element})
                    conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
                    conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);

                }
            }

            conversionApi.writer.clearClonedElementsGroup(data.markerName);

            evt.stop();
        });
    });

}

export function _addHoverMarker(conversion) {
    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on(`addMarker:${HOVER_DROP_TARGET}`, (evt, data, conversionApi) => {

            let markerPosition = data.markerName.split(':')[1] || null;
            if (!data.item || !markerPosition) {
                return;
            }
            const modelElement = data.item;
            if (!conversionApi.consumable.test(modelElement, evt.name)) {
                return;
            }
            markerPosition = markerPosition.toLowerCase();
            const markerRange = data.markerRange;
            // Marker that is collapsed has consumable lang differently that non-collapsed one.
            // For more information see `addMarker` event description.
            // If marker's range is collapsed - check if it can be consumed.
            if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
                return;
            }

            // If marker's range is not collapsed - consume all items inside.
            for (const value of markerRange) {
                if (!conversionApi.consumable.consume(value.item, evt.name)) {
                    return;
                }
            }


            const viewWriter = conversionApi.writer;
            const viewElement = conversionApi.mapper.toViewElement(modelElement);
            const parentChildCount = modelElement.parent.childCount;
            const modelElementIndex = modelElement.index;
            let isPositionBetween = false;
            const MARKER_DROP_POSITION = markerPosition.toUpperCase();
            let isPositionIn = MARKER_DROP_POSITION === DROP_POSITION.in && parentChildCount > 1;
            const isOnlyChild = modelElement.childCount === 0;
            if (parentChildCount > 1) {
                if (MARKER_DROP_POSITION === DROP_POSITION.before) {
                    isPositionBetween = modelElementIndex > 0;
                } else if (MARKER_DROP_POSITION === DROP_POSITION.after) {
                    isPositionBetween = (parentChildCount - modelElementIndex) > 1;
                }
            }
            // console.log(evt.name, {viewElement, modelElement, parentChildCount, modelElementIndex})
            if (viewElement) {
                // viewWriter.addClass(`hover-drop-${markerPosition}`, viewElement);
                // conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
                const dropBeforeView = viewWriter.createUIElement(
                    'div',
                    {
                        class: `drop-target-holder ${markerPosition}`,
                        'data-is-between': isPositionBetween || isPositionIn,
                        'data-insert': isPositionBetween || isPositionIn,
                        'data-is-only-child': isOnlyChild,
                        'data-block-name': data.item.name
                    },
                    function (domDocument) {
                        const domElement = this.toDomElement(domDocument);
                        domElement.innerHTML = arrowLeft;
                        // Using word joiner to make this marker as high as text and also making text not break on marker.
                        if (isPositionBetween /*|| (isPositionIn && isOnlyChild)*/) {
                            domElement.innerHTML = domElement.innerHTML + arrowLeft;
                        }
                        return domElement;
                    }
                );
                viewWriter.insert(viewWriter.createRangeIn(viewElement).end, dropBeforeView);
                conversionApi.mapper.bindElementToMarker(dropBeforeView, data.markerName);
            }

            evt.stop();
        });
        dispatcher.on(`removeMarker:${HOVER_DROP_TARGET}`, (evt, data, conversionApi) => {
            if (data.markerRange.isCollapsed) {
                return;
            }

            // Get all elements bound with given marker name.
            const elements = conversionApi.mapper.markerNameToElements(data.markerName);

            if (!elements) {
                return;
            }

            for (const element of elements) {
                // console.log(evt.name, {data, element, markerPosition})

                conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);
                conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
            }

            conversionApi.writer.clearClonedElementsGroup(data.markerName);

            evt.stop();
        });
    });
}

export function _isTargetRangeValid(draggedRange, targetRange) {
    // console.log(`SalesteckDragdrop:_isTargetRangeValid`, {draggedRange, targetRange});
    if (!draggedRange) {
        return true;
    }
    const isEqual = draggedRange.isEqual(targetRange);
    const contains = draggedRange.containsRange(targetRange);
    // console.log({
    //     isEqual, contains
    // })
    return (!isEqual && !contains)
}

export function _createDropView(conversionApi, attributes, icon) {
    return conversionApi.writer.createUIElement(
        'div',
        attributes,
        function (domDocument) {
            const domElement = this.toDomElement(domDocument);

            // Using word joiner to make this marker as high as text and also making text not break on marker.
            domElement.innerHTML = icon;

            return domElement;
        }
    );

}


// Returns a function wrapper that will trigger a function after a specified wait time.
// The timeout can be canceled by calling the cancel function on the returned wrapped function.
//
// @param {Function} func The function to wrap.
// @param {Number} wait The timeout in ms.
// @returns {Function}
export function delay(func, wait) {
    let timer;

    function delayed(...args) {
        delayed.cancel();
        timer = setTimeout(() => func(...args), wait);
    }

    delayed.cancel = () => {
        clearTimeout(timer);
    };

    return delayed;
}
