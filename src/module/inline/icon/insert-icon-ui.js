
import {ButtonView} from 'ckeditor5/src/ui';
import CustomUi from "../../../core/plugin/custom-ui";
import {SALESTECK_ICONS} from "../../../const";
import {_isStrNotEmpty} from "../../../general";
import IconInsertAjaxCommand from "./icon-insert-ajax-command";
import {_addCommand} from "../../../engine/utils/commands";

export default class InsertIconUi extends CustomUi {

    static pluginName() {
        return 'SalesteckInsertInlineElementUi';
    }

    _startPlugin(editor) {
        const inlineElementTemplateUrl = editor.config.get('iconConfig.templateUrl');
        if (_isStrNotEmpty(inlineElementTemplateUrl) && _isStrNotEmpty(editor.config.get('componentUrl'))) {
            const commandName = 'insertIcon';
            const command = _addCommand(editor, commandName, new IconInsertAjaxCommand( editor ));
            editor.ui.componentFactory.add(commandName, locale => {
                // The state of the button will be bound to the widget command.

                // The button will be an instance of BsButtonView.
                const buttonView = new ButtonView(locale);

                buttonView.set({
                    // The t() function helps localize the editor. All strings enclosed in t() can be
                    // translated and change when the language of the editor changes.
                    icon: SALESTECK_ICONS.icons,
                    label: editor.t('icons'),
                    withText: false,
                    tooltip: true
                });

                // Bind the state of the button to the command.
                buttonView.bind('isEnabled').to(command, 'isEnabled');

                // Execute the command when the button is clicked (executed).
                this.listenTo(buttonView, 'execute', () => editor.execute(commandName, {
                    url: inlineElementTemplateUrl,
                    selector: "i"
                }));

                return buttonView;
            });
        }
    }

}
