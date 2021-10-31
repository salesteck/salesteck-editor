import {Plugin} from 'ckeditor5/src/core';
import {WidgetToolbarRepository} from 'ckeditor5/src/widget';
import BlockWidgetEditing from "./block-widget-editing";
import {TOOLBAR_SEPARATOR} from "../../const";
import {BLOCK_STYLES} from "../side-bar/style/style-editing";
import {BLOCK_ATTRIBUTES} from "../side-bar/attribute/attributes-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "../side-bar/class/class-attributes-editing";
import {HOVER_STATE} from "../../ckeditor5-hover-attribute/hover-attribute";
import BlockSelectParentCommand from "../../_block/block/block-operation/commands/block-select-parent-command";
import {findViewForWidgetToolbar} from "../../engine/utils/position/widget-toolbar-utils";

/**
 * @namespace Block-Widget.BlockWidgetToolbar
 */
/**
 * @module BlockWidget/BlockWidgetToolbar
 */

/**
 * @constructs BlockWidgetToolbar
 * @param {editor/MultiRootEditor} editor
 *
 * @property {editor/MultiRootEditor} editor
 */
export default class BlockWidgetToolbar extends Plugin {

    /**
     * @inheritDoc
     */
    static get requires() {
        return [
            WidgetToolbarRepository
        ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlockWidgetToolbar';
    }

    /**
     * @inheritDoc
     */
    afterInit() {

        const editor = this.editor;

        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

        this._registerInlineToolbar(widgetToolbarRepository, editor);

    }

    /**
     * Register the toolbar for the block widget
     * @param {widget/WidgetToolbarRepository} widgetToolbarRepository
     * @param {editor/MultiRootEditor} editor
     * @private-attribute
     */
    _registerInlineToolbar(widgetToolbarRepository, editor) {
        const modelName = BlockWidgetEditing.modelName;
        let items = [
            BlockSelectParentCommand.commandName,
            `${HOVER_STATE}_`,
            TOOLBAR_SEPARATOR,
            BLOCK_STYLES,
            BLOCK_ATTRIBUTES,
            BLOCK_CLASS_ATTRIBUTES
        ];
        const t = editor.t;
        widgetToolbarRepository.register(modelName, {
            ariaLabel: t(modelName),
            items: items,
            getRelatedElement: function (viewSelection) {
                return findViewForWidgetToolbar(editor, viewSelection, BlockWidgetEditing.modelName);
            }
        });
    }
}
