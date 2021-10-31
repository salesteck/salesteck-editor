
import { Plugin } from 'ckeditor5/src/core';
import ClassAttributesSideBar from "./class-attributes-side-bar";
import ClassAttributesEditing from "./class-attributes-editing";
export default class ClassAttributes extends Plugin{

    static get requires() {
        return [ClassAttributesEditing, ClassAttributesSideBar];
    }
    static get pluginName() {
        return 'SalesteckClassAttributes';
    }
}
