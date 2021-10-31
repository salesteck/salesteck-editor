/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global window */

/**
 * @module ckfinder/ckfindercommand
 */


import { Command } from 'ckeditor5/src/core';
import { CKEditorError } from 'ckeditor5/src/utils';
// import {isImage} from "@ckeditor/ckeditor5-image/src/image/utils";

/**
 * The CKFinder command. It is used by the {@link @ckEditor5/ckfinder/ckfinderediting~CKFinderEditing CKFinder editing feature}
 * to open the CKFinder file manager to insert an image or a link to a file into the editor content.
 *
 *		editor.execute( 'ckfinder' );
 *
 * **Note:** This command uses other features to perform tasks:
 * - To insert images the {@link @ckEditor5/image/image/insertimagecommand~InsertImageCommand 'insertImage'} command
 * from the {@link @ckEditor5/image/image~Image Image feature}.
 * - To insert links to files the {@link @ckEditor5/link/linkcommand~LinkCommand 'link'} command
 * from the {@link @ckEditor5/link/link~Link Link feature}.
 *
 * @extends @ckEditor5/core/command~Command
 */
export default class CkfinderImageReplaceCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor( editor ) {
        super( editor );

        // Remove default document listener to lower its priority.
        this.stopListening( this.editor.model.document, 'change' );

        // Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
        this.listenTo( this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' } );
    }

    /**
     * @inheritDoc
     */
    refresh() {
        // The CKFinder command is enabled when one of image or link command is enabled.
        const selectedElement = this.editor.model.document.selection.getSelectedElement();

        this.isEnabled = this.editor.plugins.get( 'ImageUtils' ).isImage( selectedElement );
    }

    /**
     * @inheritDoc
     */
    execute() {
        const editor = this.editor;
        if(!window.CKFinder){

            throw new CKEditorError( 'ckfinder-not-loaded', editor );
        }
        // console.log('CkfinderImageReplaceCommand#execute');

        const openerMethod = this.editor.config.get( 'ckfinder.openerMethod' ) || 'modal';

        if ( openerMethod != 'popup' && openerMethod != 'modal' ) {
            /**
             * The `ckfinder.openerMethod` must be one of: "popup" or "modal".
             *
             * @error ckfinder-unknown-openermethod
             */
            throw new CKEditorError( 'ckfinder-unknown-openermethod', editor );
        }

        const options = this.editor.config.get( 'ckfinder.options' ) || {};

        options.chooseFiles = true;

        // Cache the user-defined onInit method
        const originalOnInit = options.onInit;

        // Pass the lang code to the CKFinder if not defined by user.
        if ( !options.language ) {
            options.language = editor.locale.uiLanguage;
        }

        // The onInit method allows to extend CKFinder's behavior. It is used to attach event listeners to file choosing related events.
        options.onInit = finder => {
            // Call original options.onInit if it was defined by user.
            if ( originalOnInit ) {
                originalOnInit( finder );
            }

            finder.on( 'files:choose', evt => {
                const files = evt.data.files.toArray();

                // Insert links
                const links = files.filter( file => !file.isImage() );
                const images = files.filter( file => file.isImage() );

                for ( const linkFile of links ) {
                    editor.execute( 'link', linkFile.getUrl() );
                }

                const imagesUrls = [];

                for ( const image of images ) {
                    const url = image.getUrl();

                    imagesUrls.push( url ? url : finder.request( 'file:getProxyUrl', { file: image } ) );
                }

                if ( imagesUrls.length ) {
                    replaceImage( editor, imagesUrls[0] );
                }
            } );

            finder.on( 'file:choose:resizedImage', evt => {
                const resizedUrl = evt.data.resizedUrl;

                if ( !resizedUrl ) {
                    const notification = editor.plugins.get( 'Notification' );
                    const t = editor.locale.t;

                    notification.showWarning( t( 'Could not obtain resized image URL.' ), {
                        title: t( 'Selecting resized image failed' ),
                        namespace: 'ckfinder'
                    } );

                    return;
                }

                replaceImage( editor, [ resizedUrl[0] ] );
            } );
        };

        window.CKFinder[ openerMethod ]( options );
    }
}

function replaceImage( editor, url ) {
    const selectedElement = editor.model.document.selection.getSelectedElement();

    if ( editor.plugins.get( 'ImageUtils' ).isImage( selectedElement ) ) {
        editor.model.change( writer => {
            writer.setAttribute( 'src', url, selectedElement);
            writer.removeAttribute( 'srcset', selectedElement );
            writer.removeAttribute( 'sizes', selectedElement );
        } );
    }
}
