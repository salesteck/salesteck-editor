import {Plugin} from 'ckeditor5/src/core';
import { viewToModelPositionOutsideModelElement} from 'ckeditor5/src/widget';
import InlineElementToolbar from "./inline-element-toolbar";
import {_setViewProperty} from "../../../engine/utils/view";
import {ALLOWED_ATTR} from "../../../_block/block/blocks-editing";
import {
    _dataDowncast,
    _upcastElement,
    _widgetEditableEditingDowncast,
    _widgetEditingDowncast
} from "../../../engine/utils/converter/converter";
import StyleEditing from "../../side-bar/style/style-editing";
import ClassAttributesEditing from "../../side-bar/class/class-attributes-editing";
import AttributesEditing from "../../side-bar/attribute/attributes-editing";
/**
 * @module Inline/InlineEditing
 */

export default class InlineElementEditing extends Plugin {

    static get pluginName() {
        return 'SalesteckInlineElementEditing'
    }


    static get textContainerModelName() {
        return 'text';
    }

    static get modelName() {
        return 'element';
    }

    static get requires() {
        return [InlineElementToolbar];
    }

    constructor(editor) {
        super(editor);

        // console.log('InlineElementEditing#constructor()', {arguments});


        this._defineInlineElementSchema(editor);
        this._defineInlineElementConverter(editor);

        this._defineTextContainerSchema(editor);
        this._defineTextContainerConverter(editor);


    }

    init(){

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => {
                return (viewElement.hasAttribute('data-block-type') && viewElement.getAttribute('data-block-type') ===  InlineElementEditing.modelName);

            } )
        );
    }

    _defineTextContainerSchema(editor) {
        editor.model.schema.register(InlineElementEditing.textContainerModelName, {
            // inheritAllFrom: "paragraph",
            // Cannot be split or left by the caret.
            isLimit: true,
            // isInline : true,
            // isSelectable : true,
            // Allow content which is allowed in blocks (i.e. text with attributes).
            // allowContentOf: '$block',
            allowIn: [InlineElementEditing.modelName],
            allowAttributes: ALLOWED_ATTR
        });
        editor.model.schema.extend('$text', {
            allowIn : [InlineElementEditing.textContainerModelName]
        })
    }

    _defineInlineElementSchema(editor) {
        // const allAttr = ALL_ATTR.concat(ALLOWED_ATTR);
        editor.model.schema.register(InlineElementEditing.modelName, {
            allowWhere : '$text',
            isInline: true,
            isContent : true,
            allowIn: '$block',
            allowAttributesOf: '$text',
            allowAttributes: ALLOWED_ATTR
        });
        editor.model.schema.extend('$block', {
            allowChildren : InlineElementEditing.modelName
        })
    }

    _defineTextContainerConverter(editor) {

        const modelName = InlineElementEditing.textContainerModelName;
        const elementDefinition = {
            modelName,
            attributes : {
                'data-block-type': modelName
            }
        };
        _upcastElement(editor.conversion, modelName, elementDefinition);
        _widgetEditableEditingDowncast(editor.conversion, elementDefinition.modelName);
        _dataDowncast(editor.conversion, modelName);

    }

    _defineInlineElementConverter(editor) {
        const modelName = InlineElementEditing.modelName;
        const elementDefinition = {
            modelName,
            attributes : {
                'data-block-type': 'element'
            }
        };
        _upcastElement(editor.conversion, modelName, elementDefinition);
        _widgetEditingDowncast(editor.conversion, elementDefinition.modelName, true, false);
        _dataDowncast(editor.conversion, elementDefinition.modelName);
    }
}
StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat([InlineElementEditing.modelName])
ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat([InlineElementEditing.modelName])
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat([InlineElementEditing.modelName])

export function _enableCustomAttribute(viewWriter, viewElement) {
    _setViewProperty(viewWriter, viewElement, 'elementAttributeEnabled', true);
}
