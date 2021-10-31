import {Plugin} from 'ckeditor5/src/core';
import BlocksEditing, {ALLOWED_ATTR} from "../../../_block/block/blocks-editing";
import {DATA_BLOCK_TYPE, DATA_CHILD_COUNT, DATA_CLASS_SELECTOR, VIEW_CLASS} from "../../../const";
import {uid} from "ckeditor5/src/utils";
import {toWidgetEditable} from "ckeditor5/src/widget";
import './theme/style.css';
import {_setUnRemovableAttr} from "../utils/hidden-block-utils";
import StyleEditing from "../../side-bar/style/style-editing";
import ClassAttributesEditing from "../../side-bar/class/class-attributes-editing";
import AttributesEditing from "../../side-bar/attribute/attributes-editing";
import {BS_ATTR} from "../../attr-converter/_bs/_attr/bs-attr-converter";
import HiddenComponents from "../hidden-components";
import offcanvasIcon from "../theme/icon/offcanvas.svg";
import {_upcastViewAttr, _upcastViewClass} from "../../../engine/utils/converter/upcast";

const OFFCANVAS = {
    components : ['header', 'body', 'footer']
};
export default class OffcanvasEditing extends Plugin{

    static get pluginName() {
        return 'OffcanvasEditing';
    }
    static get requires(){
        return [BlocksEditing];
    }
    constructor(editor) {
        super(editor);
        this._setUpOffcanvas();
        this._setUpOffcanvasComponents();
    }
    _setUpOffcanvas(){
        const editor = this.editor;
        const conversion = editor.conversion;
        const schema = editor.model.schema;
        let allowedAttr = ALLOWED_ATTR.slice();
        const modelName = 'offcanvas';
        allowedAttr = allowedAttr.concat([
            'id', BS_ATTR.backdrop, BS_ATTR.keyboard, BS_ATTR.scroll, "show", 'placement'
        ]);
        // console.log(`OffcanvasEditing:_defineSchema`, {allowedAttr});
        schema.register(modelName, {
            isSelectable: true,
            allowAttributes: allowedAttr,
            allowIn: ['$root']
        });
        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: modelName,
                attributes: {
                    'data-block-type': modelName,
                }
            },
            model: (view, conversionApi) => {

                let modelElement = conversionApi.writer.createElement(modelName);
                const regexp = /\boffcanvas-([\S\w]+)\b/;
                const offCanvasClasses = view.getAttribute('class');
                const match = offCanvasClasses.match( regexp );
                const placement = match ? match[1] : 'left';
                conversionApi.writer.setAttribute('placement', placement, modelElement);
                modelElement = _upcastViewClass(conversionApi.writer, modelElement, view, modelName);
                modelElement = _upcastViewAttr(conversionApi.writer, modelElement, view);
                // conversionApi.writer.setAttribute(VIEW_CLASS, view.getAttribute('class'), modelElement);
                conversionApi.writer.setAttribute('id', view.getAttribute('id') || uid(), modelElement);
                conversionApi.writer.setAttribute(DATA_BLOCK_TYPE, modelName, modelElement);

                // console.log(`OffcanvasEditing:upcast`, { view, modelElement });
                return modelElement;
            }
            , converterPriority: 'highest'
        });
        conversion.for('downcast').elementToElement({
            model: modelName,
            view: (modelElement, {writer}) => {
                const view = writer.createContainerElement('div', {class : modelElement.getAttribute(VIEW_CLASS)});
                writer.addClass(modelName, view);
                // console.log(`OffcanvasEditing:editingDowncast`, {modelElement, modalView});
                return view;
            }
            , converterPriority: 'highest'
        });


        conversion.for('downcast').attributeToAttribute({
            model: 'placement',
            view: placement => ( {
                key: 'class',
                value: placement ? `offcanvas-${placement}` : `offcanvas-left`
            } )
            , converterPriority: 'highest'
        });
        conversion.for('editingDowncast').add(dispatcher => {
            dispatcher.on(`attribute:show:${modelName}`, ( evt, data, conversionApi ) =>{
                const { writer, mapper, consumable } = conversionApi;
                if ( !consumable.consume( data.item, evt.name ) ) {
                    return;
                }
                const modelElement = data.item;
                const view = mapper.toViewElement( modelElement );
                // const modalDom = editor.editing.view.domConverter.viewToDom(modalView);
                if(data.attributeNewValue && modelElement){
                    // const modal = new Modal(modalDom, {
                    //     backdrop : 'static', keyboard : true
                    // });
                    // modal.show();
                    writer.addClass(['show'], view);
                    document.getElementsByTagName('body')[0].classList.add('modal-open');
                    // console.log(`OffcanvasEditing:${evt.name}`, {data, modelElement, view});
                }else {
                    if(data.attributeOldValue === true){
                        writer.removeClass(['show'], view);
                        document.getElementsByTagName('body')[0].classList.remove('modal-open');
                    }

                }
                // console.log(`OffcanvasEditing:${evt.name}`, {data, modalElement, modalView});
            });
        });

        conversion.for('dataDowncast').add(dispatcher =>{
            dispatcher.on('attribute:' + BS_ATTR.scroll , (evt, data, {writer : viewWriter, mapper}) => {
                let blockView = mapper.toViewElement(data.item);
                if(data.attributeNewValue ){
                    viewWriter.setAttribute(BS_ATTR.scroll, data.attributeNewValue,  blockView);
                }else {
                    viewWriter.removeAttribute(BS_ATTR.scroll,  blockView);
                }
                evt.stop();
            }, {priority:'highest'});

        });

    }
    _setUpOffcanvasComponents(){
        const editor = this.editor;
        const conversion = editor.conversion;
        const schema = editor.model.schema;
        OFFCANVAS.components.forEach( component =>{
            const modelName = `offcanvas-${component}`;
            schema.register(modelName, {
                isSelectable: true,
                isLimit: true,
                allowAttributes: ALLOWED_ATTR,
                allowIn: ['offcanvas']
            });
            schema.extend('$block', {allowIn: [modelName]});
            conversion.for('upcast').elementToElement({
                view: {
                    name: 'div',
                    classes: modelName
                },
                model: (view, conversionApi) => {

                    let modelElement = conversionApi.writer.createElement(modelName);
                    conversionApi.writer.setAttribute(DATA_CLASS_SELECTOR, modelName, modelElement);
                    modelElement = _upcastViewClass(conversionApi.writer, modelElement, view, modelName);
                    modelElement = _upcastViewAttr(conversionApi.writer, modelElement, view);
                    // conversionApi.writer.setAttribute('id', view.getAttribute('id') || uid(), modelElement);
                    conversionApi.writer.setAttribute(DATA_BLOCK_TYPE, modelName, modelElement);
                    return modelElement;
                }
                , converterPriority: 'highest'
            });

            conversion.for('editingDowncast').elementToElement({
                model: modelName,
                view: (modelElement, {writer}) => {
                    const view = writer.createEditableElement('div', {class: modelElement.getAttribute(VIEW_CLASS)});
                    writer.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, view);
                    return toWidgetEditable(view, writer);
                }
                , converterPriority: 'highest'
            });
            conversion.for('dataDowncast').elementToElement({
                model: modelName,
                view: (modelElement, {writer}) => {
                    const view = writer.createContainerElement('div', {class : modelElement.getAttribute(VIEW_CLASS)});
                    writer.addClass(modelName, view);
                    return view;
                }
                , converterPriority: 'highest'
            });
        });
        schema.extend(BlocksEditing.containerPluginName, { allowIn: [`offcanvas-body`]});
        schema.extend(BlocksEditing.blockPluginName, {allowIn: [`offcanvas-body`]});
        _setUnRemovableAttr(schema, 'offcanvas-body');
    }
}


StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat(['offcanvas-header', 'offcanvas-body', 'offcanvas-footer']);
ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat(['offcanvas-header', 'offcanvas-body', 'offcanvas-footer']);
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat(['offcanvas-header', 'offcanvas-body', 'offcanvas-footer']);

HiddenComponents._hiddenElementsAdd = HiddenComponents._hiddenElementsAdd.concat([{
    modelName : 'offcanvas',
    htmlDefinition : `<div class="offcanvas offcanvas-bottom" data-block-type="offcanvas">
        <div class="offcanvas-body" data-block-type="offcanvas-body">
            <div data-block-type="text-container"></div>
        </div>
    </div>`,
    icon : offcanvasIcon,
    url : '',
    selector : '[data-block-type=offcanvas]'
}]);
