import {Plugin} from 'ckeditor5/src/core';
import {toWidget, toWidgetEditable} from 'ckeditor5/src/widget';
import {ALLOWED_ATTR} from "../../_block/block/blocks-editing";
import ModelDefinition from "../../_block/block/model-definition";
import {
    DATA_BLOCK_TYPE,
    DATA_CHILD_COUNT,
    MODEL_DEFINITION,
    VIEW_ATTR,
    VIEW_NAME
} from "../../const";
import {_upcastElement} from "../../engine/utils/converter/upcast";
import {_removeDuplicateSelectHandleElement} from "../../engine/utils/converter/editing-downcast";
import {_dataDowncast} from "../../engine/utils/converter/data-downcast";
import {_enableBlockEditing, _enableIdAttr, _setBlockName} from "../../engine/utils/view";
import {_enableCustomAttribute} from "../inline/element/inline-element-editing";
import {
    _downcastViewChildCount
} from "../../engine/utils/converter/downcast";

/**
 * @namespace Block-Widget.BlockWidgetEditing
 */
/**
 * @module BlockWidget/BlockWidgetEditing
 */
export default class BlockWidgetEditing extends Plugin {
    static plugin(){
        return 'BlockWidgetEditing';
    }

    static get modelName (){
        return "block-widget";
    }

    static get blockWidgetViewDefinition() {
        const attr = {};
        attr[DATA_BLOCK_TYPE] = "block-widget";
        return new ModelDefinition(
            BlockWidgetEditing.modelName,
            '',
            'blockWidgetConfig',
            "",
            "",
            attr
        );
    }

    static get blockWidgetElementViewDefinition() {
        const attr = {};
        attr[DATA_BLOCK_TYPE] = "block-widget-element";
        return new ModelDefinition(
            'blockWidgetElement',
            '',
            'blockWidgetConfig',
            "",
            "",
            attr
        );
    }

    constructor(editor) {
        super(editor);

        // console.log(BlockWidgetEditing.plugin()+'#constructor()', {arguments});

        this._defineSchema(editor.model.schema);

        this._defineConverter(editor.conversion);

    }


    _defineSchema(schema) {
        schema.register(BlockWidgetEditing.modelName, {
            allowWhere: '$block',
            allowChildren : 'blockWidgetElement',
            isObject: true,
            allowAttributes: ALLOWED_ATTR
        });
        schema.register('blockWidgetElement', {
            allowWhere: ['$block'],
            allowContentOf: '$block',
            // allowChildren : ['content', 'block'],
            // inheritTypesFrom: '$block',
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            // isBlock: true,
            isLimit: true,
            isSelectable: true,
            // isContent: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            allowIn: [
                BlockWidgetEditing.modelName
            ]
        });
    }
    _defineConverter(conversion){
        let modelName = BlockWidgetEditing.modelName;
        let modelDefinition = BlockWidgetEditing.blockWidgetViewDefinition;
        _upcastElement(conversion, modelDefinition.modelName, modelDefinition);

        // _widgetEditingDowncast(conversion, modelName, true, debug)


        conversion.for('editingDowncast').elementToElement({
            model: modelName,
            view: (modelElement, {writer: viewWriter}) => {
                const viewName = modelElement.getAttribute(VIEW_NAME);
                let viewElement = viewWriter.createContainerElement(viewName, modelElement.getAttributes());
                // if(viewName === "a"){
                //     viewWriter.setAttribute('href', 'javascript:void(0)', viewElement);
                // }
                _setBlockName(viewWriter, viewElement, modelName);
                _enableBlockEditing(viewWriter, viewElement);
                _enableIdAttr(viewWriter, viewElement);
                _enableCustomAttribute(viewWriter, viewElement);
                viewWriter.removeAttribute(MODEL_DEFINITION, viewElement);
                viewWriter.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, viewElement);

                viewElement = _removeDuplicateSelectHandleElement(viewWriter, viewElement);
                return toWidget(viewElement, viewWriter, {hasSelectionHandle: true});
            },
            converterPriority : 'highest'
        });

        conversion.for('editingDowncast').add(dispatcher => {
            dispatcher.on(`attribute:${DATA_CHILD_COUNT}:${modelName}`, (evt, data, {writer : viewWriter, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);

                viewElement = _downcastViewChildCount(viewWriter, viewElement, data);
                evt.stop();

                // viewElement = toWidget(viewElement, viewWriter, {hasSelectionHandle: true});
                //
                // return _removeDuplicateSelectHandleElement(viewWriter, viewElement);

            });
        });

        _dataDowncast(conversion, modelName);

        _upcastElement(conversion, 'blockWidgetElement', BlockWidgetEditing.blockWidgetElementViewDefinition);
        conversion.for('editingDowncast').elementToElement({
            model: 'blockWidgetElement',
            view: (modelElement, {writer: viewWriter}) => {
                const viewName = modelElement.getAttribute(VIEW_NAME);
                let viewElement = viewWriter.createContainerElement(viewName, modelElement.getAttributes());
                // if(viewName === "a"){
                //     viewWriter.setAttribute('href', 'javascript:void(0)', viewElement);
                // }
                _setBlockName(viewWriter, viewElement, modelName);
                _enableBlockEditing(viewWriter, viewElement);
                _enableIdAttr(viewWriter, viewElement);
                _enableCustomAttribute(viewWriter, viewElement);
                viewWriter.removeAttribute(MODEL_DEFINITION, viewElement);
                viewWriter.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, viewElement);

                // viewElement = _removeDuplicateSelectHandleElement(viewWriter, viewElement);
                return toWidgetEditable(viewElement, viewWriter, {hasSelectionHandle: true});
            },
            converterPriority : 'highest'
        });

        conversion.for('editingDowncast').add(dispatcher => {
            dispatcher.on('attribute:' + DATA_CHILD_COUNT + ':' + 'blockWidgetElement', (evt, data, {writer : viewWriter, mapper}) => {
                let viewElement = mapper.toViewElement(data.item);

                viewElement = _downcastViewChildCount(viewWriter, viewElement, data);
                evt.stop();

                // viewElement = toWidget(viewElement, viewWriter, {hasSelectionHandle: true});
                //
                // return _removeDuplicateSelectHandleElement(viewWriter, viewElement);

            });
        });

        _dataDowncast(conversion, 'blockWidgetElement');
    }
}
