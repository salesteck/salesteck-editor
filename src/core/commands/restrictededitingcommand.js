
import { Plugin } from 'ckeditor5/src/core';

export default class RestrictedEditingCommand extends Plugin {
    afterInit() {
        if(this.editor.plugins.has( 'RestrictedEditingModeEditing' )){
            this.editor.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'restrictedEditingException' );
        }
    }
}
