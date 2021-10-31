import {Plugin} from 'ckeditor5/src/core';
import Position  from '@ckeditor/ckeditor5-engine/src/view/position';
import {toWidget, viewToModelPositionOutsideModelElement} from 'ckeditor5/src/widget';
import InlineElementToolbar from "./inline-element-toolbar";
import {_enableBlockEditing, _enableIdAttr, _setBlockName, _setViewProperty} from "../../../engine/utils/view";
import {
    _dataDowncast, _removeDuplicateSelectHandleElement, _upcastBlockType,
    _upcastElement, _upcastModelDefinition, _upcastViewAttr, _upcastViewClass, _upcastViewName, _upcastViewStyle,
    _widgetEditableEditingDowncast,
    _widgetEditingDowncast
} from "../../../engine/utils/converter/converter";
import StyleEditing from "../../side-bar/style/style-editing";
import ClassAttributesEditing from "../../side-bar/class/class-attributes-editing";
import AttributesEditing from "../../side-bar/attribute/attributes-editing";
import {
    DATA_BLOCK_NAME,
    DATA_CHILD_COUNT,
    DATA_CLASS_SELECTOR,
    MODEL_DEFINITION,
    VIEW_CLASS,
    VIEW_NAME
} from "../../../const";
import {WIDGET_BLOCK_CLASS_NAME} from "../../../_block/utils";
import {_addHoverState} from "../../../ckeditor5-hover-attribute/hover-attribute";
import {_upcastBlockName} from "../../../engine/utils/converter/upcast";
import {_isStrNotEmpty} from "../../../general";
/**
 * @module Inline/InlineEditing
 */


const ALLOWED_ATTR = [
    "data-block-type",
    "_view-attr",
    "_view-class",
    "view-name",
    "model-definition",
    "data-class-selector",
    "_view-style",
    "data-ct-child-count",
    "data-ct-block-name",
    "hoverState",
    "activeState"
];
/*
    case usage
    widget element
    this allow editing text in the widget element and allows it to be selected and dragged
    <span data-block-type="element">
        <span data-block-type="text"> the text goes here </span>
    </span>
 */
export default class InlineElementEditing extends Plugin {

    /**
     * Plugin name
     * @returns {string}
     */
    static get pluginName() {
        return 'SalesteckInlineElementEditing'
    }


    /**
     * Text Container modelName
     * @returns {string}
     */
    static get textContainerModelName() {
        return 'text';
    }

    /**
     * Widget Element modelName
     * @returns {string}
     */
    static get modelName() {
        return 'widgetElement';
    }

    /**
     * Other plugin requirement
     * @returns {InlineElementToolbar[]}
     */
    static get requires() {
        return [InlineElementToolbar];
    }

    /**
     * constructor
     * @param editor
     */
    constructor(editor) {
        super(editor);

        /**
         * define widget element schema
         */
        this._defineInlineElementSchema(editor);
        /**
         * define widget element converter
         */
        this._defineInlineElementConverter(editor);

        /**
         * define text container schema
         */
        this._defineTextContainerSchema(editor);
        /**
         * define text container converter
         */
        this._defineTextContainerConverter(editor);

        /**
         * map model to view position on editing
         */
        // editor.editing.mapper.on( 'modelToViewPosition', createModelToViewPositionMapper( editor.editing.view ) );
        /**
         * map model to view position on data
         */
        // editor.data.mapper.on( 'modelToViewPosition', createModelToViewPositionMapper( editor.editing.view ) );

        /**
         * map view to model position
         */
        editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( editor.model, viewElement => {
                return (viewElement.hasAttribute('data-block-type') && viewElement.getAttribute('data-block-type') ===  'element');
            } )
        );

    }

    init(){

    }

    /**
     * define widget element schema
     * @param editor
     * @private
     */
    _defineInlineElementSchema(editor) {
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

    /**
     * define widget element converter
     * @param editor
     * @private
     */
    _defineInlineElementConverter(editor) {
        const modelName = InlineElementEditing.modelName;
        const elementDefinition = {
            attributes : {
                'data-block-type': 'element'
            }
        };
        editor.conversion.for('upcast').elementToElement({
            view: {
                attributes : {
                    'data-block-type': 'element'
                }
            },
            model: (viewElement, {writer: modelWriter}) => {
                let modelElement = modelWriter.createElement(modelName);

                modelElement = _upcastViewStyle(modelWriter, modelElement, viewElement);

                modelElement = _upcastViewAttr(modelWriter, modelElement, viewElement);

                modelElement = _upcastViewName(modelWriter, modelElement, viewElement);

                let viewClass = viewElement.getAttribute('class');
                modelWriter.setAttribute(VIEW_CLASS, viewClass, modelElement);

                modelElement = _upcastBlockType(modelWriter, modelElement, viewElement);

                modelElement = _upcastBlockName(modelWriter, modelElement, viewElement);

                modelElement = _upcastModelDefinition(modelWriter, modelElement, elementDefinition);
                return modelElement;
            }, converterPriority : 'highest'
        });
        // _widgetEditingDowncast(editor.conversion, elementDefinition.modelName, true, false);
        editor.conversion.for('editingDowncast').add(dispatcher =>{
            dispatcher.on( 'insert:widgetElement', (event, data, {writer, mapper, consumable} )=>{
                if ( !consumable.consume( data.item, 'insert' ) ) {
                    return;
                }
                const modelElement = data.item;
                const viewName = modelElement.getAttribute(VIEW_NAME);
                let widgetElement = writer.createContainerElement(viewName, modelElement.getAttributes());
                writer.removeAttribute(MODEL_DEFINITION, widgetElement);
                writer.setAttribute(DATA_CHILD_COUNT, modelElement.childCount, widgetElement);
                writer.setAttribute(DATA_BLOCK_NAME, modelElement.name, widgetElement);
                writer.setAttribute("data-path-length", modelElement.getPath().length, widgetElement);

                console.log( `${event.name}`,{event, data, modelElement, widgetElement});
                if(viewName === "a"){
                    writer.setAttribute('href', 'javascript:void(0)', widgetElement);
                }
                _setBlockName(writer, widgetElement, modelName);
                _enableBlockEditing(writer, widgetElement);
                _enableIdAttr(writer, widgetElement);
                _addHoverState(widgetElement, writer);

                widgetElement =  toWidget(widgetElement, writer, {hasSelectionHandle: true});
                consumable.consume( modelElement, 'insert' );

                mapper.bindElements( modelElement, widgetElement );
                writer.insert( mapper.toViewPosition( data.range.start ), widgetElement );
                event.stop();
                // return widgetElement;
            }, { priority: 'highest' } );
            // dispatcher.on('remove:widgetElement', (event, data, {writer, mapper, consumable} )=>{
            //     console.log( `${event.name}`,{event, data});
            // });
        })
        _dataDowncast(editor.conversion, InlineElementEditing.modelName);
    }


    /**
     * define text container schema
     * @param editor
     * @private
     */
    _defineTextContainerSchema(editor) {
        /**
         * ALLOWED_ATTR =
         */
        editor.model.schema.register(InlineElementEditing.textContainerModelName, {
            isLimit: true,
            isSelectable : true,
            allowIn: InlineElementEditing.modelName,
            allowAttributes: ALLOWED_ATTR
        });
        editor.model.schema.extend('$text', {
            allowIn : [InlineElementEditing.textContainerModelName]
        });
    }

    /**
     * define text container converter
     * @param editor
     * @private
     */
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

}
StyleEditing._unSelectableComponent = StyleEditing._unSelectableComponent.concat([InlineElementEditing.modelName])
ClassAttributesEditing._unSelectableComponent = ClassAttributesEditing._unSelectableComponent.concat([InlineElementEditing.modelName])
AttributesEditing._unSelectableComponent = AttributesEditing._unSelectableComponent.concat([InlineElementEditing.modelName])

/**
 *
 * @param view
 * @returns {function}
 */
function createModelToViewPositionMapper( view ) {
    return ( evt, data ) => {
        const modelItem = data.modelPosition.nodeBefore;
        const modelPosition = data.modelPosition;
        const parent = modelPosition.parent;
        if(!(parent.is('element') && parent.is('$block'))){
            return;
        }
        if ( modelItem && modelItem.is( 'element', 'widgetElement' ) ) {
            const viewElement = data.mapper.toViewElement( parent );
            // const viewPosition = new Position( viewElement, modelPosition.offset  );
            console.log({modelItem, modelPosition, parent});
            const viewPosition = view.createPositionAt( viewElement, modelPosition.offset  );
            console.log({viewPosition});
            data.viewPosition = viewPosition;
            evt.stop();
        }
    };
}
