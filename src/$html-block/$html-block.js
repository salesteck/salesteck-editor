import {Plugin} from 'ckeditor5/src/core';
import {ALLOWED_ATTR} from "../_block/block/blocks-editing";
export default class HtmlBlock extends Plugin{
    static get modelName(){
        return '$_HtmlBlock'
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckHtmlBlock';
    }
    static get requires() {
        return [];

    }

    constructor(editor) {
        super(editor);
        const schema = this.editor.model.schema;

        schema.register(HtmlBlock.modelName, {
            // Behaves like a self-contained object (e.g. an image).
            allowWhere: '$root',
            isBlock: false,
            isContent: false,
            isObject: true,
            isLimit: true,
            isSelectable: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowAttributes: ALLOWED_ATTR,
            // allowIn: allowIn
        });
    }

}
