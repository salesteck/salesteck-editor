import {Plugin} from 'ckeditor5/src/core';
import {WidgetToolbarRepository} from "ckeditor5/src/widget";
import {BLOCK_STYLES} from "../side-bar/style/style-editing";
import {BLOCK_ATTRIBUTES} from "../side-bar/attribute/attributes-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "../side-bar/class/class-attributes-editing";
import {findViewForWidgetToolbar} from "../../engine/utils/position/widget-toolbar-utils";
import ShapedDividerEditing from "./shaped-divider-editing";
export default class ShapedDividerToolbar extends Plugin{
    static get pluginName() {
        return 'ShapedDividerToolbar';
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return [
            WidgetToolbarRepository
        ];
    }
    constructor(editor) {
        super(editor);
    }
    afterInit(){

        const editor = this.editor;

        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
        this._registerToolbar(widgetToolbarRepository, editor, ShapedDividerEditing.modelName, 'shape divider')

    }
    _registerToolbar(widgetToolbarRepository, editor, modelName, label) {
        let items = [
            `${BLOCK_STYLES}`,
            `${BLOCK_ATTRIBUTES}`,
            `${BLOCK_CLASS_ATTRIBUTES}`
        ];
        const t = editor.t;
        widgetToolbarRepository.register(modelName, {
            ariaLabel: t(label),
            items: items,
            getRelatedElement: function (viewSelection) {
                return findViewForWidgetToolbar(editor, viewSelection, modelName);
            }
        });
    }
}
