
import { Plugin } from 'ckeditor5/src/core';
import AttributesSideBar from "./attributes-side-bar";
import AttributesEditing from "./attributes-editing";
export default class Attributes extends Plugin{

    static get requires() {
        return [AttributesEditing, AttributesSideBar];
    }
    static get pluginName() {
        return 'SalesteckAttributes';
    }
}
