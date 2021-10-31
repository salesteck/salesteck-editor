
import { Command } from 'ckeditor5/src/core';
import {_isStrNotEmpty} from "../../../general";
import {getSelectedModelElementFromName} from "../../../_block/block/command-utils";
export default class ModelAttrCommand extends Command{
    constructor( editor, {modelName = ""}) {
        super( editor );
        this.isValid = _isStrNotEmpty(modelName);
        if(!this.isValid){
            throw new Error(`ModelAttrCommand is invalid! modelName is empty'`);
        }
        // console.log("ClassCommand#constructor", { editor });
        this.modelName = modelName;
        this.set('selectedModelElement', null);
        this.isEnabled = false;
        this.value = null;
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
        this.selectedModelElement = this._getSelectedModelElement();
        this.isEnabled = !!this.selectedModelElement && this.isValid;
        if(this.selectedModelElement){
            this.value = Object.fromEntries(this.selectedModelElement.getAttributes());
        }
        // console.log("ModelAttrCommand#refresh", { selectedModelElement : this.selectedModelElement, isEnabled : this.isEnabled, value : this.value });
    }
    execute({attrName, value}) {
        const editor = this.editor;
        const selectedModelElement = this._getSelectedModelElement();


        // const markers = editor.model.markers;
        // console.log("ModelAttrCommand#execute", { selectedModelElement, attrName, value });
        if( selectedModelElement && _isStrNotEmpty(attrName)){
            editor.model.enqueueChange( 'default', writer => {
                writer.setAttribute(attrName, value, selectedModelElement );
            } );
        }
    }

}
