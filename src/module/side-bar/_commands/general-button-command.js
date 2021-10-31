
import { Command } from 'ckeditor5/src/core';
export default class GeneralButtonCommand extends Command{
    static get commandName(){
        return "generalBtnCommand";
    }
    /**
     * Creates a new `InsertColumnCommand` instance.
     *
     * @param {@ckEditor5/core/editor/editor~Editor} editor An editor on which this command will be used.
     */
    constructor( editor) {
        super( editor );
    }

}
