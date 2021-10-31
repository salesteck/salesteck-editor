
import {Command} from 'ckeditor5/src/core';

export default class PlaceholderCommand extends Command {
    static get commandName(){
        return 'PlaceHolder'
    }


    execute( { value } ) {
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change( writer => {
            // Create a <placeholder> elment with the "name" attribute (and all the selection attributes)...
            const placeholder = writer.createElement( 'placeholder', {
                ...Object.fromEntries( selection.getAttributes() ),
                name: value
            } );

            // ... and insert it into the document.
            // editor.model.insertContent( placeholder, selection.getLastPosition() );
            writer.insert( placeholder, selection.getLastPosition() );

            // Put the selection on the inserted element.
            writer.setSelection( placeholder, 'on' );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        this.isEnabled = model.schema.checkChild( selection.focus.parent, 'placeholder' );
    }
}
