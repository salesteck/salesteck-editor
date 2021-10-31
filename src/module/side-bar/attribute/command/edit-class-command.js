/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import { Command } from 'ckeditor5/src/core';
import {getSelectedModelElementFromName} from "../../../../_block/block/command-utils";
import {_isStrNotEmpty} from "../../../../general";
import {VIEW_CLASS} from "../../../../const";

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

export default class EditClassCommand extends Command {


    static get commandName(){
        return 'EditClassCommand';
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
        // console.log("EditClassCommand#constructor", { editor });
        this.set('modelName', modelName);
        this.set('elementName', '');
        const _this = this;
        this.on('change:modelName', ( evt, propertyName, newValue, oldValue ) => {
            // console.log( `EditClassCommand:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
            _this.refresh();
        } );
        this.on('change:value', ( evt, propertyName, newValue, oldValue ) => {
            // console.log( `EditClassCommand:${ propertyName } has changed from ${ JSON.stringify(oldValue) } to ${ JSON.stringify(newValue) }` );
        } );
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
        let classAttributes = this._modelClassAttribute(selectedModelElement);
        if(classAttributes){
            classAttributes = classAttributes.split(' ');
            classAttributes = classAttributes.filter( _class =>{
                return _isStrNotEmpty(_class);
            })
        }
        if(selectedModelElement){
            this.elementName = selectedModelElement.name;
        }

        this.value = classAttributes || [];
        // console.log("EditClassCommand#refresh", { modelName, selectedModelElement, classAttributes });
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
        const { value, batch, operation} = options;
        const selectedModelElement = this._getSelectedModelElement();
        let classAttributes = this._modelClassAttribute(selectedModelElement);
        if(classAttributes){
            classAttributes = classAttributes.split(' ');
        }else {
            classAttributes = [];
        }
        const indexOf = classAttributes.indexOf(value);
        if(operation === 'add'){
            if(_isStrNotEmpty(value) && indexOf === -1){
                classAttributes.push(value);
            }
        }else {
            if(_isStrNotEmpty(value) && indexOf !== -1){
                classAttributes.splice(indexOf, 1);
            }
        }
        // console.log("EditClassCommand#execute", { modelName: this.modelName, selectedModelElement, options, classAttributes });
        if( selectedModelElement){
            editor.model.enqueueChange( batch || 'default', writer => {

                // console.log("EditClassCommand#editor.model.enqueueChange", { batch, writer, options, value });
                writer.setAttribute(VIEW_CLASS, classAttributes.join(' '), selectedModelElement );
            } );
        }
    }

    _modelClassAttribute(element){
        if ( !element ) {
            return;
        }
        return element.getAttribute( VIEW_CLASS );
    }

    static _execute(editor, value, batch = null){
        editor.execute(EditClassCommand.commandName, {value, batch});
    }

    static _add(editor, value, batch = null){
        editor.execute(EditClassCommand.commandName, {value, batch, operation : 'add'});
    }

    static _remove(editor, value, batch = null){
        editor.execute(EditClassCommand.commandName, {value, batch});
    }

}
