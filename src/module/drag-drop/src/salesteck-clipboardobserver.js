/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module clipboard/clipboardobserver
 */

import DomEventObserver from '@ckeditor/ckeditor5-engine/src/view/observer/domeventobserver';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import DataTransfer from '@ckeditor/ckeditor5-clipboard/src/datatransfer';

import {throttle} from 'lodash-es';
const BODY_SCROLLING_CLASS = "ct-editor-dragging";

/**
 * Clipboard events observer.
 *
 * Fires the following events:
 *
 * * {@link @ckEditor5/engine/view/document~Document#event:clipboardInput},
 * * {@link @ckEditor5/engine/view/document~Document#event:paste},
 * * {@link @ckEditor5/engine/view/document~Document#event:copy},
 * * {@link @ckEditor5/engine/view/document~Document#event:cut},
 * * {@link @ckEditor5/engine/view/document~Document#event:drop},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragover},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragging},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragstart},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragend},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragenter},
 * * {@link @ckEditor5/engine/view/document~Document#event:dragleave}.
 *
 * **Note**: This observer is not available by default (ckeditor5-engine does not add it on its own).
 * To make it available, it needs to be added to {@link @ckEditor5/engine/view/document~Document} by using
 * the {@link @ckEditor5/engine/view/view~View#addObserver `View#addObserver()`} method. Alternatively, you can load the
 * {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin which adds this observer automatically (because it uses it).
 *
 * @extends @ckEditor5/engine/view/observer/domeventobserver~DomEventObserver
 */
export default class SalesteckClipboardObserver extends DomEventObserver {
    constructor(view) {
        super(view);

        const viewDocument = this.document;
        this.scrollYthrottle = throttle(
            (clientY) =>{ _scrollYWindow(clientY) },
            200
        );

        this.domEventType = [ 'dragover' ];

        this.listenTo(viewDocument, 'paste', handleInput('salesteckClipboardInput'), {priority: 'normal'});
        this.listenTo(viewDocument, 'drop', handleInput('salesteckClipboardInput'), {priority: 'normal'});
        this.listenTo(viewDocument, 'dragover', handleInput('dragging'), {priority: 'normal'});

        const _this = this;
        this.listenTo(window.document, 'dragstart', ()=>{
            const body = document.getElementsByTagName('body')[0];
            if(!body.classList.contains('modal-open') && !body.classList.contains(BODY_SCROLLING_CLASS)){
                body.classList.add(BODY_SCROLLING_CLASS);
            }
        }, {priority: 'highest'});
        this.listenTo(window.document, 'dragend', ()=>{
            const body = document.getElementsByTagName('body')[0];
            if(body.classList.contains(BODY_SCROLLING_CLASS)){
                body.classList.remove(BODY_SCROLLING_CLASS);
            }
        }, {priority: 'highest'});
        this.listenTo(window.document, 'dragover', (evt, data) => {
            // console.log(`window.document:${evt.name}`, {evt, data});
            // const domEvent = data.domEvent;
            _this.scrollYthrottle(data.clientY);
        }, {priority: 'highest'});

        function handleInput(type) {
            return (evt, data) => {
                data.preventDefault();

                const targetRanges = data.dropRange ? [data.dropRange] : null;
                const eventInfo = new EventInfo(viewDocument, type);
                if (evt.name === 'dragover') {
                    // _scrollYWindow(data.domEvent.clientY);
                    _this.scrollYthrottle(data.domEvent.clientY);
                    // console.log(`SalesteckClipboardObserver:${evt.name}`, {evt, data});
                }

                viewDocument.fire(eventInfo, {
                    dataTransfer: data.dataTransfer,
                    method: evt.name,
                    targetRanges,
                    target: data.target

                });

                // If CKEditor handled the input, do not bubble the original event any further.
                // This helps external integrations recognize that fact and act accordingly.
                // https://github.com/ckeditor/ckeditor5-upload/issues/92
                if (eventInfo.stop.called) {
                    data.stopPropagation();
                }
                evt.stop();
            };
        }
    }

    onDomEvent(domEvent) {
        const evtData = {
            dataTransfer: new DataTransfer(domEvent.clipboardData ? domEvent.clipboardData : domEvent.dataTransfer)
        };
        // console.log({domEvent, evtData});
        if (domEvent.type == 'drop' || domEvent.type == 'dragover') {
            evtData.dropRange = getDropViewRange(this.view, domEvent);
        }

        this.fire(domEvent.type, domEvent, evtData);

    }

}

function getDropViewRange(view, domEvent) {
    const domDoc = domEvent.target.ownerDocument;
    const x = domEvent.clientX;
    const y = domEvent.clientY;
    let domRange;

    // Webkit & Blink.
    if (domDoc.caretRangeFromPoint && domDoc.caretRangeFromPoint(x, y)) {
        domRange = domDoc.caretRangeFromPoint(x, y);
    }
    // FF.
    else if (domEvent.rangeParent) {
        domRange = domDoc.createRange();
        domRange.setStart(domEvent.rangeParent, domEvent.rangeOffset);
        domRange.collapse(true);
    }

    if (domRange) {
        return view.domConverter.domRangeToView(domRange);
    }

    return null;
}

/**
 * Fired as a continuation of the {@link #event:paste} and {@link #event:drop} events.
 *
 * It is a part of the {@glink framework/guides/deep-dive/clipboard-modified#input-pipeline clipboard-modified input pipeline}.
 *
 * This event carries a `dataTransfer` object which comes from the clipboard-modified and whose content should be processed
 * and inserted into the editor.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @see @ckEditor5/clipboard-modified/clipboard-modified~Clipboard
 * @event @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @param {Object} data The event data.
 * @param {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} data.dataTransfer The data transfer instance.
 * @param {'paste'|'drop'} method Whether the event was triggered by a paste or drop operation.
 * @param {@ckEditor5/engine/view/element~Element} target The tree view element representing the target.
 * @param {Array.<@ckEditor5/engine/view/range~Range>} data.targetRanges Ranges which are the target of the operation
 * (usually – into which the content should be inserted).
 * If the clipboard-modified input was triggered by a paste operation, this property is not set. If by a drop operation,
 * then it is the drop position (which can be different than the selection at the moment of drop).
 */

/**
 * Fired when the user drags the content over one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:dragover
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user dropped the content into one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:drop
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 * @param {@ckEditor5/engine/view/range~Range} dropRange The position into which the content is dropped.
 */

/**
 * Fired when the user pasted the content into one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:paste
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user copied the content from one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @event @ckEditor5/engine/view/document~Document#event:copy
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user cut the content from one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @event @ckEditor5/engine/view/document~Document#event:cut
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * The value of the {@link @ckEditor5/engine/view/document~Document#event:paste},
 * {@link @ckEditor5/engine/view/document~Document#event:copy} and {@link @ckEditor5/engine/view/document~Document#event:cut} events.
 *
 * In order to access the clipboard-modified data, use the `dataTransfer` property.
 *
 * @class @ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData
 * @extends @ckEditor5/engine/view/observer/domeventdata~DomEventData
 */

/**
 * The data transfer instance.
 *
 * @readonly
 * @member {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} @ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData#dataTransfer
 */

/**
 * Fired as a continuation of the {@link #event:dragover} event.
 *
 * It is a part of the {@glink framework/guides/deep-dive/clipboard-modified#input-pipeline clipboard-modified input pipeline}.
 *
 * This event carries a `dataTransfer` object which comes from the clipboard-modified and whose content should be processed
 * and inserted into the editor.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @see @ckEditor5/clipboard-modified/clipboard-modified~Clipboard
 * @event @ckEditor5/engine/view/document~Document#event:dragging
 * @param {Object} data The event data.
 * @param {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} data.dataTransfer The data transfer instance.
 * @param {@ckEditor5/engine/view/element~Element} target The tree view element representing the target.
 * @param {Array.<@ckEditor5/engine/view/range~Range>} data.targetRanges Ranges which are the target of the operation
 * (usually – into which the content should be inserted).
 * It is the drop position (which can be different than the selection at the moment of drop).
 */

/**
 * Fired when the user starts dragging the content in one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:dragstart
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user ended dragging the content.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:dragend
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user drags the content into one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:dragenter
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

/**
 * Fired when the user drags the content out of one of the editing roots of the editor.
 *
 * Introduced by {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}.
 *
 * **Note**: This event is not available by default. To make it available, {@link @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver}
 * needs to be added to the {@link @ckEditor5/engine/view/document~Document} by using the {@link @ckEditor5/engine/view/view~View#addObserver}
 * method. This is usually done by the {@link @ckEditor5/clipboard-modified/clipboard-modified~Clipboard} plugin, but if for some reason it is not loaded,
 * the observer must be added manually.
 *
 * @see @ckEditor5/engine/view/document~Document#event:clipboardInput
 * @event @ckEditor5/engine/view/document~Document#event:dragleave
 * @param {@ckEditor5/clipboard-modified/clipboardobserver~ClipboardEventData} data The event data.
 */

const SCROLL_HEIGHT_AREA = 80;
const SCROLL_HEIGHT = SCROLL_HEIGHT_AREA * 2;


function _scrollYWindow(screenPositionY) {
    // console.log("_scrollYWindow", {screenPositionY});
    const body = document.getElementsByTagName('body')[0];

    if(!body.classList.contains('modal-open')){
        if (Number.isInteger(screenPositionY)) {
            const topArea = SCROLL_HEIGHT_AREA;
            const bottomAreaStart = Math.abs(window.innerHeight - SCROLL_HEIGHT_AREA);
            if (screenPositionY < topArea) {
                _smoothScroll(-SCROLL_HEIGHT);
                //scroll up
            } else if (screenPositionY > bottomAreaStart) {
                _smoothScroll(SCROLL_HEIGHT);
                //scroll down
            }
        }
    }
}

//
function _smoothScroll(offset = 0) {

    window.scrollBy({
        top: offset,
        left: 0,
        behavior: 'smooth'
    });
    // const scrollPromise = new Promise((resolve, reject) => {
    //     if (isDocumentScrolling) {
    //         reject();
    //     }
    //     isDocumentScrolling = true;
    //     window.scrollBy({
    //         top: offset,
    //         left: 0,
    //         behavior: 'smooth'
    //     });
    //     // console.log("is scrolling", {isDocumentScrolling});
    //     resolve();
    // });
    // scrollPromise
    //     .then(() => {
    //         isDocumentScrolling = false;
    //         // console.log("Promise resolve", {isDocumentScrolling});
    //     })
    //     .catch(() => {
    //         isDocumentScrolling = false;
    //         // console.log("Promise reject", {isDocumentScrolling});
    //     })
}
