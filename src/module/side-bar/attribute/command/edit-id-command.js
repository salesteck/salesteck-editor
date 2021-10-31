/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import { Command } from 'ckeditor5/src/core';
import {getSelectedModelElementFromName} from "../../../../_block/block/command-utils";
import {VIEW_ATTR} from "../../../../const";
import {_isJsonString, _isStr, _isStrNotEmpty} from "../../../../general";

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

export default class EditIdCommand extends Command {


    static get commandName(){
        return 'EditIdCommand';
    }
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {String} modelName An editor on which this command will be used.
     * Possible values: `"left"` and `"right"`.
     */
    constructor( editor, modelName = null) {
        super( editor );
        // console.log("EditIdCommand#constructor", { editor });
        this.set('modelName', modelName);
        this.set('elementName', '');
        this.attrName = 'id';
        const _this = this;
        this.on('change:modelName', ( evt, propertyName, newValue, oldValue ) => {
            // console.log( `EditIdCommand:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
            _this.refresh();
        } );
        // this.on('change:value', ( evt, propertyName, newValue, oldValue ) => {
        //     // console.log( `EditIdCommand:${ propertyName } has changed from ${ JSON.stringify(oldValue) } to ${ JSON.stringify(newValue) }` );
        // } );
    }

    _getSelectedModelElement(){
        const model = this.editor.model;
        const modelSelection = model.document.selection;
        const modelName = this.modelName;
        let selectedModelElement;
        if(_isStrNotEmpty(modelName)){
            selectedModelElement = getSelectedModelElementFromName(modelSelection, modelName);
        }else {
            selectedModelElement = modelSelection.getSelectedElement();
        }
        return selectedModelElement || null;
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const selectedModelElement = this._getSelectedModelElement();
        if(selectedModelElement){
            this.elementName = selectedModelElement.name;
        }

        let attrValue = this._getValue(selectedModelElement);
        this.value = attrValue;

        // console.log("EditIdCommand#refresh", { modelName, selectedModelElement, attrValue });

        this.isEnabled = !!selectedModelElement;
    }

    /**
     * Executes the command.
     *
     * Depending on the command's {@link #order} value, it inserts a column to the `'left'` or `'right'` of the column
     * in which the selection is set.
     *
     * @fires execute
     */
    execute(options) {
        const editor = this.editor;
        const { value, batch} = options;
        const selectedModelElement = this._getSelectedModelElement();
        const valueToSet = this._getValueToSet( value, selectedModelElement );


        // console.log("EditIdCommand#execute", { modelName: this.modelName, selectedModelElement, options, valueToSet });
        if( selectedModelElement && _isStr(value) ){
            editor.model.enqueueChange( batch || 'default', writer => {
                // console.log("EditIdCommand#editor.model.enqueueChange", { batch, writer, options, value });
                writer.setAttribute(VIEW_ATTR, valueToSet, selectedModelElement );
            } );
        }
    }


    _getValue(selectedModelElement){
        let attrValue = "";
        if(selectedModelElement){
            let viewAttr = selectedModelElement.getAttribute(VIEW_ATTR);
            viewAttr = _isJsonString(viewAttr) ? JSON.parse(viewAttr) : {};
            attrValue = viewAttr[this.attrName] || "";
        }
        return attrValue;
    }
    _getValueToSet( value, selectedModelElement ) {
        value = value || "";
        let viewAttr = {};
        if(selectedModelElement){
            viewAttr = selectedModelElement.getAttribute(VIEW_ATTR);
            viewAttr = _isJsonString(viewAttr) ? JSON.parse(viewAttr) : {};
            viewAttr[this.attrName] = value;
        }

        return JSON.stringify(viewAttr);
    }


    static _execute(editor, value, batch = null){
        editor.execute(EditIdCommand.commandName, {value, batch});
    }
}
