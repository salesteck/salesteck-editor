/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import { Command } from 'ckeditor5/src/core';
import {_isMagnificPopupValid, _isStrNotEmpty} from "../../../general";
import IconEditing from "./icon-editing";
import $ from 'jquery';
import 'magnific-popup';
import {COMMAND_POSITION} from "../../../_block/block/block-operation/commands/block-move-command";
/**
 * The insert column command.
 *
 * The command is registered by {@link @ckEditor5/table/tableediting~TableEditing} as the `'insertTableColumnLeft'` and
 * `'insertTableColumnRight'` editor commands.
 *
 * To insert a column to the left of the selected cell, execute the following command:
 *
 *		editor.execute( 'insertTableColumnLeft' );
 *
 * To insert a column to the right of the selected cell, execute the following command:
 *
 *		editor.execute( 'insertTableColumnRight' );
 *
 * @extends @ckEditor5/core/command~Command
 */

export default class IconInsertAjaxCommand extends Command {
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {Object} options
     * @param {String} [options.position ="right"] The order of insertion relative to the column in which the caret is located.
     * @param {String} [options.templateUrl =null] The order of insertion relative to the column in which the caret is located.
     * @param {String} [options.selector="right"] The order of insertion relative to the column in which the caret is located.
     * Possible values: `"left"` and `"right"`.
     */
    constructor( editor, options = {} ) {
        super( editor );

        this.componentUrl = editor.config.get('componentUrl') || '';
        /**
         * The order of insertion relative to the column in which the caret is located.
         *
         * @readonly
         * @member {String} @ckEditor5/table/commands/insertcolumncommand~InsertColumnCommand#order
         */

        this.position = options.position || COMMAND_POSITION.after;
        // console.log("IconInsertAjaxCommand#execute", { _this : this});
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const model = this.editor.model;
        const schema = model.schema;
        const selection = model.document.selection;
        const lastPosition = selection.getLastPosition();

        const isBlock = isAllowedInParent(schema, lastPosition.parent);
        // console.log({lastPosition, isBlock});
        this.isEnabled =  isBlock && _isMagnificPopupValid() && _isStrNotEmpty(this.componentUrl);

    }

    /**
     * Executes the command.
     *
     * Depending on the command's {@link #order} value, it inserts a column to the `'left'` or `'right'` of the column
     * in which the selection is set.
     *
     * @fires execute
     */
    execute({url, selector}) {
        if(_isMagnificPopupValid() && _isStrNotEmpty(url) && _isStrNotEmpty(this.componentUrl)){
            const _this = this;
            // const address = url;
            // console.log('url', {url, address, selector});
            $.magnificPopup.open({
                iframe : {
                    markup: '<div class="mfp-iframe-scaler ck-editor-iframe">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe mfp-ck-editor" allowfullscreen></iframe>'+
                        '</div>'
                },
                mainClass : 'ck-editor-lightbox',
                items: {
                    src: _this.componentUrl+url
                },
                type: 'iframe',
                callbacks: {
                    open: function() {
                        const magnificPopupInstance = this;
                        // console.log('Popup is opened');
                        const $content = $(this.content);
                        const iframe = $('iframe', $content);
                        iframe.on('load', function (){
                            // const $this = $(this);
                            /*const body = $this.contents().find('body');
                            $.post( address, function( data ) {
                                body.prepend(data);
                                let selections = body.find(selector);

                                selections.click(function (){
                                    const htmlElement = $(this)[0].outerHTML;
                                    _this._insertHtml(htmlElement);
                                    magnificPopupInstance.close();
                                })
                            });*/

                            let selections = $(this).contents().find(selector);
                            // console.log("IconInsertAjaxCommand#execute", { selections});
                            selections.click(function (){
                                const htmlElement = $(this)[0].outerHTML;
                                _this._insertHtml(htmlElement);
                                magnificPopupInstance.close();
                            })

                        });

                    }
                }
            });

        }
    }

    _insertHtml(htmlElement){
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        const lastPosition = selection.getLastPosition();

        if(isAllowedInParent(model.schema, lastPosition.parent)){

            model.change( writer => {
                const viewFragment = editor.data.processor.toView( htmlElement );
                const modelFragment = editor.data.toModel( viewFragment, lastPosition.parent);
                writer.insertText(' ', lastPosition);
                writer.insert( modelFragment, lastPosition );
            } );
        }
    }
}

function isAllowedInParent(schema, modelElement){
    return schema.checkChild(modelElement, IconEditing.modelName);
}
