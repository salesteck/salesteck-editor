import {Plugin} from 'ckeditor5/src/core';
import TreeIcon from "./theme/icon/hierarchical-structure2.svg";
import {ButtonView} from 'ckeditor5/src/ui';
import TreeSideBar from "./tree-side-bar";
import GeneralButtonCommand from "../_commands/general-button-command";
import {_getCommand} from "../../../engine/utils/commands";

export const BLOCK_TREE = "Tree";
export default class TreeEditing extends Plugin {

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'TreeEditing';
    }

    init() {
        const editor = this.editor;
        const _this = this;
        _this.sideBar = editor.plugins.get(TreeSideBar);
        const generalBtnCommand = _getCommand(editor, GeneralButtonCommand.commandName);
        editor.ui.componentFactory.add(BLOCK_TREE, locale => {

            const buttonView = new ButtonView(locale);
            buttonView.set({
                label: editor.t('Architecture'),
                icon: TreeIcon,
                tooltip: true
            });
            if(generalBtnCommand){
                buttonView.bind('isEnabled').to(generalBtnCommand, 'isEnabled');
            }

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.toggleVisibility();
            });
            return buttonView;
        });
        _this.listenTo(generalBtnCommand, 'change:isEnabled', (evt, property, newVal, oldVal) =>{
            if(_this.sideBar){
                if(newVal){
                    _this.sideBar._clearDisableWidgetToolBar()
                }else {
                    _this.sideBar.hide();
                }
            }
        })
    }
}
