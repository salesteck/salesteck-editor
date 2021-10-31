import {Plugin} from 'ckeditor5/src/core';
import ShapedDividerEditing from "./shaped-divider-editing";
import ShapedDividerToolbar from "./shaped-divider-toolbar";
export default class ShapedDivider extends Plugin{
    static get pluginName() {
        return 'ShapedDivider';
    }
    static get requires() {
        return [ShapedDividerEditing, ShapedDividerToolbar];
    }

}
