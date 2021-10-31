import {Plugin} from 'ckeditor5/src/core';
import BlocksEditing, {ALLOWED_ATTR} from "../../_block/block/blocks-editing";

/**
 * @class CollapseBlockEditing
 * @property {MultiRootEditor} editor
 */
export default class CollapseBlockEditing extends Plugin{
    /**
     *
     * @returns {string}
     */
    static get pluginName(){
        return "CollapseBlockEditing"
    }

    /**
     *
     * @returns {BlocksEditing[]}
     */
    static get requires(){
        return [BlocksEditing];
    }


    constructor(editor) {
        super(editor);
    }

    /**
     *
     */
    init(){
        this._defineSchema();
        this._defineConverters();
    }

    /**
     *
     * @private
     */
    _defineSchema(){

        const schema = this.editor.model.schema;
        schema.register( 'collapsible', {
            // Cannot be split or left by the caret.
            isLimit: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            allowIn: [BlocksEditing.contentModelName],

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root',
            allowAttributes: ALLOWED_ATTR
        } );

        // Allow all $block content inside a table cell.
        schema.extend('$block', {allowIn: ['collapsible']});
    }

    /**
     *
     * @private
     */
    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'collapsible',
            view: {
                name: 'div',
                classes: 'collapse'
            }
        } );

    }
}
