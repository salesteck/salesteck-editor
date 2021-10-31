
import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import AttributesSideBar from "./attributes-side-bar";
import AttributesIcon from "./theme/icon/attributes-icon.svg";
// import BlocksEditing from "../../_block/block/blocks-editing";
// import InlineElementEditing from "../../$inline/element/inline-element-editing";
import {_getCommand} from "../../../engine/utils/commands";
import GeneralButtonCommand from "../_commands/general-button-command";
export const BLOCK_ATTRIBUTES = 'Attributes';
export default class AttributesEditing extends Plugin{
    static get pluginName() {
        return 'SalesteckAttributesEditing';
    }

    init(){
        const editor = this.editor;
        this.sideBar = editor.plugins.get(AttributesSideBar);
        AttributesEditing._unSelectableComponent.forEach( unselectableModelName =>{
            this._addComponentFactory(unselectableModelName);
        });
        // this._addComponentFactory(BlocksEditing.contentModelName);
        // this._addComponentFactory(InlineElementEditing.modelName);


        const _this = this;
        const generalBtnCommand = _getCommand(editor, GeneralButtonCommand.commandName);
        editor.ui.componentFactory.add( BLOCK_ATTRIBUTES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t('Attributes'),
                icon: AttributesIcon,
                tooltip: true
            });
            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show();
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
    _addComponentFactory(modelName){
        const _this = this;
        const editor = _this.editor;

        editor.ui.componentFactory.add(modelName + BLOCK_ATTRIBUTES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t(modelName + ' attributes'),
                icon: AttributesIcon,
                tooltip: true
            });

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show(modelName);
            });
            return buttonView;
        });
    }

}
AttributesEditing._unSelectableComponent = [];
