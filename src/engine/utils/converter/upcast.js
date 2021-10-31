import {
    DATA_BLOCK_NAME,
    DATA_BLOCK_TYPE, DATA_CLASS_SELECTOR, DATA_ORIGINAL_STYLE,
    MODEL_DEFINITION,
    VIEW_ATTR,
    VIEW_CLASS,
    VIEW_NAME,
    VIEW_STYLE
} from "../../../const";
import {_isStrNotEmpty} from "../../../general";


export function _upcastElement(conversion, modelName, viewDefinition, converterPriority = 'highest'){
    conversion.for('upcast').elementToElement({
        view: viewDefinition,
        model: (viewElement, {writer: modelWriter}) => {
            let modelElement = modelWriter.createElement(modelName);

            modelElement = _upcastViewStyle(modelWriter, modelElement, viewElement);

            modelElement = _upcastViewAttr(modelWriter, modelElement, viewElement);

            modelElement = _upcastViewName(modelWriter, modelElement, viewElement);

            modelElement = _upcastViewClass(modelWriter, modelElement, viewElement);

            // modelElement = _upcastClassSelector(modelWriter, modelElement, viewElement);

            modelElement = _upcastBlockType(modelWriter, modelElement, viewElement);
            modelElement = _upcastBlockName(modelWriter, modelElement, viewElement);

            modelElement = _upcastModelDefinition(modelWriter, modelElement, viewDefinition);

            // modelElement = _upcastChildCount(modelWriter, modelElement, viewDefinition);
            // if(viewElement.name === "style"){
            //
            //     console.log('_upcastElement', {viewElement, modelElement});
            // }
            return modelElement;
        }, converterPriority : converterPriority
    });
}

export function _upcastViewStyle(modelWriter, modelElement, viewElement){
    modelWriter.setAttribute(VIEW_STYLE, viewElement.getAttribute(DATA_ORIGINAL_STYLE), modelElement);
    return modelElement;
}

export function _upcastViewAttr(modelWriter, modelElement, viewElement){
    // const originalAttr = [...viewElement.getAttributes()].filter(([key, value]) => !key.startsWith('data-bs-'));
    let attributes = Object.fromEntries(viewElement.getAttributes());
    // let attributes = Object.fromEntries(originalAttr);
    delete attributes.class; delete attributes.style;

    // const filtered = Object.entries(attributes).filter(([key, value]) => !key.startsWith('data-bs-'));
    // console.log(`_upcastViewAttr:${modelElement.name}`, {attributes, filtered, originalAttr});
    modelWriter.setAttribute(VIEW_ATTR, JSON.stringify(attributes), modelElement);
    return modelElement;

}

export function _upcastViewName(modelWriter, modelElement, viewElement){
    modelWriter.setAttribute(VIEW_NAME, viewElement.name, modelElement);
    return modelElement;
}

export function _upcastViewClass(modelWriter, modelElement, viewElement, classSelector = ""){
    let viewClass = viewElement.getAttribute('class');
    if(_isStrNotEmpty(classSelector)){
        viewClass = viewClass.replace(classSelector, "");
        modelWriter.setAttribute(DATA_CLASS_SELECTOR, classSelector, modelElement);
    }
    // if(modelElement.name === 'offcanvas-body'){
    //     console.log({modelElement, viewElement, viewClass, classSelector});
    // }
    modelWriter.setAttribute(VIEW_CLASS, viewClass, modelElement);
    return modelElement;
}

// export function _upcastClassSelector(modelWriter, modelElement, viewElement){
//     const blockSelector = viewElement.getAttribute(DATA_CLASS_SELECTOR) || '';
//     if(_isStrNotEmpty(blockSelector)){
//         modelWriter.setAttribute(DATA_CLASS_SELECTOR, blockSelector, modelElement);
//     }
//     return modelElement;
// }

export function _upcastBlockType(modelWriter, modelElement, viewElement){
    modelWriter.setAttribute(DATA_BLOCK_TYPE, (viewElement.getAttribute(DATA_BLOCK_TYPE) || modelElement.name), modelElement);
    return modelElement;
}

export function _upcastBlockName(modelWriter, modelElement, viewElement){
    const blockName = viewElement.getAttribute(DATA_BLOCK_NAME) || '';
    if(_isStrNotEmpty(blockName)){
        modelWriter.setAttribute(DATA_BLOCK_NAME, blockName, modelElement);
    }
    return modelElement;
}

export function _upcastModelDefinition(modelWriter, modelElement, viewDefinition){
    modelWriter.setAttribute(MODEL_DEFINITION, JSON.stringify(viewDefinition), modelElement);
    return modelElement;
}
