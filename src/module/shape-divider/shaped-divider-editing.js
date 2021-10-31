import {Plugin} from 'ckeditor5/src/core';
import {_upcastBlockType, _upcastViewAttr, _upcastViewClass, _upcastViewStyle} from "../../engine/utils/converter/upcast";
import {DATA_BLOCK_NAME, DATA_BLOCK_TYPE, DATA_CHILD_COUNT} from "../../const";
import BlocksEditing, {ALLOWED_ATTR} from "../../_block/block/blocks-editing";
import {toWidget} from "ckeditor5/src/widget";
import "./theme/style.css";
export default class ShapedDividerEditing extends Plugin{
    static get pluginName() {
        return 'ShapedDividerEditing';
    }
    static get modelName(){
        return 'shape-divider';
    }
    constructor(editor) {
        super(editor);

    }
    init(){
        this._defineSchema();
        this._defineConversion();

    }
    _defineSchema(){
        const schema = this.editor.model.schema;
        // console.log(`ModalEditing:_defineSchema`, {allowedAttr});
        schema.register(ShapedDividerEditing.modelName, {
            isSelectable: true,
            isLimit: true,
            allowAttributes: ALLOWED_ATTR,
            allowIn: [BlocksEditing.blockPluginName, BlocksEditing.sectionPluginName]
        });

    }
    _defineConversion(){
        const editor = this.editor;
        const conversion = editor.conversion;
        const modelName = ShapedDividerEditing.modelName;
        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                attributes: {
                    'data-block-type': modelName,
                }
            },
            model: (view, conversionApi) => {

                let modelElement = conversionApi.writer.createElement(modelName);
                modelElement = _upcastViewClass(conversionApi.writer, modelElement, view, modelName);
                modelElement = _upcastViewStyle(conversionApi.writer, modelElement, view);
                modelElement = _upcastBlockType(conversionApi.writer, modelElement, view)
                modelElement = _upcastViewAttr(conversionApi.writer, modelElement, view);
                return modelElement;
            }
            , converterPriority: 'highest'
        });
        conversion.for('editingDowncast').elementToElement({
            model: modelName,
            view: (modelElement, {writer}) => {
                // console.log(`ModalEditing:editingDowncast`, {modelElement});
                const shapeDividerView = writer.createContainerElement('div');
                writer.setAttribute(DATA_BLOCK_TYPE, modelElement.name, shapeDividerView);
                writer.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, shapeDividerView);
                writer.setAttribute(DATA_BLOCK_NAME, modelElement.name, shapeDividerView);
                // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                // return toWidget(modalView, writer);
                return toWidget(shapeDividerView, writer, {hasSelectionHandle : true});
            }
            , converterPriority: 'highest'
        })
        conversion.for('dataDowncast').elementToElement({
            model: modelName,
            // view: { name: 'div', classes: 'modal-content' }
            view: (modelElement, {writer}) => {
                // console.log(`ModalEditing:editingDowncast`, {modelElement});
                const shapeDividerView = writer.createContainerElement('div');
                writer.setAttribute(DATA_BLOCK_TYPE, modelElement.name, shapeDividerView);
                // console.log(`ModalEditing:editingDowncast`, {modelElement, modalView});
                // return toWidget(modalView, writer);
                return shapeDividerView;
            }
            , converterPriority: 'highest'
        })
    }
}
