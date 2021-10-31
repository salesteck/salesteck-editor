import {Plugin} from 'ckeditor5/src/core';
import {ButtonView} from 'ckeditor5/src/ui';
import saveIcon from '../../theme/icon/save.svg';
import SaveCommand from "./save-command";
import "./theme/style.css";
import {_getCommand} from "../../engine/utils/commands";

export default class SaveUi extends Plugin{
    static pluginName(){
        return 'SalesteckSaveUi';
    }

    constructor(editor) {
        super(editor);
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const saveCommandName = 'saveData';
        const saveData= editor.config.get(saveCommandName) || null;
        if(saveData){
            editor.commands.add(saveCommandName, new SaveCommand(editor, saveData.save));
            editor.ui.componentFactory.add(SaveCommand.commandName, locale => {
                // The button will be an instance of BsButtonView.
                const buttonView = new ButtonView( locale );

                buttonView.set( {
                    // The t() function helps localize the editor. All strings enclosed in t() can be
                    // translated and change when the language of the editor changes.
                    icon : saveIcon,
                    label: editor.t('save'),
                    withText: false,
                    tooltip: true,
                    isEnabled : true
                } );
                const generalBtnCommand = _getCommand(editor, SaveCommand.commandName);
                if(generalBtnCommand){
                    buttonView.bind('isEnabled').to(generalBtnCommand, 'isEnabled');
                }

                //
                // // Execute the command when the button is clicked (executed).
                this.listenTo( buttonView, 'execute', () => editor.execute( saveCommandName) );

                return buttonView;
            });

        }

    }


}
