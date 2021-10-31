
import { Plugin } from 'ckeditor5/src/core';
import elementsIcon from "./theme/icon/elements.svg";
import { ButtonView } from 'ckeditor5/src/ui';
import ElementsSideBar from "./elements-side-bar";
import {_getCommand} from "../../../engine/utils/commands";
import GeneralButtonCommand from "../_commands/general-button-command";
import {_isStrNotEmpty} from "../../../general";
export const BLOCK_ELEMENTS = "Elements";
export default  class ElementsEditing extends Plugin {

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckElementsEditing';
    }

    init() {
        const editor = this.editor;
        const _this = this;
        this.sideBar = editor.plugins.get(ElementsSideBar);
        if(_isStrNotEmpty(editor.config.get('componentUrl'))){

            const generalBtnCommand = _getCommand(editor, GeneralButtonCommand.commandName);
            editor.ui.componentFactory.add( BLOCK_ELEMENTS, locale => {
                const buttonView = new ButtonView(locale);

                buttonView.set({
                    icon: elementsIcon,
                    label: editor.t('Plugins'),
                    tooltip: true,
                    tooltipPosition : 'sw'
                });

                if(generalBtnCommand){
                    buttonView.bind('isEnabled').to(generalBtnCommand, 'isEnabled');
                }
                _this.listenTo(buttonView, 'execute', () => {
                    _this.sideBar.toggle();
                });
                return buttonView;
            });
            _this.listenTo(generalBtnCommand, 'change:isEnabled', (evt, property, newVal) =>{
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
}
