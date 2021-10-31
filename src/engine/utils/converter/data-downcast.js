import {MODEL_DEFINITION, VIEW_ATTR, VIEW_NAME} from "../../../const";



export function _dataDowncast(conversion, modelName){
    _dataDowncastElement(conversion, modelName);
}

export function _dataDowncastElement(conversion, modelName){
    conversion.for('dataDowncast').elementToElement({
        model: modelName,
        view: (modelElement, {writer: viewWriter}) => {
            // let blockView = viewWriter.createContainerElement(modelElement.getAttribute(VIEW_NAME) || 'div', modelElement.getAttributes());
            let blockView = viewWriter.createContainerElement(modelElement.getAttribute(VIEW_NAME) || 'div');


            viewWriter.removeAttribute(VIEW_NAME, blockView);

            viewWriter.removeAttribute(MODEL_DEFINITION, blockView);

            // console.log(`_dataDowncastElement:${modelElement.name}`, {modelElement, blockView});
            // console.log(`_dataDowncastElement:${modelElement.name}`, {modelElement, blockView});

            return blockView;
        }
    });
}
