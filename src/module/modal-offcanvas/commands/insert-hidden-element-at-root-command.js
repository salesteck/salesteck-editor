/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import {Command} from 'ckeditor5/src/core';

/**
 * The insert column command.
 *
 * The command is registered by {@link @ckEditor5/table/tableediting~TableEditing} as the `'insertTableColumnLeft'` and
 * `'insertTableColumnRight'` editor commands.
 *
 * To insert a column to the left of the selected cell, execute the following command:
 *
 *        editor.execute( 'insertTableColumnLeft' );
 *
 * To insert a column to the right of the selected cell, execute the following command:
 *
 *        editor.execute( 'insertTableColumnRight' );
 *
 * @extends @ckEditor5/core/command~Command
 */
export default class InsertHiddenElementAtRootCommand extends Command {
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     * Possible values: `"left"` and `"right"`.
     */
    constructor(editor) {
        super(editor);

        /**
         * The order of insertion relative to the column in which the caret is located.
         *
         * @readonly
         * @member {String} @ckEditor5/table/commands/insertcolumncommand~InsertColumnCommand#order
         */

        this.position = 'end';
        this.isEnabled = true;
    }

    /**
     * @inheritDoc
     */
    refresh() {
        const model = this.editor.model;
        // console.log(`InsertHiddenElementAtRootCommand:refresh`);
    }

    /**
     * Executes the command.
     *
     * Depending on the command's {@link #order} value, it inserts a column to the `'left'` or `'right'` of the column
     * in which the selection is set.
     *
     * @fires execute
     */
    execute({modelName , htmlDefinition}) {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        const lastPosition = selection.getLastPosition();

        // console.log(`InsertHiddenElementAtRootCommand:execute:${modelName}`, {modelName, htmlDefinition, lastPosition})
        const viewFragment = editor.data.processor.toView( htmlDefinition );
        const modelFragment = editor.data.toModel( viewFragment, lastPosition.root);
        model.change(writer => {

            let insertPosition = writer.createPositionAt(lastPosition.root, 'end');
            if(insertPosition){

                writer.insert( modelFragment, insertPosition );
            }

        });
        // editor.editing.view.scrollToTheSelection();
    }
}

