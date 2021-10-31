
import {DATA_BLOCK_TYPE} from "../../../const";
export function findViewForWidgetToolbar(editor, viewSelection, modelName) {
    const selectedViewElement = viewSelection.getSelectedElement() || null;
    // if(modelName === InlineElementEditing.modelName){
    //     console.log(`findViewForWidgetToolbar:${modelName}`, {viewSelection, selectedViewElement, modelName})
    // }
    if (selectedViewElement) {
        if (
            // _isBlockEditingEnabled(selectedViewElement) &&
            // _compareBlockName(selectedViewElement, modelName) &&
            selectedViewElement.getAttribute(DATA_BLOCK_TYPE) === modelName
        ) {
            return selectedViewElement;
        }
    } else {
        // const firstPosition = viewSelection.getFirstPosition();
        // const inlineBlockViewElement = findInlineParentBlockViewElement(firstPosition);
        // console.log("findInlineBlockViewElement", {firstPosition, inlineBlockViewElement})

        return findInlineParentBlockViewElement(viewSelection.getFirstPosition(), modelName) || null;
    }
    return null;
}

function findInlineParentBlockViewElement(positionOrViewElement, modelName) {
    let parentView = positionOrViewElement.parent;

    while (parentView) {
        if (parentView.is('element')) {
            const isEditingEnabled =
                parentView &&
                // _isBlockEditingEnabled(parentView) &&
                // _compareBlockName(parentView, modelName) &&
                parentView.getAttribute(DATA_BLOCK_TYPE) === modelName
            ;
            if (isEditingEnabled) {
                return parentView;
            }
        }
        parentView = parentView.parent;
    }
    return null;
}
