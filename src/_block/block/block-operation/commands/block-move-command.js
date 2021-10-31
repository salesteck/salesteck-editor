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
export const MOVE_COMMAND = {
    start: 'MoveStart',
    before: 'MoveBefore',
    after: 'MoveAfter',
    end: 'MoveEnd'
};

export const COMMAND_POSITION = {
    start: 'start',
    before: 'before',
    after: 'after',
    end: 'end'
};
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
export default class BlockMoveCommand extends Command {
    static get commandName(){
        return 'Move';
    }
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * @param {String} modelName
     * @param {Object} options
     * @param {String} [options.order="right"] The order of insertion relative to the column in which the caret is located.
     * @param {String} [options.position ="right"] The order of insertion relative to the column in which the caret is located.
     * Possible values: `"left"` and `"right"`.
     */
    constructor( editor, options = {}, modelName= "" ) {
        super( editor );
        // console.log("BlockMoveCommand#constructor", { editor });
        this.modelName = modelName;

        /**
         * The order of insertion relative to the column in which the caret is located.
         *
         * @readonly
         * @member {String} @ckEditor5/table/commands/insertcolumncommand~InsertColumnCommand#order
         */

        this.position = options.position || COMMAND_POSITION.after;

    }

    /**
     * @inheritDoc
     */
    refresh() {
        const position = this.position;

        let isCommandValid = false;
        const selectedModelElement = this._getSelectedModelElement();
        // console.log(modelName+"Move:"+position+"Command#_isValid", { selectedModelElement});
        if(selectedModelElement){
            // console.log(modelName+"Move:"+position+"Command#refresh#_isValid", { selectedModelElement, modelName: this.modelName, position});

            switch (position){
                case  COMMAND_POSITION.start :
                    isCommandValid = !!selectedModelElement.previousSibling;
                    break;
                case  COMMAND_POSITION.before :
                    isCommandValid = !!selectedModelElement.previousSibling;
                    break;
                case  COMMAND_POSITION.after :
                    isCommandValid = !!selectedModelElement.nextSibling;
                    break;
                case  COMMAND_POSITION.end :
                    isCommandValid = !!selectedModelElement.nextSibling;
                    break;
            }
        }
        this.isEnabled = isCommandValid;
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
        const insertPosition = this.position;
        // console.log(modelName+"Move:"+this.position+"Command#execute", { selectedModelElement, modelSelection: modelSelection });

        model.change( writer => {

            let newPosition;
            let sibling;
            if(insertPosition === COMMAND_POSITION.start){
                newPosition = writer.createPositionAt( selectedModelElement.parent, 0 );
            }else if (insertPosition === COMMAND_POSITION.before){
                sibling = selectedModelElement.previousSibling;
                newPosition = model.createPositionBefore(sibling);
            }else if (insertPosition === COMMAND_POSITION.after){
                sibling = selectedModelElement.nextSibling
                newPosition = model.createPositionAfter(sibling);
            }else if (insertPosition === COMMAND_POSITION.end){
                newPosition = writer.createPositionAt( selectedModelElement.parent, 'end' );
            }
            // console.log("move content ",  { modelName : this.modelName, selectedModelElement, insertPosition, sibling});
            if(newPosition){
                const clonedBlock = writer.cloneElement(selectedModelElement);
                const range = model.insertContent(clonedBlock, newPosition);
                writer.setSelection( range);
                writer.remove(selectedModelElement);
            }
        } );
        editor.editing.view.scrollToTheSelection();


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
