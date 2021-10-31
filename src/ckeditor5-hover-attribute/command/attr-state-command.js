
import { Command } from 'ckeditor5/src/core';
import {_isStrNotEmpty} from "../../general";
import {getSelectedModelElementFromName} from "../../_block/block/command-utils";
export default class AttrStateCommand extends Command{
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {String} modelName An editor on which this command will be used.
     * @param {String} attrName An editor on which this command will be used.
     * Possible values: `"left"` and `"right"`.
     */
    constructor( editor, {modelName = "", attrName}) {
        super( editor );
        if(!_isStrNotEmpty(attrName)){
            throw new Error(`AttrStateCommand_${modelName}:attrName = ${attrName} is invalid value!`)
        }
        // console.log("ClassCommand#constructor", { editor });
        this.modelName = modelName;
        this.attrName = attrName;
        this.value = "";
        this.isEnabled = false;
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
        let attrValue = "";
        if(selectedModelElement){
            attrValue = this._getAttrValue(selectedModelElement);
        }

        this.value = attrValue || "";
        // console.log("AttrStateCommand#refresh", { selectedModelElement, attrValue });

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
    execute(options = {}) {
        const editor = this.editor;
        let attrValue;
        const selectedModelElement = this._getSelectedModelElement();
        if(selectedModelElement){
            attrValue = this._getAttrValue(selectedModelElement);
        }
        const { batch } = options;
        const value = attrValue !== true;


        // const markers = editor.model.markers;
        // console.log("AttrStateCommand#execute", { selectedModelElement, options, value });
        if( selectedModelElement && _isStrNotEmpty(this.attrName)){
            editor.model.enqueueChange( batch || 'transparent', writer => {
                // console.log("ClassCommand#editor.model.enqueueChange", { batch, writer, options, value });
                writer.setAttribute(this.attrName, value, selectedModelElement );
            } );
        }
    }

    _getAttrValue(selectedModelElement){
        let viewAttr = null;
        if(selectedModelElement){
            viewAttr = selectedModelElement.getAttribute(this.attrName);
        }
        return viewAttr;
    }


}
