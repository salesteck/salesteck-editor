import {_isFunction, _isStrNotEmpty} from "../../general";

export function _setViewProperty(viewWriter, viewElement, propertyName, propertyValue){
    if(viewElement && _isStrNotEmpty(propertyName) && _isFunction(viewWriter.setCustomProperty)){
        viewWriter.setCustomProperty(propertyName, propertyValue, viewElement);
    }

}
export function _getViewProperty(viewElement, propertyName){
    if(viewElement && _isStrNotEmpty(propertyName) && _isFunction(viewElement.getCustomProperty)){
        return viewElement.getCustomProperty(propertyName);
    }
    return null;
}

export function _compareViewProperty(viewElement, propertyName, propertyValue){
    return _getViewProperty(viewElement, propertyName) === propertyValue;
}

export function _setBlockName(viewWriter, viewElement, blockName){
    _setViewProperty(viewWriter, viewElement, 'blockName', blockName);
}
export function _getBlockName(viewElement){
    return _getViewProperty(viewElement, 'blockName');
}
export function _compareBlockName(viewElement, modelName){
    return _getBlockName(viewElement) === modelName;
}

export function _enableBlockEditing(viewWriter, viewElement){
    _setViewProperty(viewWriter, viewElement, 'isBlockEditingEnabled', true);
}

export function _isBlockEditingEnabled(viewElement){
    return _compareViewProperty(viewElement, 'isBlockEditingEnabled', true );
}

export function _enableIdAttr(viewWriter, viewElement){
    _setViewProperty(viewWriter, viewElement, 'isIdAttrEnabled', true);
}
