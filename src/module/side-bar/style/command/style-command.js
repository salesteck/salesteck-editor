/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block/commands/BlockPropertyCommand
 */

import { Command } from 'ckeditor5/src/core';
import {_isStr, _isStrNotEmpty} from "../../../../general";
import {getSelectedModelElementFromName} from "../../../../_block/block/command-utils";
import {VIEW_STYLE} from "../../../../const";
import StylesMap from "@ckeditor/ckeditor5-engine/src/view/stylesmap";

/**
 * The table cell attribute command.
 *
 * The command is a base command for other table cell property commands.
 *
 * @extends @ckEditor5/core/command~Command
 */
export default class StyleCommand extends Command {

    static get commandName(){
        return 'StyleCommand';
    }
    /**
     * Creates a new `StyleCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor in which this command will be used.
     * @param {String} modelName model name name.
     */
    constructor( editor, modelName= null ) {
        super( editor );
        this.set('modelName', modelName);
        const _this = this;
        this.on('change:modelName', ( evt, propertyName, newValue, oldValue ) => {
            //     console.log( `StyleCommand:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
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
        if(!_isStr(this.modelName) && selectedModelElement){
            this.modelName = selectedModelElement.name;
        }

        let  viewStyleAttr = this._getModelStyleAttribute( selectedModelElement );
        const styleMap = new StylesMap(this.editor.data.stylesProcessor);
        if(_isStrNotEmpty(viewStyleAttr)){
            styleMap.setTo(viewStyleAttr);
        }else {
            styleMap.setTo('');
        }
        this.value =  styleMap;
        // console.log("StyleCommand#refresh#"+VIEW_STYLE, {viewStyleAttr, selectedModelElement, value : this.value});
        this.isEnabled = !!selectedModelElement;
    }



    /**
     * Executes the command.
     *
     * @fires execute
     * @param {Object} [options]
     * @param {*} [options.styleProperty] If set, the command will set the attribute on selected table cells.
     * @param {*} [options.value] If set, the command will set the attribute on selected table cells.
     * If it is not set, the command will remove the attribute from the selected table cells.
     * @param {@ckEditor5/engine/model/batch~Batch} [options.batch] Pass the model batch instance to the command to aggregate changes,
     * for example to allow a single undo step for multiple executions.
     */
    execute( options = {} ) {
        const { value, batch } = options;
        const _this = this;
        const model = _this.editor.model;
        const selectedModelElement = _this._getSelectedModelElement();

        const styleMap = new StylesMap(this.editor.data.stylesProcessor);
        if(_isStr(value)){
            styleMap.setTo(value);
        }
        // for(const styleName of styleMap.getStyleNames()){
        //     console.log("StyleCommand#execute", {styleName, style : styleMap.getAsString(styleName)});
        //
        // }
        //
        // console.log(modelName+"StyleCommand#execute", {options, selectedModelElement, viewStyleAttr});
        if(selectedModelElement){
            model.enqueueChange( batch || 'default', writer => {
                writer.setAttribute( VIEW_STYLE, styleMap.toString(), selectedModelElement );
            } );
        }
    }
    /**
     * Returns the attribute value for a element _view.
     *
     * @param {@ckEditor5/engine/model/element~Element} element
     * @returns {String|undefined}
     * @private-attribute
     */

    _getModelStyleAttribute(element){
        if ( !element ) {
            return;
        }
        return element.getAttribute( VIEW_STYLE );
    }


    static _execute(editor, value, batch){
        editor.execute(StyleCommand.commandName, {
            value: value,
            batch: batch
        });
    }
}
