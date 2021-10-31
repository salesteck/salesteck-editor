import {Plugin} from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget';
import BlocksEditing from "./blocks-editing";
import BlockToolbar from "./block-toolbar";
// import BlockMirrorEditing from "../block-widget/block-mirror-editing";
import BlockWidget from "../../module/block-widget/block-widget";


/**
 * @module column/Column
 */

export default class Blocks extends Plugin {
    static get requires() {
        return [
            BlocksEditing, BlockToolbar, BlockWidget,
            // BlockMirrorEditing,
            Widget
        ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlocks';
    }
}
