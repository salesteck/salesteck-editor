import {Plugin} from 'ckeditor5/src/core';
import { ButtonView, DropdownButtonView, Model, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import {
    _isFunction,
    _isMagnificPopupValid,
    _isStr,
    _isStrNotEmpty
} from "../../general";
import PreviewCommand from "./preview-command";
import previewIcon from '../../theme/icon/preview/preview.svg';
import phoneIcon from '../../theme/icon/preview/phone.svg';
import tabletIcon from '../../theme/icon/preview/tablet.svg';
import laptopIcon from '../../theme/icon/preview/laptop.svg';
import desktopIcon from '../../theme/icon/preview/desktop.svg';
import desktopIconXl from '../../theme/icon/preview/desktop-extra-large.svg';


import './theme/style.css';

import $ from 'jquery';
import 'magnific-popup';
import {_getCommand} from "../../engine/utils/commands";


export default class PreviewUi extends Plugin {
    static pluginName() {
        return 'SalesteckPreviewUi';
    }

    constructor(editor) {
        super(editor);
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const previewCommandName = 'previewData';
        const previewConfig = editor.config.get(previewCommandName) || null;
        if(previewConfig){
            const preview = previewConfig.preview || null;
            if(preview){
                let extraData = previewConfig.data || null;
                editor.commands.add(previewCommandName, new PreviewCommand(editor, extraData));

                if(_isFunction(preview)) {
                    this._addSingleButtonCommand(previewCommandName, preview);
                }else {
                    if(_isMagnificPopupValid()){
                        if(_isStr(preview)){
                            let arrayScreen = [];
                            arrayScreen.push(_getScreenDefinition('phone','phone', phoneIcon, preview));
                            arrayScreen.push(_getScreenDefinition('tablet', 'tablet', tabletIcon, preview));
                            arrayScreen.push(_getScreenDefinition('laptop', 'laptop', laptopIcon, preview));
                            arrayScreen.push(_getScreenDefinition('desktop', 'desktop', desktopIcon, preview));
                            arrayScreen.push(_getScreenDefinition('desktopXl', 'desktop large', desktopIconXl, preview));

                            this._addMultiButtonCommand( previewCommandName, arrayScreen, extraData);
                        }
                    }
                }

            }


        }


    }

    _addSingleButtonCommand(previewCommandName, preview){
        const editor = this.editor;
        editor.ui.componentFactory.add(previewCommandName, locale => {
            // The button will be an instance of BsButtonView.
            const buttonView = new ButtonView(locale);

            buttonView.set({
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                icon: previewIcon,
                label: editor.t('Preview'),
                withText: false,
                tooltip: true,
                isEnabled: true
            });

            const previewCommand = _getCommand(editor, previewCommandName);
            if(previewCommand){
                buttonView.bind('isEnabled').to(previewCommand, 'isEnabled');
            }
            //
            // // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => editor.execute(previewCommandName, {preview}));

            return buttonView;
        });

    }

    _addMultiButtonCommand(previewCommandName, arrayScreen){
        const editor = this.editor;
        editor.ui.componentFactory.add( previewCommandName, locale =>{
            const dropdownView = createDropdown( locale, DropdownButtonView );
            const dropdownButton = dropdownView.buttonView;

            dropdownButton.set( {
                icon: previewIcon,
                label: editor.t('Preview'),
                withText: false,
                tooltip: true,
            } );
            addListToDropdown( dropdownView, this._getDropdownListItemDefinitions( arrayScreen ) );

            const previewCommand = _getCommand(editor, previewCommandName);
            if(previewCommand){
                dropdownView.bind('isEnabled').to(previewCommand, 'isEnabled');
            }
            this.listenTo( dropdownView, 'execute', evt => {
                editor.execute( previewCommandName, evt.source.commandValue );
                editor.editing.view.focus();
            } );

            return dropdownView;
        } );

    }
    _getDropdownListItemDefinitions( arrayScreen){
        const itemDefinitions = new Collection();

        arrayScreen.forEach( screen => {
            const definition = {
                type: 'button',
                model: new Model( {
                    commandValue: {
                        preview : screen.url,
                        screenType : screen.name
                    },
                    label: this.editor.t(screen.label),
                    withText: true,
                    icon: screen.icon,
                } )
            };

            itemDefinitions.add( definition );
        } );
        return itemDefinitions;
    }


}

function _getScreenDefinition(name, label, icon, url) {
    return { name, label, icon, url };
}

export function _openMagnificPopupIframe(url, _class){
    _class = _isStr(_class) ? _class : "";

    if(_isMagnificPopupValid() && _isStrNotEmpty(url)){
        $.magnificPopup.open({
            iframe : {
                markup: '<div class="mfp-iframe-scaler ck-editor-iframe">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe ck-preview-iframe '+_class+' mfp-ck-editor" allowfullscreen></iframe>'+
                    '</div>'
            },
            items: {
                src: url
            },
            type: 'iframe',
            mainClass : 'ck-editor-lightbox'
        });

    }

}
