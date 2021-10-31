import {_isJsonString, _isStrNotEmpty} from "../../../general";
import {ATTR_FORCE_EDITING_DOWNCAST, UN_ALLOWED_ATTR_VAL_EDITING_DOWNCAST} from "./converter";
import {DATA_ORIGINAL_CLASS, DATA_ORIGINAL_STYLE, VIEW_ATTR, VIEW_CLASS, VIEW_STYLE} from "../../../const";

export function _downcastViewAttr(viewWriter, viewElement, data, isDataDowncast = false) {
    // const attrKey = data.attributeKey;
    // const oldValue = data.item.attributeOldValue;
    // const newValue = data.item.attributeNewValue;
    // const model = data.item;
    // console.log('_downcastViewAttr', {viewElement, attrKey, oldValue, newValue, model});
    if (data.attributeOldValue) {
        let oldAttr = data.attributeOldValue;
        if (_isJsonString(oldAttr)) {
            oldAttr = JSON.parse(oldAttr);
            Object.keys(oldAttr).map((attrKey) => {
                viewWriter.removeAttribute(attrKey, viewElement);
            })
        }
    }
    if (data.attributeNewValue) {
        let allAttr = data.attributeNewValue;
        if (_isJsonString(allAttr)) {
            allAttr = JSON.parse(allAttr);

            if(isDataDowncast){
                Object.entries(allAttr).map(([attrKey, attrVal]) => {
                    viewWriter.setAttribute(attrKey, attrVal, viewElement);
                })
            }else {
                Object.entries(allAttr).map(([attrKey, attrVal]) => {
                    if (ATTR_FORCE_EDITING_DOWNCAST.includes(attrKey) && !UN_ALLOWED_ATTR_VAL_EDITING_DOWNCAST.includes(attrVal)) {
                        viewWriter.setAttribute(attrKey, attrVal, viewElement);
                    }
                })
            }

        }
    }
    //viewWriter.removeAttribute(VIEW_ATTR, viewElement);
    if(!isDataDowncast){

        viewWriter.setAttribute(VIEW_ATTR, data.attributeNewValue, viewElement);
    }
    return viewElement;
}

export function _downcastViewClass(viewWriter, viewElement, data) {
    if (_isStrNotEmpty(data.attributeOldValue)) {
        viewWriter.removeClass(data.attributeOldValue.split(' '), viewElement);
    }
    if (_isStrNotEmpty(data.attributeNewValue)) {
        viewWriter.addClass(data.attributeNewValue.split(' '), viewElement);
    }
    // todo
    // viewWriter.setAttribute(DATA_ORIGINAL_CLASS, viewElement.getAttribute('class'), viewElement);
    viewWriter.removeAttribute(VIEW_CLASS, viewElement);
    return viewElement;
}

export function _downcastViewStyle(viewWriter, viewElement, data) {

    let jsonStyle = data.attributeNewValue || "";
    viewWriter.setAttribute('style', jsonStyle,  viewElement);
    viewWriter.setAttribute(DATA_ORIGINAL_STYLE, jsonStyle,  viewElement);
    viewWriter.removeAttribute(VIEW_STYLE, viewElement);
    // console.log('_downcastViewStyle', {arguments, jsonStyle, viewElement});
    return viewElement;

}


export function _downcastViewChildCount(viewWriter, viewElement, data) {
    const model = data.item;
    if(model){
        viewWriter.setAttribute(data.attributeKey, model.childCount, viewElement);
    }
    return viewElement;

}

