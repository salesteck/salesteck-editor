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
export default class SelectClassCommand extends Command {


    static get commandName(){
        return 'SelectClassCommand';
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
        // console.log("SelectClassCommand#constructor", { editor });
        this.set('modelName', modelName);
        this.set('elementName', '');
        const _this = this;
        this.on('change:modelName', ( evt, propertyName, newValue, oldValue ) => {
            // console.log( `SelectClassCommand:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
            _this.refresh();
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
        if(selectedModelElement){
            this.elementName = selectedModelElement.name;
        }

        let classAttributes = this._modelClassAttribute(selectedModelElement);
        if(classAttributes){
            classAttributes = classAttributes.split(' ');
            classAttributes = classAttributes.filter( _class =>{
                return _isStrNotEmpty(_class);
            })
        }

        this.value = classAttributes || [];
        // console.log("SelectClassCommand#refresh", { modelName, selectedModelElement, classAttributes, elementName : this.elementName });
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
        const { value, batch,  regex, operation = ''} = options;
        const selectedModelElement = this._getSelectedModelElement();
        let classAttributes = this._modelClassAttribute(selectedModelElement);
        if(classAttributes){
            classAttributes = classAttributes.split(' ');
        }else {
            classAttributes = [];
        }
        if(operation === 'toggle'){

            const indexOf = classAttributes.indexOf(value);

            if(indexOf > -1){
                classAttributes.splice(indexOf, 1);
            }else {
                if(value){
                    classAttributes.push(value);
                }
            }

        }else {
            classAttributes = classAttributes.filter( (currentValue, index, arr) =>{
                return !regex.test(currentValue);
            });

            if(value){
                classAttributes.push(value);
            }
        }
        // console.log("SelectClassCommand#execute", { modelName: this.modelName, selectedModelElement, options, classAttributes });
        if( selectedModelElement){
            editor.model.enqueueChange( batch || 'default', writer => {
                // console.log("SelectClassCommand#editor.model.enqueueChange", { batch, writer, options, value });
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

    static _execute(editor, options){
        editor.execute(SelectClassCommand.commandName, options);
    }

    static _toggle(editor, options){
        options.operation = 'toggle';
        editor.execute(SelectClassCommand.commandName, options);
    }

}
