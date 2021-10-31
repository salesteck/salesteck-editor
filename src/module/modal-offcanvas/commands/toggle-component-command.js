
import { Command } from 'ckeditor5/src/core';
import {_isStrNotEmpty} from "../../../general";
import {getSelectedModelElementFromName} from "../../../_block/block/command-utils";
import {DATA_BLOCK_TYPE, VIEW_CLASS} from "../../../const";
export default class ToggleComponentCommand extends Command{
    constructor( editor, {modelName = "", childComponentName, position}) {
        super( editor );
        this.childComponentName = childComponentName;
        this.position = position;
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
        let childComponent = null;
        if(selectedModelElement){
            childComponent = this._getChildComponent(selectedModelElement);
        }

        this.value = !!childComponent;
        // console.log("ToggleComponentCommand#refresh", { selectedModelElement, childComponent });

        this.isEnabled = !!selectedModelElement;
    }
    _getChildComponent(selectedModelElement){
        return this._findChildRecursively(selectedModelElement);
    }

    _findChildRecursively(selectedModelElement){
        let childComponent = null;
        if(selectedModelElement && _isStrNotEmpty(this.childComponentName) && selectedModelElement.is('element')){
            // console.log(`ToggleComponentCommand:_findChildRecursively:${selectedModelElement.name}`, {selectedModelElement, childComponentName: this.childComponentName})
            for(const child of selectedModelElement.getChildren()){
                let isChildNameEqual = false;
                if(child.name === this.childComponentName){
                    isChildNameEqual = true;
                }
                if(isChildNameEqual){
                    return child;
                }else {
                    const childRecursive = this._findChildRecursively(child);
                    if(childRecursive){
                        return childRecursive;
                    }
                }
            }
        }
        return childComponent;
    }

    execute(options = {}) {
        const editor = this.editor;
        const selectedModelElement = this._getSelectedModelElement();
        let removableComponent = null;
        if(selectedModelElement){
            removableComponent = this._getChildComponent(selectedModelElement);
        }
        const value = !!removableComponent;


        // const markers = editor.model.markers;
        if( selectedModelElement){
            // console.log("ToggleComponentCommand#execute", { selectedModelElement, options, value, removableComponent });
            editor.model.enqueueChange('default', writer => {
                if(value){
                    const sibling = removableComponent.nextSibling || removableComponent.previousSibling;
                    editor.model.deleteContent(editor.model.createSelection(writer.createRangeOn( removableComponent)), {doNotAutoparagraph: true});
                    if(sibling){
                        writer.setSelection(sibling, 'in')
                    }
                }else {
                    const position = this.position || 0;
                    const allowedElementForComponent = this._findAllowedParentInModel(editor, selectedModelElement);
                    // console.log("ToggleComponentCommand#execute", { selectedModelElement, options, value, removableComponent, allowedElementForComponent, position });
                    if(allowedElementForComponent){
                        const modelAttr = {};
                        modelAttr[DATA_BLOCK_TYPE] = this.childComponentName;
                        modelAttr[VIEW_CLASS] = this.childComponentName;

                        editor.model.insertContent(
                            writer.createElement(this.childComponentName, modelAttr),
                            writer.createPositionAt(allowedElementForComponent, position)
                        );
                    }
                }

            } );
        }
    }

    _findAllowedParentInModel(editor, selectedModelElement){
        let allowedParentForComponent = null;
        if(selectedModelElement){
            if(editor.model.schema.checkChild(selectedModelElement.name, this.childComponentName)){
                return  selectedModelElement;
            }

            for(const child of selectedModelElement.getChildren()){
                let isChildAllowedInElement = false;

                if(editor.model.schema.checkChild(child.name, this.childComponentName)){
                    isChildAllowedInElement = true;
                }
                if(isChildAllowedInElement){
                    return child;
                }else {
                    const childRecursive = this._findAllowedParentInModel(editor, child);
                    if(childRecursive){
                        return childRecursive;
                    }
                }
            }
        }
        return allowedParentForComponent;
    }

}
