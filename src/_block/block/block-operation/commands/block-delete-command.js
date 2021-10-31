/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import { Command } from 'ckeditor5/src/core';
import {_isStrNotEmpty} from "../../../../general";
import {getSelectedModelElementFromName} from "../../command-utils";
import {DATA_CHILD_COUNT} from "../../../../const";
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
export default class BlockDeleteCommand extends Command {
    static get commandName(){
        return 'Delete';
    }
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {String} modelName
     */
    constructor( editor, modelName= "" ) {
        super( editor );
        // console.log("BlockMoveCommand#constructor", { editor, modelName });
        this.modelName = modelName;

    }

    /**
     * @inheritDoc
     */
    refresh() {
        const selectedModelElement = this._getSelectedModelElement();
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
    execute() {
        const editor = this.editor;
        const model = editor.model;
        const selectedModelElement = this._getSelectedModelElement();

        // console.log(this.modelName+"Move:"+this.position+"Command#execute", {  selectedModelElement });
        if(selectedModelElement){
            model.change( writer => {
                // // console.log({writer});
                const parent = selectedModelElement.parent;
                // // // writer.remove(selectedModelElement);
                // if(parent && _isStrNotEmpty(parent.name)){
                //     writer.setAttribute(DATA_CHILD_COUNT, parent.childCount, parent);
                // }

                editor.model.deleteContent(editor.model.createSelection(writer.createRangeOn( selectedModelElement)), {doNotAutoparagraph: true});
                if(parent.name === '$root' && parent.childCount === 0){
                    return;
                }
                if(parent && _isStrNotEmpty(parent.name)){
                    writer.setAttribute(DATA_CHILD_COUNT, parent.childCount, parent);
                }
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
}
