import {Plugin} from 'ckeditor5/src/core';
import BlocksEditing, {ALLOWED_ATTR} from "../../../_block/block/blocks-editing";
import {toWidget, toWidgetEditable} from "ckeditor5/src/widget";
import {DATA_BLOCK_TYPE, VIEW_CLASS} from "../../../const";
import {uid} from "ckeditor5/src/utils";
import './theme/style.css';
import {_setUnRemovableAttr} from "../utils/hidden-block-utils";
import StyleEditing from "../../side-bar/style/style-editing";
import ClassAttributesEditing from "../../side-bar/class/class-attributes-editing";
import AttributesEditing from "../../side-bar/attribute/attributes-editing";
import {BS_ATTR} from "../../attr-converter/_bs/_attr/bs-attr-converter";
import HiddenComponents from "../hidden-components";
import modalIcon from '../theme/icon/modal.svg';
import {_upcastViewAttr, _upcastViewClass} from "../../../engine/utils/converter/upcast";

const MODAL = {
    modal : 'modal',
    modalDialog : 'modal-dialog',
    modalContent : 'modal-content',
    modalComponents : ['header', 'body', 'footer']
};
export const MODAL_DEF = {
    modelName: 'modal',
    name: 'div',
    classes: 'modal-dialog',
    attributes: {
        'data-block-type': 'modal',
    }
};
export default class ModalEditing extends Plugin {
    static get pluginName() {
        return 'ModalEditing';
    }
    static get requires(){
        return [BlocksEditing];
    }

    constructor(editor) {
        super(editor);
        this._setUpModal();
        this._setUpModalDialog();
        this._setUpModalContent();
        this._setUpModalComponents();
    }


    _setUpModal(){
        this._defineModalSchema();
        this._convertModal();
    }

    _defineModalSchema(){

        const schema = this.editor.model.schema;
        let allowedAttr = ALLOWED_ATTR.slice();
        allowedAttr = allowedAttr.concat([
            'id', BS_ATTR.backdrop, BS_ATTR.keyboard, BS_ATTR.focus, "show", 'fade', 'auto-toggle'
        ]);
        // console.log(`ModalEditing:_defineSchema`, {allowedAttr});
        schema.register('modal', {
            isSelectable: true,
            allowAttributes: allowedAttr,
            allowIn: ['$root']
        });


        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('modalDialog') && childDefinition.name === 'modal') {
                return false;
            }
        });
    }

    _convertModal(){
        const editor = this.editor;
        const conversion = editor.conversion;
        const modelName = 'modal';
        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'modal',
                attributes: {
                    'data-block-type': modelName,
                }
            },
            model: (view, conversionApi) => {

                let modelElement = conversionApi.writer.createElement(modelName);
                modelElement = _upcastViewClass(conversionApi.writer, modelElement, view, modelName);
                conversionApi.writer.setAttribute('id', view.getAttribute('id') || uid(), modelElement);
                conversionApi.writer.setAttribute(DATA_BLOCK_TYPE, modelName, modelElement);
                conversionApi.writer.setAttribute(BS_ATTR.backdrop, view.getAttribute(BS_ATTR.backdrop) === 'true', modelElement);

                // console.log(`ModalEditing:upcast`, { view, modelElement });
                return modelElement;
            }
            , converterPriority: 'highest'
        });
        conversion.for('upcast').attributeToAttribute({
            view: {name: 'div', key: 'class', value: 'fade'},
            model: {key: 'fade', value: viewElement => viewElement.hasClass('fade')? 'fade' : ''}
        });


        conversion.for('downcast').elementToElement({
            model: modelName,
            view: (modelElement, {writer}) => {
                const modalView = writer.createContainerElement('div', {class : modelElement.getAttribute(VIEW_CLASS)});
                writer.setAttribute(DATA_BLOCK_TYPE, modelName, modalView)
                // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                return modalView;
            }
            , converterPriority: 'highest'
        });
        conversion.for('upcast').attributeToAttribute({
            view: {name: 'div', key: 'id'},
            model: {key: 'id', value: viewElement => viewElement.getAttribute('id')}
        });
        conversion.for('downcast').attributeToAttribute({ model: 'id', view: 'id', converterPriority: 'highest'});

        conversion.for('downcast').attributeToAttribute({
            model: 'fade',
            view: fade => ( { key: 'class', value: fade} )
            // , converterPriority: 'highest'
        });

        conversion.for('editingDowncast').add(dispatcher => {

            dispatcher.on(`attribute:show:${MODAL_DEF.modelName}`, ( evt, data, conversionApi ) =>{
                const { writer, mapper, consumable } = conversionApi;
                if ( !consumable.consume( data.item, evt.name ) ) {
                    return;
                }
                const modalElement = data.item;
                const modalView = mapper.toViewElement( modalElement );
                if(data.attributeNewValue && modalView){
                    writer.addClass(['d-block', 'show'], modalView);
                    document.getElementsByTagName('body')[0].classList.add("modal-open");
                    // console.log(`ModalEditing:${evt.name}`, {data, modalElement, modalView, modalDom});
                }else {
                    if(data.attributeOldValue === true){
                        // console.log(`ModalEditing:${evt.name}`, {data, modalElement, modalView});
                        writer.removeClass(['d-block','show'], modalView);
                        document.getElementsByTagName('body')[0].classList.remove("modal-open");
                    }

                }
                // console.log(`ModalEditing:${evt.name}`, {data, modalElement, modalView});
            });
        });


    }



    /**
     * dialog
     */

    _setUpModalDialog(){
        this._defineModalDialogSchema();
        this._convertModalDialog();

    }
    _defineModalDialogSchema(){

        const schema = this.editor.model.schema;
        let allowedAttr = ALLOWED_ATTR.slice();
        allowedAttr = allowedAttr.concat([
            'dialog-centered', 'dialog-scrollable', "size", 'fullscreen'
        ]);
        schema.register(MODAL.modalDialog, {
            // Behaves like a self-contained object (e.g. an image).
            // allowWhere: '$root',
            // isBlock: false,
            // isContent: false,
            // isObject: true,
            // isLimit: true,
            isSelectable: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: allowedAttr,
            allowIn: [MODAL.modal]
        });
        _setUnRemovableAttr(schema, MODAL.modalDialog);
    }
    _convertModalDialog(){

        const editor = this.editor;
        const conversion = editor.conversion;
        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'modal-dialog'
            },
            // model: 'modalDialog',
            model: (modalDialogView, conversionApi)=>{
                let modelElement  = conversionApi.writer.createElement(MODAL.modalDialog);
                const modalDialogClass = modalDialogView.getAttribute('class');
                const sizeRegexp = /\bmodal-([\S\w]{2})\b/;
                const sizeMatch = modalDialogClass.match( sizeRegexp );
                const size = sizeMatch ? sizeMatch[1] : 'md';

                const fullScreenRegexp = /\bmodal-fullscreen-([\S\w]{2,3})-down\b/;
                modelElement = _upcastViewClass(conversionApi.writer, modelElement, modalDialogView, 'modal-dialog');
                const fullscreenMatch = modalDialogClass.match( fullScreenRegexp );
                const fullscreen = fullscreenMatch ? fullscreenMatch[1] : '';

                conversionApi.writer.setAttribute('size', size, modelElement);
                conversionApi.writer.setAttribute('fullscreen', fullscreen, modelElement);
                conversionApi.writer.setAttribute(DATA_BLOCK_TYPE, MODAL.modalDialog, modelElement);
                // console.log(`ModalEditing:upcast`, {modalDialogView, modelElement, modalDialogClass, match, regexp, size});
                return modelElement;

            }
            , converterPriority: 'highest'
        });

        conversion.for('downcast').elementToElement({
            model: MODAL.modalDialog,
            // view: { name: 'div', classes: 'modal-dialog' }

            view: (modelElement, {writer}) => {
                // console.log(`ModalEditing:editingDowncast`, {modelElement});
                // const modalView = writer.createContainerElement('div', {class : 'modal-dialog'});
                // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                // return modalView;
                return writer.createContainerElement('div', {class : 'modal-dialog'});
            }
            , converterPriority: 'highest'
        });

        const ATTR = ['dialog-centered', 'dialog-scrollable'];
        ATTR.forEach( attr =>{
            conversion.for('upcast').attributeToAttribute({
                view: {name: 'div', key: 'class', value: `modal-${attr}`},
                model: {key: attr, value: viewElement => viewElement.hasClass(`modal-${attr}`)}
            });

            conversion.for('downcast').attributeToAttribute({
                model: attr,
                view: modelAttributeValue => ( { key: 'class', value: modelAttributeValue ? `modal-${attr}` : ''} )
                , converterPriority: 'highest'
            });
        });
        //TODO fullscreen converting
        conversion.for('downcast').attributeToAttribute({
            model: 'size',
            view: modelAttributeValue => ( {
                key: 'class',
                value: modelAttributeValue ? `modal-${modelAttributeValue}` : ''
            } )
            , converterPriority: 'highest'
        });
        conversion.for('downcast').attributeToAttribute({
            model: 'fullscreen',
            view: modelAttributeValue => ( {
                key: 'class',
                value: modelAttributeValue ? `modal-fullscreen-${modelAttributeValue}-down` : ''
            } )
            , converterPriority: 'highest'
        });
        // conversion.for('editingDowncast').add(dispatcher => {
        //
        //     dispatcher.on(`insert:${MODAL.modalDialog}`,(evt, data, {writer, mapper}) => {
        //         let viewElement = mapper.toViewElement(data.item);
        //         _removeTypeAroundBtnElement(writer, viewElement);
        //         // console.log(`${evt.name}`, {withTypeAroundBtn, evt, data, viewElement});
        //         // evt.stop();
        //     }, { priority: 'lowest' });
        // });
    }

    _setUpModalContent(){
        this._defineModalContentSchema();
        this._convertModalContent();

    }
    _defineModalContentSchema(){
        const schema = this.editor.model.schema;
        schema.register(MODAL.modalContent, {
            // Behaves like a self-contained object (e.g. an image).
            // allowWhere: '$root',
            // isBlock: false,
            // isContent: false,
            // isObject: true,
            // isLimit: true,
            isSelectable: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            allowIn: [MODAL.modalDialog]
        });
        _setUnRemovableAttr(schema, MODAL.modalContent);

    }
    _convertModalContent(){

        const editor = this.editor;
        const conversion = editor.conversion;
        conversion.for('upcast').elementToElement({
            view: {name: 'div', classes: 'modal-content'},
            model: (modalContentView, {writer}) => {
                let modelElement = writer.createElement(MODAL.modalContent);
                modelElement = _upcastViewClass(writer, modelElement, modalContentView, 'modal-content');
                writer.setAttribute(DATA_BLOCK_TYPE, MODAL.modalContent, modelElement);
                return modelElement;

            }
        });
        conversion.for('downcast').elementToElement({
            model: MODAL.modalContent,
            // view: { name: 'div', classes: 'modal-content' }
            view: (modelElement, {writer}) => {
                return writer.createContainerElement('div', {class : 'modal-content'});
            }
            , converterPriority: 'highest'
        });
        conversion.for('editingDowncast').elementToElement({
            model: MODAL.modalContent,
            // view: { name: 'div', classes: 'modal-content' }
            view: (modelElement, {writer}) => {
                // console.log(`ModalEditing:editingDowncast`, {modelElement});
                const modalView = writer.createContainerElement('div', {class : 'modal-content'});
                // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                // return toWidget(modalView, writer);
                return toWidget(modalView, writer);
            }
            , converterPriority: 'highest'
        });

        // conversion.for('editingDowncast').add(dispatcher => {
        //
        //     dispatcher.on(`insert:${MODAL.modalContent}`,(evt, data, {writer, mapper}) => {
        //         let viewElement = mapper.toViewElement(data.item);
        //         _removeTypeAroundBtnElement(writer, viewElement);
        //         // console.log(`${evt.name}`, {withTypeAroundBtn, evt, data, viewElement});
        //         // evt.stop();
        //     }, { priority: 'lowest' });
        // });
    }

    _setUpModalComponents(){
        this._defineModalComponents();
        this._convertModalComponents();
    }
    _defineModalComponents(){
        const schema = this.editor.model.schema;
        MODAL.modalComponents.forEach(elem =>{

            schema.register(`modal-${elem}`, {
                // Behaves like a self-contained object (e.g. an image).
                // allowWhere: '$root',
                // isBlock: false,
                // isContent: false,
                // isObject: true,
                // allowContentOf: '$root',
                isLimit: true,
                isSelectable: true,
                // isLimit: true,
                // Allow in places where other blocks are allowed (e.g. directly in the root).
                allowAttributes: ALLOWED_ATTR,
                allowIn: [MODAL.modalContent]
            });
            schema.extend('$block', {allowIn: [`modal-${elem}`]});
        });

        schema.extend(BlocksEditing.containerPluginName, { allowIn: [`modal-body`]});
        schema.extend(BlocksEditing.blockPluginName, {allowIn: [`modal-body`]});
        _setUnRemovableAttr(schema, 'modal-body');

    }
    _convertModalComponents(){

        const editor = this.editor;
        const conversion = editor.conversion;
        MODAL.modalComponents.forEach(elem =>{
            const modelName = `modal-${elem}`;
            const modelClass = `modal-${elem.toLowerCase()}`;
            conversion.for('upcast').elementToElement({
                view: {name: 'div', classes: modelClass},
                model: (modalContentView, {writer}) => {
                    let modelElement = writer.createElement(modelName);

                    modelElement = _upcastViewClass(writer, modelElement, modalContentView, modelClass);
                    modelElement = _upcastViewAttr(writer, modelElement, modalContentView);
                    writer.setAttribute(DATA_BLOCK_TYPE, modelName, modelElement);
                    return modelElement;

                }
            });
            conversion.for('editingDowncast').elementToElement({
                model: modelName,
                view: (modelElement, {writer}) => {
                    const modalView = writer.createEditableElement('div', {class: modelElement.getAttribute(VIEW_CLASS)});
                    // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                    return toWidgetEditable(modalView, writer);
                }
                // , converterPriority: 'highest'
            });
            conversion.for('dataDowncast').elementToElement({
                model: modelName,
                view: (modelElement, {writer}) => {
                    // const modalView = writer.createEditableElement('div', {class: modelElement.getAttribute(VIEW_CLASS)});
                    // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                    // return modalView;
                    return writer.createEditableElement('div', {class: modelElement.getAttribute(VIEW_CLASS)});
                }
                // , converterPriority: 'highest'
            });
        })
    }


}

StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat(['modal-header', 'modal-body', 'modal-footer']);
ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat(['modal-header', 'modal-body', 'modal-footer']);
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat(['modal-header', 'modal-body', 'modal-footer']);
HiddenComponents._hiddenElementsAdd = HiddenComponents._hiddenElementsAdd.concat([{
    modelName : 'modal',
    htmlDefinition : `<div class="modal fade" data-block-type="modal" >
       <div class="modal-dialog modal-lg modal-dialog-centered" data-block-type="modalDialog">
            <div class="modal-content" data-block-type="modalContent">
                <div class="modal-body" data-block-type="modal-body">
                    <div data-block-type="text-container">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    icon : modalIcon,
    url : '',
    selector : '[data-block-type=modal]'
}]);
