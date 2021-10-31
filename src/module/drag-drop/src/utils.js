

// Returns fixed selection range for given position and target element.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {Array.<@ckEditor5/engine/view/range~Range>} targetViewRanges
// @param {@ckEditor5/engine/view/element~Element} targetViewElement
// @returns {@ckEditor5/engine/model/range~Range|null}
import { env } from 'ckeditor5/src/utils';
import { isWidget } from 'ckeditor5/src/widget';
import {_isTargetSelectionHandle} from "./salesteck-dragdrop";

export function findDropTargetRange(editor, targetViewRanges, targetViewElement) {
    const model = editor.model;
    const mapper = editor.editing.mapper;

    let range;

    const targetViewPosition = targetViewRanges ? targetViewRanges[0].start : null;

    // A UIElement is not a valid drop element, use parent (this could be a drop marker or any other UIElement).
    if (targetViewElement.is('uiElement')) {
        targetViewElement = targetViewElement.parent;
    }

    // Quick win if the target is a widget (but not a nested editable).
    range = findDropTargetRangeOnWidget(editor, targetViewElement);

    if (range) {
        return range;
    }

    // The easiest part is over, now we need to move to the model space.

    // Find target model element and position.
    const targetModelElement = getClosestMappedModelElement(editor, targetViewElement);
    const targetModelPosition = targetViewPosition ? mapper.toModelPosition(targetViewPosition) : null;

    // There is no target position while hovering over an empty table cell.
    // In Safari, target position can be empty while hovering over a widget (e.g., a page-break).
    // Find the drop position inside the element.
    if (!targetModelPosition) {
        return findDropTargetRangeInElement(editor, targetModelElement);
    }

    // Check if target position is between blocks and adjust drop position to the next object.
    // This is because while hovering over a root element next to a widget the target position can jump in crazy places.
    range = findDropTargetRangeBetweenBlocks(editor, targetModelPosition, targetModelElement);

    if (range) {
        return range;
    }

    // Try fixing selection position.
    // In Firefox, the target position lands before widgets but in other browsers it tends to land after a widget.
    range = model.schema.getNearestSelectionRange(targetModelPosition, env.isGecko ? 'forward' : 'backward');

    if (range) {
        return range;
    }

    // There is no valid selection position inside the current limit element so find a closest object ancestor.
    // This happens if the model position lands directly in the <table> element itself (view target element was a `<td>`
    // so a nested editable, but view target position was directly in the `<figure>` element).
    return findDropTargetRangeOnAncestorObject(editor, targetModelPosition.parent);
}

// Returns fixed selection range for a given position and a target element if it is over the widget but not over its nested editable.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {@ckEditor5/engine/view/element~Element} targetViewElement
// @returns {@ckEditor5/engine/model/range~Range|null}
export function findDropTargetRangeOnWidget(editor, targetViewElement) {
    const model = editor.model;
    const mapper = editor.editing.mapper;

    // Quick win if the target is a widget.
    if (isWidget(targetViewElement)) {
        return model.createRangeOn(mapper.toModelElement(targetViewElement));
    }

    // Check if we are deeper over a widget (but not over a nested editable).
    if (!targetViewElement.is('editableElement')) {
        // Find a closest ancestor that is either a widget or an editable element...
        const ancestor = targetViewElement.findAncestor(node => isWidget(node) || node.is('editableElement'));

        // ...and if the widget was closer then it is a drop target.
        if (isWidget(ancestor)) {
            return model.createRangeOn(mapper.toModelElement(ancestor));
        }
    }

    return null;
}

// Returns fixed selection range inside a model element.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {@ckEditor5/engine/model/element~Element} targetModelElement
// @returns {@ckEditor5/engine/model/range~Range}
export function findDropTargetRangeInElement(editor, targetModelElement) {
    const model = editor.model;
    const schema = model.schema;

    const positionAtElementStart = model.createPositionAt(targetModelElement, 0);

    return schema.getNearestSelectionRange(positionAtElementStart, 'forward');
}

// Returns fixed selection range for a given position and a target element if the drop is between blocks.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {@ckEditor5/engine/model/position~Position} targetModelPosition
// @param {@ckEditor5/engine/model/element~Element} targetModelElement
// @returns {@ckEditor5/engine/model/range~Range|null}
export function findDropTargetRangeBetweenBlocks(editor, targetModelPosition, targetModelElement) {
    const model = editor.model;

    // Check if target is between blocks.
    if (!model.schema.checkChild(targetModelElement, '$block')) {
        return null;
    }

    // Find position between blocks.
    const positionAtElementStart = model.createPositionAt(targetModelElement, 0);

    // Get the common part of the path (inside the target element and the target position).
    const commonPath = targetModelPosition.path.slice(0, positionAtElementStart.path.length);

    // Position between the blocks.
    const betweenBlocksPosition = model.createPositionFromPath(targetModelPosition.root, commonPath);
    const nodeAfter = betweenBlocksPosition.nodeAfter;

    // Adjust drop position to the next object.
    // This is because while hovering over a root element next to a widget the target position can jump in crazy places.
    if (nodeAfter && model.schema.isObject(nodeAfter)) {
        return model.createRangeOn(nodeAfter);
    }

    return null;
}

// Returns a selection range on the ancestor object.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {@ckEditor5/engine/model/element~Element} element
// @returns {@ckEditor5/engine/model/range~Range}
export function findDropTargetRangeOnAncestorObject(editor, element) {
    const model = editor.model;

    while (element) {
        if (model.schema.isObject(element)) {
            return model.createRangeOn(element);
        }

        element = element.parent;
    }
}

// Returns the closest model element for the specified view element.
//
// @param {@ckEditor5/core/editor/editor~Editor} editor
// @param {@ckEditor5/engine/view/element~Element} element
// @returns {@ckEditor5/engine/model/element~Element}
export function getClosestMappedModelElement(editor, element) {
    const mapper = editor.editing.mapper;
    const view = editor.editing.view;

    const targetModelElement = mapper.toModelElement(element);

    if (targetModelElement) {
        return targetModelElement;
    }

    // Find mapped ancestor if the target is inside not mapped element (for example inline code element).
    const viewPosition = view.createPositionBefore(element);
    const viewElement = mapper.findMappedViewAncestor(viewPosition);

    return mapper.toModelElement(viewElement);
}

// Returns the drop effect that should be a result of dragging the content.
// This function is handling a quirk when checking the effect in the 'drop' DOM event.
export function getFinalDropEffect(dataTransfer) {
    if (env.isGecko) {
        return dataTransfer.dropEffect;
    }

    return ['all', 'copyMove'].includes(dataTransfer.effectAllowed) ? 'move' : 'copy';
}

// Returns a widget element that should be dragged.
//
// @param {@ckEditor5/engine/view/element~Element} target
// @returns {@ckEditor5/engine/view/element~Element}
export function findDraggableWidget(target) {
    // This is directly an editable so not a widget for sure.
    if (target.is('editableElement')) {
        return null;
    }

    // Let's have a isWidgetSelectionHandleDomElement() helper in ckeditor5-widget utils.
    if (_isTargetSelectionHandle(target)) {
        return target.findAncestor(isWidget);
    }

    // Direct hit on a widget.
    if (isWidget(target)) {
        return target;
    }

    // Find closest ancestor that is either a widget or an editable element...
    const ancestor = target.findAncestor(node => isWidget(node) || node.is('editableElement'));

    // ...and if closer was the widget then enable dragging it.
    if (isWidget(ancestor)) {
        return ancestor;
    }

    return null;
}

export function setGhostImageDragging(modelName) {
    const img = new Image();
    const svgString =
        `<svg xmlns='http://www.w3.org/2000/svg' height='30' width='150'><text x='0' y='15' fill='red' style='text-transform: uppercase;text-shadow: 1px 1px 2px pink;'>${modelName}</text></svg>`;
    img.src =
        `data:image/svg+xml;charset=utf8,` + svgString;
    img.style.position = 'absolute';
    img.style.top = '-150px';
    img.style.opacity = '1';
    img.id = 'salesteck-editor-drag-ghost-image';
    document.body.appendChild(img);
    return img;
}

export function removeGhostImage() {
    const ghostImage = document.querySelector('#salesteck-editor-drag-ghost-image');
    // console.log("removeGhostImage", {ghostImage});
    if (ghostImage) {
        ghostImage.remove();
    }
}
