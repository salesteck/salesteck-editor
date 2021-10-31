import { Plugin } from 'ckeditor5/src/core';
import Tree from "./tree/tree";
import Style from "./style/style";
import ClassAttributes from "./class/class-attributes";
import Attributes from "./attribute/attributes";
import './theme/style.css';
import {_addCommand} from "../../engine/utils/commands";
import EditClassCommand from "./attribute/command/edit-class-command";
import EditIdCommand from "./attribute/command/edit-id-command";
import SelectClassCommand from "./class/command/select-class-command";
import StyleCommand from "./style/command/style-command";
import EditDataAttributeCommand from "./attribute/command/edit-data-attribute-command";
import Elements from "./element/elements";
import GeneralButtonCommand from "./_commands/general-button-command";
import {_isStrNotEmpty} from "../../general";
import {WidgetToolbarRepository} from "ckeditor5/src/widget";
export default class SideBar extends Plugin{

    static get requires() {
        return [
            WidgetToolbarRepository,
            Elements,
            Tree,
            Style,
            ClassAttributes,
            Attributes
        ];
    }
    static get pluginName() {
        return 'SalesteckSideBar';
    }
    constructor(editor) {
        super(editor);

        _addCommand(editor, GeneralButtonCommand.commandName, new GeneralButtonCommand(editor));
        _addCommand(editor, StyleCommand.commandName, new StyleCommand(editor));
        _addCommand(editor, EditClassCommand.commandName, new EditClassCommand(editor));
        _addCommand(editor, EditIdCommand.commandName, new EditIdCommand(editor));
        _addCommand(editor, SelectClassCommand.commandName, new SelectClassCommand(editor));
        _addCommand(editor, EditDataAttributeCommand.commandName, new EditDataAttributeCommand(editor));
    }

    static _forceDisableWidgetToolBar(editor, disableId){
        // console.log(`${disableId}:_forceDisableWidgetToolBar`)
        // console.trace();
        if (editor.plugins.has(WidgetToolbarRepository) && _isStrNotEmpty(disableId)) {
            editor.editing.view.document.isFocused = false;
            editor.plugins.get(WidgetToolbarRepository).forceDisabled(disableId);

        }
    }
    static _clearDisableWidgetToolBar(editor, disableId){
        // console.log(`${disableId}:_clearDisableWidgetToolBar`)
        if (editor.plugins.has(WidgetToolbarRepository) && _isStrNotEmpty(disableId)) {
            editor.plugins.get(WidgetToolbarRepository).clearForceDisabled(disableId);
        }
    }
}
export function _appendSideBar(id){
    let container = document.querySelector(`#${id}`);
    if (!container) {
        container = document.createElement('div');
        container.setAttribute("id", id);
        document.body.prepend(container);
    }
    container.classList.add('ct-side-bar');
    return container;
}
