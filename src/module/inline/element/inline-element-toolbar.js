import {Plugin} from 'ckeditor5/src/core';
import {WidgetToolbarRepository} from 'ckeditor5/src/widget';
import InlineElementEditing from "./inline-element-editing"
import {TOOLBAR_SEPARATOR} from "../../../const";
import {BLOCK_STYLES} from "../../side-bar/style/style-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "../../side-bar/class/class-attributes-editing";
import {BLOCK_ATTRIBUTES} from "../../side-bar/attribute/attributes-editing";
import {HOVER_STATE} from "../../../ckeditor5-hover-attribute/hover-attribute";
import {findViewForWidgetToolbar} from "../../../engine/utils/position/widget-toolbar-utils";

export default class InlineElementToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [
            WidgetToolbarRepository,
            // IdAttrUi,
            // ClassAttrUi,
            // PrivateAttrUi,
            // InlinePrivateClassUi
        ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckInlineElementToolbar';
    }

    /**
     * @inheritDoc
     */
    afterInit() {

        const editor = this.editor;

        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

        this._registerInlineToolbar(widgetToolbarRepository, editor);
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'Link', 'a');
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'Button', 'button');
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'Label', 'label');
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'Input', 'input');
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'General', 'div');
        // this._registerInlineToolbar(widgetToolbarRepository, editor, 'General', 'span');

    }

    /**
     * Register the toolbar for the inline block
     * @param widgetToolbarRepository
     * @param {Object} editor
     // * @param {String} label
     // * @param {String} viewName
     * @private-attribute
     */
    _registerInlineToolbar(widgetToolbarRepository, editor) {
        const modelName = InlineElementEditing.modelName;
        let items = [
            // modelName + DELETE,
            // BLOCK_SELECT_PARENT,
            `${HOVER_STATE}_${modelName}`,
            TOOLBAR_SEPARATOR,
            modelName + BLOCK_STYLES,
            modelName + BLOCK_ATTRIBUTES,
            modelName + BLOCK_CLASS_ATTRIBUTES
        ];
        // const t = editor.t;
        widgetToolbarRepository.register(modelName, {
        // widgetToolbarRepository.register(modelName + viewName, {
            // ariaLabel: t(label),
            items: items,
            getRelatedElement: function (viewSelection) {
                // return findInlineBlockView(editor, viewSelection, viewName);
                return findViewForWidgetToolbar(editor, viewSelection, InlineElementEditing.modelName);
            }
        });
    }
}
