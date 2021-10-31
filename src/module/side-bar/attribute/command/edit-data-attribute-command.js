/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import { Command } from 'ckeditor5/src/core';
import {getSelectedModelElementFromName} from "../../../../_block/block/command-utils";
import {VIEW_ATTR, VIEW_NAME} from "../../../../const";
import {_isJsonString, _isStrNotEmpty} from "../../../../general";

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

export default class EditDataAttributeCommand extends Command {


    static get commandName(){
        return 'EditDataAttributeCommand';
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
        // console.log("EditDataAttributeCommand#constructor", { editor });
        this.set('modelName', modelName);
        this.set('elementName', '');
        this.set('viewName', '');
        this.set('viewElement', '');
        const _this = this;
        this.on('change:modelName', ( evt, propertyName, newValue, oldValue ) => {
            // console.log( `EditDataAttributeCommand:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
            _this.refresh();
        } );
        // this.on('change:value', ( evt, propertyName, newValue, oldValue ) => {
        //     // console.log( `EditDataAttributeCommand:${ propertyName } has changed from ${ JSON.stringify(oldValue) } to ${ JSON.stringify(newValue) }` );
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
        this.value = this._getValue(selectedModelElement);

        if(selectedModelElement){
            this.elementName = selectedModelElement.name;
        }

        if(selectedModelElement){
            this.viewName = this._getViewName(selectedModelElement);
        }

        if(selectedModelElement){
            this.viewElement = this.editor.editing.mapper.toViewElement(selectedModelElement);
        }

        // console.log("EditDataAttributeCommand#refresh", {
        //     selectedModelElement, attrValue : this.value, elementName : this.elementName,
        //     viewElement: this.viewElement,
        //     viewName : this.viewName, modelName : this.modelName
        // });

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
        const valueToSet = this._getValueToSet(  value, selectedModelElement );

        if( selectedModelElement && _isJsonString(valueToSet)){
            editor.model.enqueueChange( batch || 'default', writer => {
                // console.log("EditDataAttributeCommand#editor.model.enqueueChange", { batch, writer, options, valueToSet });
                writer.setAttribute(VIEW_ATTR, valueToSet, selectedModelElement );
            } );
        }
    }
    _getViewName(selectedModelElement){
        if(selectedModelElement){
            let viewName = selectedModelElement.getAttribute(VIEW_NAME);
            if(_isStrNotEmpty(viewName)){
                return viewName;
            }
            const viewElement = this.editor.editing.mapper.toViewElement(selectedModelElement);
            if(viewElement){
                return viewElement.name;
            }
        }
        return null;
    }


    _getValue(selectedModelElement){
        let retAttr = {};
        if(selectedModelElement){
            let viewAttr = selectedModelElement.getAttribute(VIEW_ATTR);
            viewAttr = _isJsonString(viewAttr) ? JSON.parse(viewAttr) : {};
            delete viewAttr.id;
            retAttr = viewAttr;
        }
        // console.log('EditDataAttributeCommand:_getValue', {arguments, retAttr})
        return retAttr;
    }

    _getValueToSet( value = {}, selectedModelElement ) {
        let viewAttr = {};
        if(selectedModelElement){
            viewAttr = selectedModelElement.getAttribute(VIEW_ATTR);
            viewAttr = _isJsonString(viewAttr) ? JSON.parse(viewAttr) : {};
        }
        Object.entries(value).map( ([attributeName, attributeValue]) =>{
            if(attributeValue){
                viewAttr[attributeName] = attributeValue;
            }else {
                delete viewAttr[attributeName];
            }
        } )

        return JSON.stringify(viewAttr);
    }


    static _execute(editor, value, batch = null){
        editor.execute(EditDataAttributeCommand.commandName, {value, batch});
    }
}
