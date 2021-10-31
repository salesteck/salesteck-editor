import {Plugin} from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget';
import InlineElementEditing from "./inline-element-editing";
// import InlineElementEditing from "./inline-element-editing-for-request";
import './theme/style.css';


/**
 * @module column/Column
 */

export default class InlineElement extends Plugin {
    static get requires() {
        return [Widget, InlineElementEditing];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckInlineElement';
    }
}
