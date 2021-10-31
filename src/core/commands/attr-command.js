
import { Command } from 'ckeditor5/src/core';
import {_isJsonString, _isStr, _isStrNotEmpty} from "../../general";
import {getSelectedModelElementFromName} from "../../_block/block/command-utils";
import {VIEW_ATTR} from "../../const";


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
export default class AttrCommand extends Command {
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {string} attrName An editor on which this command will be used.
     * Possible values: `true` and `false`.
     * @param {string} modelName An editor on which this command will be used.
     */
    constructor( editor, attrName, modelName = "") {
        super( editor );
        // console.log("AttrCommand#constructor", { editor });
        this.attrName = attrName;
        this.modelName = modelName;
        this.value = "";
        this.isEnabled = false;

    }

    /**
     * @inheritDoc
     */
    refresh() {
        const _this = this;
        const attrName = this.attrName;
        const selectedModelElement = this._getSelectedModelElement();
        let attrValue = _this._getValue(selectedModelElement);
        this.value = attrValue;
        // console.log("AttrCommand#refresh", { _this, selectedModelElement, attrName, attrValue });
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
        const { value, batch } = options;
        const editor = this.editor;
        const attrName = this.attrName;

        const selectedModelElement = this._getSelectedModelElement();
        const valueToSet = this._getValueToSet( value, selectedModelElement );
        // console.log("AttrCommand#execute", {  options, selectedModelElement, value, valueToSet });
        if ( selectedModelElement && _isStr(value) && attrName ) {
            editor.model.enqueueChange( batch || 'default', writer => {
                // console.log("AttrCommand#editor.model.enqueueChange", { batch, writer, options, selectedModelElement, value, valueToSet });
                writer.setAttribute( VIEW_ATTR, valueToSet, selectedModelElement );
            } );
        }

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
     * Returns the proper model value. It can be used to add a default unit to numeric values.
     *
     * @private-attribute
     * @param {*} value
     * @param {Object|null} selectedModelElement
     * @returns {*}
     */
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

    _getValue(selectedModelElement){
        let attrValue = "";
        if(selectedModelElement){
            let viewAttr = selectedModelElement.getAttribute(VIEW_ATTR);
            viewAttr = _isJsonString(viewAttr) ? JSON.parse(viewAttr) : {};
            attrValue = viewAttr[this.attrName] || "";
        }
        return attrValue;
    }

}
