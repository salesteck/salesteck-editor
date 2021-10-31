
import { Command } from 'ckeditor5/src/core';
import {_isStrNotEmpty} from "../../../general";
import {getSelectedModelElementFromName} from "../../../_block/block/command-utils";
export default class ToggleVisibilityCommand extends Command{
    constructor( editor, {modelName = ""}) {
        super( editor );
        this.modelAttr = 'show';
        this.isValid = editor.model.schema.checkAttribute(modelName, this.modelAttr);
        if(!this.isValid){
            throw new Error(`ToggleVisibilityCommand:${modelName} is invalid! ${modelName} Can't have '${this.modelAttr}'`);
        }
        // console.log("ClassCommand#constructor", { editor });
        this.modelName = modelName;
        this.value = false;
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

        this.value = attrValue || false;
        // console.log("ToggleVisibilityCommand#refresh", { selectedModelElement, attrValue });

        this.isEnabled = !!selectedModelElement && this.isValid;
    }
    _getAttrValue(selectedModelElement){
        let viewAttr = null;
        if(selectedModelElement){
            viewAttr = selectedModelElement.getAttribute(this.modelAttr);
        }
        return viewAttr;
    }

    execute(options = {}) {
        const editor = this.editor;
        let attrValue;
        const selectedModelElement = this._getSelectedModelElement();
        if(selectedModelElement){
            attrValue = this._getAttrValue(selectedModelElement);
        }
        const value = attrValue !== true;


        // const markers = editor.model.markers;
        // console.log("ToggleVisibilityCommand#execute", { selectedModelElement, options, value });
        if( selectedModelElement && _isStrNotEmpty(this.modelAttr)){
            editor.model.enqueueChange( 'transparent', writer => {
                // console.log("ClassCommand#editor.model.enqueueChange", { batch, writer, options, value });
                writer.setAttribute(this.modelAttr, value, selectedModelElement );
                writer.setSelection(null );
            } );
        }
    }

}
