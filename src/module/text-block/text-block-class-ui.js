import {Plugin} from 'ckeditor5/src/core';
import {ButtonView} from "ckeditor5/src/ui";
import SelectClassIcon from "../side-bar/class/theme/icon/select-class-icon.svg";
import {BLOCK_CLASS_ATTRIBUTES} from "../side-bar/class/class-attributes-editing";
import ClassAttributesSideBar from "../side-bar/class/class-attributes-side-bar";
import {_addCommand} from "../../engine/utils/commands";
import TextBlockCommand from "./text-block-command";
export default class TextBlockClassUi extends Plugin{
    static get pluginName(){
        return 'TextBlockClassUi';
    }
    constructor(editor) {
        super(editor);
    }
    init(){
        this.sideBar = this.editor.plugins.get(ClassAttributesSideBar);

        this._addComponentFactory();
    }

    _addComponentFactory(){
        const _this = this;
        const editor = this.editor;
        const textBlockCommand = _addCommand(editor, TextBlockCommand.commandName, new TextBlockCommand(editor));
        editor.ui.componentFactory.add('text-block' + BLOCK_CLASS_ATTRIBUTES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t('text-block' + ' helpers'),
                icon: SelectClassIcon,
                tooltip: true
            });

            buttonView.bind('isEnabled').to(textBlockCommand, 'isEnabled');

            _this.listenTo(buttonView, 'execute', () => {
                const selection = editor.model.document.selection;
                const firstPosition = selection.getFirstPosition();
                // console.log('selection', {selection, firstPosition});
                _this.sideBar.show(firstPosition.parent.name);
            });
            return buttonView;
        });
    }

}
