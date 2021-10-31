import {Plugin} from 'ckeditor5/src/core';
import {ButtonView} from 'ckeditor5/src/ui';
import ClassAttributesSideBar from "./class-attributes-side-bar";
import SelectClassIcon from "./theme/icon/select-class-icon.svg";
import {_getCommand} from "../../../engine/utils/commands";
import GeneralButtonCommand from "../_commands/general-button-command";

export const BLOCK_CLASS_ATTRIBUTES = 'ClassAttributes';
export default class ClassAttributesEditing extends Plugin {
    static get pluginName() {
        return 'SalesteckClassAttributesEditing';
    }

    init() {
        const editor = this.editor;
        this.sideBar = editor.plugins.get(ClassAttributesSideBar);

        ClassAttributesEditing._unSelectableComponent.forEach(unselectableModelName => {
            this._addComponentFactory(unselectableModelName);
        });
        const generalBtnCommand = _getCommand(editor, GeneralButtonCommand.commandName);

        const _this = this;
        editor.ui.componentFactory.add(BLOCK_CLASS_ATTRIBUTES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t('Helpers'),
                icon: SelectClassIcon,
                tooltip: true
            });

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show();
            });
            return buttonView;
        });
        _this.listenTo(generalBtnCommand, 'change:isEnabled', (evt, property, newVal) => {
            if (_this.sideBar) {
                if (newVal) {
                    _this.sideBar._clearDisableWidgetToolBar()
                } else {
                    _this.sideBar.hide();
                }
            }
        })

    }

    _addComponentFactory(modelName) {
        const _this = this;
        const editor = this.editor;

        editor.ui.componentFactory.add(modelName + BLOCK_CLASS_ATTRIBUTES, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t(modelName + ' helpers'),
                icon: SelectClassIcon,
                tooltip: true
            });

            _this.listenTo(buttonView, 'execute', () => {
                _this.sideBar.show(modelName);
            });
            return buttonView;
        });
    }

}
/**
 * this is used to add component as far as we implement plugin
 *
 * @type {Array}
 *
 * @private
 *
 * @example : ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat(['modal-header', 'modal-body', 'modal-footer']);
 */
ClassAttributesEditing._unSelectableComponent = [];
