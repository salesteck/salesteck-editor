import { Plugin } from 'ckeditor5/src/core';
import ElementsEditing from "./elements-editing";
import ElementsSideBar from "./elements-side-bar";
import './theme/style.css';
export default class Elements extends Plugin{

    static get requires() {
        return [ElementsEditing, ElementsSideBar];
    }
    static get pluginName() {
        return 'SalesteckElements';
    }
}
