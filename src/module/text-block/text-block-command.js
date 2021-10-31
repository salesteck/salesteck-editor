
import {Command} from 'ckeditor5/src/core';
export default class TextBlockCommand extends Command{
    static get commandName(){
        return 'TextBlockSelectionCommand';
    }
    constructor( editor) {
        super( editor );
        this.isEnabled = false;
    }
    /**
     * @inheritDoc
     */
    refresh() {
        const selection = this.editor.model.document.selection;
        let isBlock = false;
        const isCollapsed = selection.isCollapsed;
        if(isCollapsed){
            const firstPosition = selection.getFirstPosition();
            isBlock = this.editor.model.schema.isBlock(firstPosition.parent)

        }

        this.isEnabled = isCollapsed && isBlock;
    }

}
