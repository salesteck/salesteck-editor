/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/commands/insertcolumncommand
 */

import InsertFromAjax from "../../../core/commands/insert-from-ajax";
import {_isStrNotEmpty} from "../../../general";
export default class InsertHiddenElementAtRootCommandAjax extends InsertFromAjax {
    // constructor(editor) {
    //     super(editor);
    // }

    _insertHtml(htmlString){
        // console.log(`InsertHiddenElementAtRootCommandAjax`, {htmlString});
        if(_isStrNotEmpty(htmlString)){

            const editor = this.editor;
            const model = editor.model;
            const selection = model.document.selection;
            const lastPosition = selection.getLastPosition();

            // console.log(`InsertHiddenElementAtRootCommand:execute:${modelName}`, {modelName, htmlDefinition, lastPosition})
            const viewFragment = editor.data.processor.toView( htmlString );
            const modelFragment = editor.data.toModel( viewFragment, lastPosition.root);
            model.change(writer => {

                let insertPosition = writer.createPositionAt(lastPosition.root, 'end');
                if(insertPosition){

                    writer.insert( modelFragment, insertPosition );
                }

            });
        }
    }


}

