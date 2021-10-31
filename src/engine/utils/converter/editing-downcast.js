
import {toWidgetEditable, toWidget} from 'ckeditor5/src/widget';

import {
    DATA_BLOCK_NAME,
    DATA_CHILD_COUNT,
    MODEL_DEFINITION,
    VIEW_ATTR,
    VIEW_NAME
} from "../../../const";
import {WIDGET_BLOCK_CLASS_NAME} from "../../../_block/utils";
import {_enableBlockEditing, _enableIdAttr, _setBlockName} from "../view";
import {_enableCustomAttribute} from "../../../module/inline/element/inline-element-editing";
import {_downcastViewChildCount} from "./downcast";
import {_addHoverState} from "../../../ckeditor5-hover-attribute/hover-attribute";


export function _widgetEditingDowncast(conversion, modelName, withSelectionHandler = true, withTypeAroundBtn = true, withHoverState = true){

    conversion.for('editingDowncast').elementToElement({
        model: modelName,
        view: (modelElement, {writer: viewWriter}) => {
            const viewName = modelElement.getAttribute(VIEW_NAME);
            let viewElement = viewWriter.createContainerElement(viewName, modelElement.getAttributes());
            if(viewName === "a"){
                viewWriter.setAttribute('href', 'javascript:void(0)', viewElement);
            }
            viewWriter.addClass([WIDGET_BLOCK_CLASS_NAME], viewElement);
            _setBlockName(viewWriter, viewElement, modelName);
            _enableBlockEditing(viewWriter, viewElement);
            _enableIdAttr(viewWriter, viewElement);
            _enableCustomAttribute(viewWriter, viewElement);
            viewWriter.removeAttribute(MODEL_DEFINITION, viewElement);
            viewWriter.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, viewElement);
            viewWriter.setAttribute(DATA_BLOCK_NAME, modelElement.name, viewElement);
            // viewWriter.setAttribute('data-block-type', modelElement.name, viewElement);
            //TODO
            viewWriter.setAttribute("data-path-length", modelElement.getPath().length, viewElement);
            // console.log('_widgetEditingDowncast', {modelElement, viewElement});

            if(withHoverState){
                _addHoverState(viewElement, viewWriter);
            }
            // viewElement = _removeDuplicateSelectHandleElement(viewWriter, viewElement);
            return toWidget(viewElement, viewWriter, {hasSelectionHandle: withSelectionHandler});
            // if(!withTypeAroundBtn){
            //     viewElement = _removeTypeAroundBtnElement(viewWriter, viewElement);
            // }
            // return viewElement;
        },
        converterPriority : 'highest'
    });
    if(!withTypeAroundBtn){
        conversion.for('editingDowncast').add(dispatcher => {

            dispatcher.on(`insert:${modelName}`,(evt, data, {writer, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);
                _removeTypeAroundBtnElement(writer, viewElement);
                // console.log(`${evt.name}`, {withTypeAroundBtn, evt, data, viewElement});
                // evt.stop();
            }, { priority: 'lowest' });
        });
    }

    conversion.for('editingDowncast').add(dispatcher => {
        // dispatcher.on(`insert:${modelName}`,(evt, data, {writer, mapper}) => {
        //     let viewElement = mapper.toViewElement(data.item);
        //     viewElement = _removeTypeAroundBtnElement(writer, viewElement);
        //     console.log(`${evt.name}`, {withTypeAroundBtn, evt, data, viewElement})
        //     // evt.stop();
        // }, { priority: 'lowest' });
        dispatcher.on('attribute:' + DATA_CHILD_COUNT + ':' + modelName, (evt, data, {writer : viewWriter, mapper}) => {
            let viewElement = mapper.toViewElement(data.item);
            if(!viewElement){
                return
            }
            _downcastViewChildCount(viewWriter, viewElement, data);
            // console.log('_widgetEditingDowncast', {evt, data, viewElement});
            evt.stop();

            // viewElement = toWidget(viewElement, viewWriter, {hasSelectionHandle: withSelectionHandler});
            //
            // return _removeDuplicateSelectHandleElement(viewWriter, viewElement);

        });
    });
}

export function _widgetEditableEditingDowncast(conversion, modelName, withHoverState =false){
    conversion.for('editingDowncast').elementToElement({
        model: modelName,
        view: (modelElement, {writer: viewWriter}) => {
            let viewElement = viewWriter.createEditableElement(modelElement.getAttribute(VIEW_NAME), modelElement.getAttributes());
            _setBlockName(viewWriter, viewElement, modelName);
            _enableBlockEditing(viewWriter, viewElement);
            _enableIdAttr(viewWriter, viewElement);
            _enableCustomAttribute(viewWriter, viewElement);

            viewWriter.removeAttribute(MODEL_DEFINITION, viewElement);
            viewWriter.removeAttribute(VIEW_ATTR, viewElement);
            // viewWriter.removeAttribute(VIEW_STYLE, viewElement);
            viewWriter.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, viewElement);

            if(withHoverState){
                _addHoverState(viewElement, viewWriter);
            }
            // console.log('_widgetEditableEditingDowncast', {arguments, viewElement});
            // return toWidgetEditable(viewElement, viewWriter);
            viewElement = toWidgetEditable(viewElement, viewWriter);
            // viewElement.on( 'change:isFocused', ( evt, property, is ) => {
            //     console.log('change:isFocused', {is})
            //     if ( is ) {
            //         viewWriter.addClass( 'ck-editor__nested-editable_focused', viewElement );
            //     } else {
            //         viewWriter.removeClass( 'ck-editor__nested-editable_focused', viewElement );
            //     }
            // } );
            return viewElement;
        }
    });

    conversion.for('editingDowncast').add(dispatcher => {
        dispatcher.on('attribute:' + DATA_CHILD_COUNT + ':' + modelName, (evt, data, {writer : viewWriter, mapper}) => {
            let viewElement = mapper.toViewElement(data.item);
            if(!viewElement){
                return
            }
            _downcastViewChildCount(viewWriter, viewElement, data);
            // console.log('_widgetEditingDowncast', {evt, data, viewElement});
            evt.stop();

            // viewElement = toWidgetEditable(viewElement, viewWriter);
            //
            // viewElement.on( 'change:isFocused', ( evt, property, is ) => {
            //     console.log('change:isFocused')
            //     if ( is ) {
            //         viewWriter.addClass( 'ck-editor__nested-editable_focused', viewElement );
            //     } else {
            //         viewWriter.removeClass( 'ck-editor__nested-editable_focused', viewElement );
            //     }
            // } );
            // return viewElement;

        });
    });
}








/**
 *
 * @param view
 * @returns {null|*}
 */
function getDuplicateSelectHandleElement(view){
    const childCount = view.childCount
    if(childCount > 0){
        for(let i = 0; i<childCount ; i ++){
            const childElement = view.getChild(i);
            if(childElement && childElement.is('element') && childElement.hasClass("ck-widget__selection-handle")){
                return childElement;
            }

        }
    }
    return null;
}
/**
 *
 * @param viewWriter
 * @param viewElement
 * @returns {*}
 * @private
 */
export function _removeDuplicateSelectHandleElement(viewWriter, viewElement){
    const duplicateSelectHandle = getDuplicateSelectHandleElement(viewElement);
    // console.log('_removeDuplicateSelectHandleElement', {duplicateSelectHandle});
    if (duplicateSelectHandle) {
        viewWriter.remove(duplicateSelectHandle);
    }
    return viewElement;
}

/**
 *
 * @param view
 * @returns {null|*}
 */
function getTypeAroundBtnElement(view){
    const childCount = view.childCount;
    if(childCount > 0){
        for(const childElement of view.getChildren()){

            // console.log({view :view, childElement : childElement, childCount : childCount})
            if(childElement && childElement.is('element') && childElement.hasClass("ck-widget__type-around")){
                return childElement;
            }
        }
        // for(let i = 0; i<childCount ; i++){
        //     const childElement = view.getChild(i);
        //     console.log({view :view, childElement : childElement, index : i, childCount : childCount})
        //     if(childElement && childElement.is('element') && childElement.hasClass("ck-widget__type-around")){
        //         return childElement;
        //     }
        //
        // }
    }
    return null;
}
/**
 *
 * @param viewWriter
 * @param viewElement
 * @returns {*}
 * @private
 */
export function _removeTypeAroundBtnElement(viewWriter, viewElement){
    const typeAroundBtnElement = getTypeAroundBtnElement(viewElement);
    // console.log('_removeTypeAroundBtnElement', {viewElement : viewElement, typeAroundBtnElement : typeAroundBtnElement});
    if (typeAroundBtnElement) {
        viewWriter.remove(typeAroundBtnElement);
    }
    return viewElement;
}
