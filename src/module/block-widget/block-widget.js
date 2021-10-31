import {Plugin} from 'ckeditor5/src/core';
import { Widget } from 'ckeditor5/src/widget';
import BlockWidgetEditing from "./block-widget-editing";
import BlockWidgetToolbar from "./block-widget-toolbar";
import './theme/style.css';
/**
 * @namespace Block-Widget.BlockWidget
 */
/**
 * @module BlockWidget/BlockWidget
 */
export default class BlockWidget extends Plugin {
    /**
     * @returns {Plugin[]} return an array of plugin's needed for this plugin
     */
    static get requires() {
        return [BlockWidgetEditing, BlockWidgetToolbar, Widget];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlockWidget';
    }
}
