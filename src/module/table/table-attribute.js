
import { Plugin } from 'ckeditor5/src/core';
import AttributesEditing from "../side-bar/attribute/attributes-editing";
import AttributesSideBar from "../side-bar/attribute/attributes-side-bar";
import {VIEW_ATTR, VIEW_CLASS} from "../../const";
import "./theme/style.css";
import ClassAttributesEditing from "../side-bar/class/class-attributes-editing";
import ClassAttributesSideBar from "../side-bar/class/class-attributes-side-bar";

export default class TableAttribute extends Plugin{
    static get pluginName() {
        return 'SalesteckTableAttribute';
    }
    static get requires(){
        return [AttributesEditing, AttributesSideBar, ClassAttributesSideBar];
    }

    constructor(editor){
        super(editor);
    }

    init(){
        const _this = this;

        const editor = _this.editor;

        if(editor.plugins.has( 'TableEditing' )){

            editor.model.schema.extend(
                'table', {
                    allowAttributes: [VIEW_CLASS, VIEW_ATTR]
                }
            );

            editor.model.schema.extend(
                'tableCell', {
                    allowAttributes: [VIEW_CLASS, VIEW_ATTR]
                }
            );

            editor.model.schema.extend(
                'tableRow', {
                    allowAttributes: [VIEW_CLASS, VIEW_ATTR]
                }
            );

            editor.model.schema.extend( 'caption', {
                allowAttributesOf: '$text',
                allowAttributes: [VIEW_CLASS, VIEW_ATTR]
            } );
        }




    }
}

ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat(['table', 'tableCell', 'caption']);
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat(['table', 'tableCell', 'caption']);
