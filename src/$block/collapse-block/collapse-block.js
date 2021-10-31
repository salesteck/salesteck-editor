import {Plugin} from 'ckeditor5/src/core';
import CollapseBlockEditing from "./collapse-block-editing";

/**
 * @class CollapseBlock
 */
export default class CollapseBlock extends Plugin{
    /**
     *
     * @returns {string}
     */
    static get pluginName(){
        return "CollapseBlock"
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return [CollapseBlockEditing]
    }
}
