import {_isStrNotEmpty} from "../../general";

export function getSelectedModelElementFromName(modelSelection, modelName){
    if(modelSelection && _isStrNotEmpty(modelName)){

        const selectedModelElement = modelSelection.getSelectedElement();
        // console.log("TextContainerAttrCommand#getElementFromModelName", {modelSelection, modelName, selectedModelElement});
        if(selectedModelElement && selectedModelElement.name === modelName){
            return selectedModelElement;
        }else {
            return getParentElementFromModelName(modelSelection, modelName)
            // const parentModel = getParentElementFromModelName(modelSelection, modelName);
            // console.log("TextContainerAttrCommand#getParentElementFromModelName", {parentModel, modelSelection})
            // return parentModel;
        }
    }
    return null;
}
function getParentElementFromModelName(modelSelection, modelName){
    const position = modelSelection.getFirstPosition();
    let parentModel  = position.parent;

    while (parentModel) {
        if (parentModel.name === modelName) {
            return parentModel;
        }
        parentModel = parentModel.parent;
    }
    return null;
}
