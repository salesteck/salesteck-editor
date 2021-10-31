/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ckfinder/ckfinderediting
 */

import { Plugin } from 'ckeditor5/src/core';
import { Notification, ButtonView } from 'ckeditor5/src/ui';

import CKFinderCommand from "./commands/ckfinder-command";
import imageIcon from './theme/icon/image-replace.svg';
import ImageInsertPanelView from "@ckeditor/ckeditor5-image/src/imageinsert/ui/imageinsertpanelview";
import {prepareIntegrations} from "@ckeditor/ckeditor5-image/src/imageinsert/utils";


// import {isImage} from "@ckeditor/ckeditor5-image/src/image/utils";
import CkfinderImageReplaceCommand from "./commands/ckfinder-image-replace-command";
// import ImageEditing from "../images/image/imageediting";


/**
 * The CKFinder editing feature. It introduces the {@link @ckEditor5/ckfinder/ckfindercommand~CKFinderCommand CKFinder command}.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
const EDIT_COMMAND_NAME = 'imageEdit';
export default class CKFinderEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckCKFinderEditing';
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [ Notification, 'ImageEditing' ];
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;

        const ckFinderComponentFactoryName = 'ckFinder';
        const ckFinderInsertImageCommandName = 'ckfinderInsertImage';

        editor.commands.add( ckFinderInsertImageCommandName, new CKFinderCommand( editor ) );

        const t = editor.t;
        componentFactory.add( 'imageInsert', locale =>{
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( ckFinderInsertImageCommandName);

            // The button will be an instance of BsButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                icon : imageIcon,
                label: t('Insert image'),
                withText: false,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( ckFinderInsertImageCommandName) );

            return buttonView;
        });


        componentFactory.add( ckFinderComponentFactoryName, locale => {
            const editor = this.editor;
            const imageInsertView = new ImageInsertPanelView( locale, prepareIntegrations( editor ) );
            const command = editor.commands.get( ckFinderInsertImageCommandName );

            const dropdownView = imageInsertView.dropdownView;
            const splitButtonView = dropdownView.buttonView;

            splitButtonView.actionView = editor.ui.componentFactory.create( 'imageInsert' );
            // After we replaced action button with `uploadImage` component,
            // we have lost a proper styling and some minor visual quirks have appeared.
            // Brining back original split button classes helps fix the button styling
            // See https://github.com/ckeditor/ckeditor5/issues/7986.
            splitButtonView.actionView.extendTemplate( {
                attributes: {
                    class: 'ck ck-button ck-splitbutton__action'
                }
            } );

            return this._setUpDropdown( dropdownView, imageInsertView, command );
        } );





        const ckFinderReplaceImageCommandName = 'ckfinderImageReplaceCommand';



        editor.commands.add( ckFinderReplaceImageCommandName, new CkfinderImageReplaceCommand( editor ) );


        componentFactory.add( 'imageReplace', locale =>{
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( ckFinderReplaceImageCommandName);

            // The button will be an instance of BsButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                icon : imageIcon,
                label: t('Replace image'),
                withText: false,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( ckFinderReplaceImageCommandName) );

            return buttonView;
        });

        componentFactory.add( EDIT_COMMAND_NAME, locale => {
            const editor = this.editor;
            const imageInsertView = new ImageInsertPanelView( locale, prepareIntegrations( editor ) );
            const command = editor.commands.get( ckFinderReplaceImageCommandName );

            const dropdownView = imageInsertView.dropdownView;
            const splitButtonView = dropdownView.buttonView;

            splitButtonView.actionView = editor.ui.componentFactory.create( 'imageReplace' );
            // After we replaced action button with `uploadImage` component,
            // we have lost a proper styling and some minor visual quirks have appeared.
            // Brining back original split button classes helps fix the button styling
            // See https://github.com/ckeditor/ckeditor5/issues/7986.
            splitButtonView.actionView.extendTemplate( {
                attributes: {
                    class: 'ck ck-button ck-splitbutton__action'
                }
            } );

            return this._setUpDropdown( dropdownView, imageInsertView, command );
        } );


    }

    /**
     * Sets up the dropdown _view.
     *
     * @param {@ckEditor5/ui/dropdown/dropdownview~DropdownView} dropdownView A dropdownView.
     * @param {@ckEditor5/image/imageinsert/ui/imageinsertpanelview~ImageInsertPanelView} imageInsertView An imageInsertView.
     * @param {@ckEditor5/core/command~Command} command An insertImage command
     *
     * @private
     * @returns {@ckEditor5/ui/dropdown/dropdownview~DropdownView}
     */
    _setUpDropdown( dropdownView, imageInsertView, command ) {
        const editor = this.editor;
        const t = editor.t;
        const insertButtonView = imageInsertView.insertButtonView;
        const insertImageViaUrlForm = imageInsertView.getIntegration( 'insertImageViaUrl' );
        const panelView = dropdownView.panelView;

        dropdownView.bind( 'isEnabled' ).to( command );

        // Defer the children injection to improve initial performance.
        // See https://github.com/ckeditor/ckeditor5/pull/8019#discussion_r484069652.
        dropdownView.buttonView.once( 'open', () => {
            panelView.children.add( imageInsertView );
        } );

        dropdownView.on( 'change:isOpen', () => {
            const selectedElement = editor.model.document.selection.getSelectedElement();

            if ( dropdownView.isOpen ) {
                imageInsertView.focus();

                if ( editor.plugins.get( 'ImageUtils' ).isImage( selectedElement ) ) {
                    imageInsertView.imageURLInputValue = selectedElement.getAttribute( 'src' );
                    insertButtonView.label = t( 'Update' );
                    insertImageViaUrlForm.label = t( 'Update image URL' );
                } else {
                    imageInsertView.imageURLInputValue = '';
                    insertButtonView.label = t( 'Insert' );
                    insertImageViaUrlForm.label = t( 'Insert image via URL' );
                }
            }
            // Note: Use the low priority to make sure the following listener starts working after the
            // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
            // invisible form/input cannot be focused/selected.
        }, { priority: 'low' } );

        imageInsertView.delegate( 'submit', 'cancel' ).to( dropdownView );
        this.delegate( 'cancel' ).to( dropdownView );

        dropdownView.on( 'submit', () => {
            closePanel();
            onSubmit();
        } );

        dropdownView.on( 'cancel', () => {
            closePanel();
        } );

        function onSubmit() {
            const selectedElement = editor.model.document.selection.getSelectedElement();

            if ( editor.plugins.get( 'ImageUtils' ).isImage( selectedElement ) ) {
                editor.model.change( writer => {
                    writer.setAttribute( 'src', imageInsertView.imageURLInputValue, selectedElement );
                    writer.removeAttribute( 'srcset', selectedElement );
                    writer.removeAttribute( 'sizes', selectedElement );
                } );
            } else {
                editor.execute( 'insertImage', { source: imageInsertView.imageURLInputValue } );
            }
        }

        function closePanel() {
            editor.editing.view.focus();
            dropdownView.isOpen = false;
        }

        return dropdownView;
    }
}
