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
export default class BlockSelectParentCommand extends Command {
    static get commandName(){
        return 'SelectParent';
    }
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {String} modelName
     */
    constructor( editor, modelName = "" ) {
        super( editor );
        // console.log("BlockSelectParentCommand#constructor", { editor });
        this.modelName = modelName;
    }

    /**
     * @inheritDoc
     */
    refresh() {
        let selectedModelElement = this._getSelectedModelElement();
        // const modelName = this.modelName;
        // console.log(modelName+'SelectParentCommand#refresh', {selectedModelElement});

        this.isEnabled = selectedModelElement && selectedModelElement.parent && selectedModelElement.parent.name !== "$root";
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
        let selectedModelElement = this._getSelectedModelElement();

        // console.log('BlockSelectParentCommand#execute', {selectedModelElement});

        if( selectedModelElement && selectedModelElement.parent && selectedModelElement.parent.name !== "$root"){
            const parentView = editor.editing.mapper.toViewElement(selectedModelElement.parent);
            model.change( writer => {
                console.log('BlockSelectParentCommand#model.change', {selectedModelElement, parent : selectedModelElement.parent});
                writer.setSelection( selectedModelElement.parent, 'on');
                // if(isEditable){
                //     // writer.setSelection( writer.createRangeOn(selectedModelElement));
                //     writer.setSelection( selectedModelElement.parent, 'on');
                // }else {
                //
                //     writer.setSelection( selectedModelElement.parent, 'on');
                // }

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
