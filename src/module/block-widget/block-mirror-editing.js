import {Plugin} from 'ckeditor5/src/core';
import BlocksEditing, {ALLOWED_ATTR} from "../../_block/block/blocks-editing";
import ModelDefinition from "../../_block/block/model-definition";
import {DATA_BLOCK_TYPE} from "../../const";
import BlockWidgetEditing from "./block-widget-editing";
import {_upcastElement} from "../../engine/utils/converter/upcast";
import {_dataDowncast} from "../../engine/utils/converter/data-downcast";
import {_widgetEditingDowncast} from "../../engine/utils/converter/editing-downcast";

/**
 * @namespace Block-Widget.BlockMirrorEditing
 */
/**
 * @module BlockWidget/BlockMirrorEditing
 */

export default class BlockMirrorEditing extends Plugin {
    static plugin(){
        return 'BlockMirrorEditing';
    }

    static get modelName (){
        return 'blockMirror';
    }

    static get blockWidgetViewDefinition() {
        const attr = {};
        attr[DATA_BLOCK_TYPE] = "block-mirror";
        return new ModelDefinition(
            BlockMirrorEditing.modelName,
            '',
            'blockMirrorConfig',
            "",
            "",
            attr
        );
    }

    constructor(editor) {
        super(editor);

        // console.log(BlockMirrorEditing.plugin()+'#constructor()', {arguments});

        this._defineSchema(editor.model.schema);


        this._defineConverter(editor.conversion);

    }
    _defineConverter(conversion){
        let modelName = BlockMirrorEditing.modelName;
        // let modelDefinition = BlockMirrorEditing.blockWidgetViewDefinition;
        let attr = {};
        attr[DATA_BLOCK_TYPE] = "block-mirror";
        let modelDefinition=  new ModelDefinition(
            BlockMirrorEditing.modelName,
            '',
            'blockMirrorConfig',
            "",
            "",
            attr
        );
        _upcastElement(conversion, BlockMirrorEditing.modelName, modelDefinition);


        _widgetEditingDowncast(conversion, modelName, true);

        _dataDowncast(conversion, modelName);
    }


    _defineSchema(schema) {
        schema.register(BlockMirrorEditing.modelName, {
            // inheritAllFrom : 'paragraph',
            allowWhere: ['$block'],
            // allowContentOf: '$block',
            inheritTypesFrom: '$block',
            // // Behaves like a self-contained object (e.g. an image).
            // isObject: true,
            // isBlock: true,
            // isLimit: true,
            // isSelectable: true,
            // isContent: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            allowIn: [
                "$root",
                BlockMirrorEditing.modelName,
                BlocksEditing.contentModelName,
                BlocksEditing.columnPluginName,
                BlockWidgetEditing.modelName
            ]
        });
    }
}
