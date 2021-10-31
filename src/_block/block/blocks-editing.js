import {Plugin} from 'ckeditor5/src/core';
import "./theme/style.css";

import BlockMoveCommand, {MOVE_COMMAND} from "./block-operation/commands/block-move-command";
import BlockSelectParentCommand from "./block-operation/commands/block-select-parent-command";
import BlockCloneCommand from "./block-operation/commands/block-clone-command";
import BlockDeleteCommand from "./block-operation/commands/block-delete-command";
import {
    DATA_BLOCK_TYPE,
    VIEW_ATTR,
    MODEL_DEFINITION,
    VIEW_NAME,
    VIEW_STYLE,
    VIEW_CLASS, DATA_CHILD_COUNT, DATA_BLOCK_NAME, SALESTECK_ICONS, DATA_CLASS_SELECTOR, DATA_ORIGINAL_STYLE
} from "../../const";

import { _upcastElement } from "../../engine/utils/converter/upcast";
import { _widgetEditableEditingDowncast, _widgetEditingDowncast } from "../../engine/utils/converter/editing-downcast";
import {_dataDowncast} from "../../engine/utils/converter/data-downcast";
import HtmlBlock from "../../$html-block/$html-block";
import {ACTIVE_STATE, HOVER_STATE} from "../../ckeditor5-hover-attribute/hover-attribute";
import StyleEditing from "../../module/side-bar/style/style-editing";
import ClassAttributesEditing from "../../module/side-bar/class/class-attributes-editing";
import AttributesEditing from "../../module/side-bar/attribute/attributes-editing";
import {isWidget} from "ckeditor5/src/widget";


export const ALLOWED_ATTR = [
    DATA_BLOCK_TYPE, VIEW_ATTR, VIEW_CLASS,
    VIEW_NAME, MODEL_DEFINITION,
    DATA_CLASS_SELECTOR,
    VIEW_STYLE, DATA_CHILD_COUNT, DATA_BLOCK_NAME,
    HOVER_STATE, ACTIVE_STATE, DATA_ORIGINAL_STYLE
];
/**
 * @module column/ColumnEditing
 */
export default class BlocksEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlocksEditing';
    }

    static get generalConfigSelector() {
        return 'blockConfig';
    }

    static get templateUrl() {
        return 'templateUrl';
    }


    static modelElementsName() {
        return [
            BlocksEditing.contentModelName, BlocksEditing.blockPluginName,
            BlocksEditing.columnPluginName, BlocksEditing.rowModelName,
            BlocksEditing.containerPluginName, BlocksEditing.sectionPluginName
        ];
    }

    static _isModelNameBlock(modelElementName) {
        return BlocksEditing.modelElementsName().includes(modelElementName);
    }

    static get blockPluginName() {
        return "block";
    }

    static get blockConfigSelector() {
        return 'divBlockConfig';
    }


    static get contentConfigSelector() {
        return 'contentConfig';
    }

    static get contentModelName() {
        return "content";
    }



    static get configSelector() {
        return 'columnConfig';
    }

    static get columnPluginName() {
        return "column";
    }




    static get rowConfigSelector() {
        return 'rowConfig';
    }

    static get rowModelName() {
        return "row";
    }



    static get containerConfigSelector() {
        return 'container';
    }

    static get containerPluginName() {
        return "container";
    }


    static get sectionConfigSelector() {
        return 'sectionConfig';
    }

    static get sectionPluginName() {
        return "section";
    }



    static get requires() {
        return [];
    }

    constructor(editor) {
        super(editor);
        // console.log(BlocksEditing.pluginName+'#constructor()', {arguments});
        this._defineSchema();
        this._defineConverters();
        this.listenTo(editor.model, 'deleteContent', (evt, args)=>{
            const deletedElement = args[0].getSelectedElement();
            if(deletedElement){
                const deletedElementParent = deletedElement.parent;
                editor.model.change( writer=>{

                    if(deletedElementParent.name === '$root' ){
                        if(!deletedElement.nextSibling && !deletedElement.previousSibling){
                            const block = writer.createElement('block', {
                                'data-block-type' : 'block',
                                'view-name' : 'div'
                            });
                            editor.model.insertContent(block, writer.createPositionAfter(deletedElement));
                        }
                    }else {
                        const deletedElementParentView = editor.editing.mapper.toViewElement(deletedElementParent);
                        if(deletedElementParentView && isWidget(deletedElementParentView)){
                            writer.setSelection(deletedElementParent, 'on');
                        }
                        // console.log(`${evt.name}`, {evt, args, deletedElement, deletedElementParentView, deletedElementParent});

                    }

                })

            }

        }, {priority: 'highest'});
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        // console.log(BlocksEditing.pluginName+'#_defineSchema()');
        this._defineContentSchema(schema);



        this._defineBlockSchema(
            schema,
            BlocksEditing.blockPluginName,
            [
                "$root",
                BlocksEditing.sectionPluginName,
                BlocksEditing.containerPluginName,
                BlocksEditing.rowModelName,
                BlocksEditing.columnPluginName,
                BlocksEditing.blockPluginName,
                BlocksEditing.contentModelName
            ]
        );


        this._registerBlockSchema(
            schema,
            BlocksEditing.columnPluginName,
            [BlocksEditing.rowModelName, BlocksEditing.blockPluginName, ]
        );

        this._registerBlockSchema(
            schema,
            BlocksEditing.rowModelName,
            [BlocksEditing.blockPluginName, BlocksEditing.containerPluginName, BlocksEditing.columnPluginName]
        );

        this._registerBlockSchema(
            schema,
            BlocksEditing.containerPluginName,
            [BlocksEditing.blockPluginName, BlocksEditing.sectionPluginName]
        );

        this._registerBlockSchema(
            schema,
            BlocksEditing.sectionPluginName,
            ["$root", BlocksEditing.blockPluginName]
        );

    }

    _defineContentSchema(schema) {

        schema.register(BlocksEditing.contentModelName, {
            // isObject: false,
            // isLimit: true,
            isSelectable: true,
            // isContent: false,
            allowAttributes: ALLOWED_ATTR,
            allowIn: [
                BlocksEditing.columnPluginName, BlocksEditing.blockPluginName,
                // BlockMirrorEditing.modelName
            ]
        });

        // Allow all $block content inside a table cell.
        schema.extend('$block', {allowIn: [BlocksEditing.contentModelName]});

    }

    _defineBlockSchema(schema, modelName, allowIn = []) {
        schema.register(modelName, {
            // Behaves like a self-contained object (e.g. an image).
            allowWhere: '$block',
            isObject: true,
            // isBlock: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            allowIn: allowIn
        });

    }

    _registerBlockSchema(schema, modelName, allowIn = []){
        schema.register(modelName, {
            // Behaves like a self-contained object (e.g. an image).
            allowWhere: '$root',
            // isBlock: false,
            // isContent: false,
            // isObject: true,
            // isLimit: true,
            // isSelectable: true,
            isBlock: false,
            isContent: false,
            isObject: true,
            isLimit: true,
            isSelectable: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            allowIn: allowIn
        });
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;
        this._defineContentConverter(conversion);

        // _convertBlock(conversion, BlocksEditing.blockDefinition);

        _convertBlock(conversion, {
            modelName : 'block',
            name : 'div',
            // classes : 'block',
            attributes : {
                'data-block-type' : 'block'
            }
        }, true);

        _convertBlock(conversion, {
            modelName : 'column',
            name : 'div',
            classes : 'col',
            attributes : {
                'data-block-type' : 'column'
            }
        });


        _convertBlock(conversion, {
            modelName : 'row',
            name : 'div',
            classes : 'row',
            attributes : {
                'data-block-type' : 'row'
            }
        });

        _convertBlock(conversion, {
            modelName : 'container',
            name : 'div',
            attributes : {
                'data-block-type' : 'container'
            }
        });

        _convertBlock(conversion, {
            modelName : 'section',
            name : 'section',
            attributes : {
                'data-block-type' : 'section'
            }
        });
    }

    _defineContentConverter(conversion) {
        const modelName = BlocksEditing.contentModelName;
        _upcastElement(conversion, modelName, {
            name : 'div',
            attributes : {
                'data-block-type' : 'content'
            }
        });

        _widgetEditableEditingDowncast(conversion, modelName, true);
        // _editableElementEditingDowncast(conversion, modelName);

        _dataDowncast(conversion, modelName);
    }


    init() {
        this._initBlockCommand();
    }

    _initBlockCommand() {
        const editor = this.editor;
        editor.commands.add(BlockCloneCommand.commandName, new BlockCloneCommand(editor));
        editor.commands.add(BlockDeleteCommand.commandName, new BlockDeleteCommand(editor));
        editor.commands.add(BlockSelectParentCommand.commandName, new BlockSelectParentCommand(editor));

        const contentColumnModelName = BlocksEditing.contentModelName;

        editor.commands.add(contentColumnModelName + BlockCloneCommand.commandName, new BlockCloneCommand(editor, contentColumnModelName));
        editor.commands.add(contentColumnModelName + BlockDeleteCommand.commandName, new BlockDeleteCommand(editor, contentColumnModelName));
        editor.commands.add(contentColumnModelName + BlockSelectParentCommand.commandName, new BlockSelectParentCommand(editor, contentColumnModelName));
        BLOCKS.forEach((element) => {
            const modelName = element.plugin;
            if (element.move) {
                Object.entries(MOVE_COMMAND).forEach(([position, commandName]) => {
                    editor.commands.add(
                        modelName + commandName,
                        new BlockMoveCommand(editor, {position: position}, modelName)
                    );
                });
            }
        });
    }
}

export function _convertBlock(conversion, blockDefinition, withTypeAroundBtn = false) {
    _upcastElement(conversion, blockDefinition.modelName, blockDefinition);
    _widgetEditingDowncast(conversion, blockDefinition.modelName, true, withTypeAroundBtn);
    _dataDowncast(conversion, blockDefinition.modelName);
}

export const SECTION_ELEMENT = {
    name: 'Section',
    viewName : 'section',
    plugin: BlocksEditing.sectionPluginName,
    icon: SALESTECK_ICONS.section,
    selector: 'section',
    configSelector: BlocksEditing.sectionConfigSelector,
    insert: true,
    move: true,
    ajax: true
};

export const CONTAINER_ELEMENT = {
    name: 'Container',
    viewName : 'div',
    plugin: BlocksEditing.containerPluginName,
    icon: SALESTECK_ICONS.container,
    selector: 'div[data-block-type=container]',
    configSelector: BlocksEditing.containerConfigSelector,
    insert: true,
    move: true,
    ajax: true
};

export const ROW_ELEMENT = {
    name: 'Row',
    viewName : 'div',
    plugin: BlocksEditing.rowModelName,
    icon: SALESTECK_ICONS.row,
    selector: 'div.row',
    configSelector: BlocksEditing.rowConfigSelector,
    insert: true,
    move: true,
    ajax: true
};

export const COLUMN_ELEMENT = {
    name: 'Column',
    viewName : 'div',
    plugin: BlocksEditing.columnPluginName,
    icon: SALESTECK_ICONS.column,
    selector: 'div.col',
    configSelector: BlocksEditing.configSelector,
    insert: true,
    move: true,
    ajax: true
};

export const DIV_BLOCK_ELEMENT = {
    name: 'Block',
    viewName : 'div',
    plugin: BlocksEditing.blockPluginName,
    icon: SALESTECK_ICONS.block,
    selector: 'div.block',
    configSelector: BlocksEditing.blockConfigSelector,
    insert: true,
    move: true,
    ajax: true
};


export const CONTENT_ELEMENT = {
    name: 'Content',
    viewName : 'div',
    plugin: BlocksEditing.contentModelName,
    icon: SALESTECK_ICONS.content,
    selector: 'div.content',
    configSelector: BlocksEditing.contentConfigSelector,
    insert: true,
    move: true,
    ajax: true
};

export const BLOCK_ELEMENT = [
    SECTION_ELEMENT,
    CONTAINER_ELEMENT,
    ROW_ELEMENT,
    DIV_BLOCK_ELEMENT,
    CONTENT_ELEMENT
];

export const BLOCKS = [
    SECTION_ELEMENT,
    CONTAINER_ELEMENT,
    ROW_ELEMENT,
    COLUMN_ELEMENT,
    DIV_BLOCK_ELEMENT,
    CONTENT_ELEMENT
];
StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat([BlocksEditing.contentModelName]);
ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat([BlocksEditing.contentModelName]);
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat([BlocksEditing.contentModelName]);
