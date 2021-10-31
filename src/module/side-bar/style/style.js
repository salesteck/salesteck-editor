import {
    Plugin
} from 'ckeditor5/src/core';
import StyleSideBar from "./style-side-bar";
import StyleEditing from "./style-editing";
export default class Style extends Plugin{

    static get requires() {
        return [StyleEditing, StyleSideBar];
    }
    static get pluginName() {
        return 'SalesteckStyle';
    }
}
