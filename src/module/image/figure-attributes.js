import {VIEW_CLASS} from "../../const";
import {_isStrNotEmpty} from "../../general";

export class FigureAttributes {
    /**
     * Plugin's constructor - receives an editor instance on creation.
     */
    constructor( editor ) {
        // Save reference to the editor.
        this.editor = editor;
    }

    /**
     * Sets the conversion up and extends the table & image features schema.
     *
     * Schema extending must be done in the "afterInit()" call because plugins define their schema in "init()".
     */
    afterInit() {
        const editor = this.editor;

        // Define on which elements the CSS classes should be preserved:
        setupCustomClassConversion( 'img', 'imageBlock', editor );
        // setupCustomClassConversion( 'img', 'imageInline', editor );
        // setupCustomClassConversion( 'iframe', 'media', editor );
        setupCustomClassConversion( 'table', 'table', editor );

        // editor.conversion.for( 'upcast' ).add( upcastCustomClasses( 'figure' ), { priority: 'low' } );

        // Define custom attributes that should be preserved.
        // setupCustomAttributeConversion( 'img', 'imageBlock', 'id', editor );
        // setupCustomAttributeConversion( 'img', 'imageInline', 'id', editor );
        // setupCustomAttributeConversion( 'table', 'table', 'id', editor );
    }
}

/**
 * Sets up a conversion that preserves classes on <img> and <table> elements.
 */
function setupCustomClassConversion( viewElementName, modelElementName, editor ) {
    // The VIEW_CLASS attribute stores custom classes from the data in the model so that schema definitions allow this attribute.
    editor.model.schema.extend( modelElementName, { allowAttributes: [ VIEW_CLASS ] } );

    // Defines upcast converters for the <img> and <table> elements with a "low" priority so they are run after the default converters.
    editor.conversion.for( 'upcast' ).add( dispatcher =>{
        dispatcher.on( `element:${ viewElementName }`, ( evt, data, conversionApi ) => {
            const viewItem = data.viewItem;
            const modelRange = data.modelRange;

            const modelElement = modelRange && modelRange.start.nodeAfter;
            if ( !modelElement ) {
                return;
            }

            // The upcast conversion picks up classes from the base element and from the <figure> element so it should be extensible.
            let modelAttributeValue = modelElement.getAttribute( VIEW_CLASS ) || '';
            modelAttributeValue = _isStrNotEmpty(modelAttributeValue) ? modelAttributeValue.trim().split(' ') : [];
            let viewItemClass = viewItem.getAttribute('class') || '';
            viewItemClass = _isStrNotEmpty(viewItemClass) ? viewItemClass.trim().split(' ') : [];
            const classes = [...modelAttributeValue, ...viewItemClass];
            let unique = [...new Set(classes)];


            // console.log(`upcast:${ viewElementName }:${modelElement.name}`, {viewItem, viewItemClass, modelElement, modelAttributeValue, classes, unique})

            conversionApi.writer.setAttribute( VIEW_CLASS, unique.join(' '), modelElement );
        }, {priority : 'low'} );
    });

    editor.conversion.for('downcast').add(dispatcher => {/*
        dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
            const modelElement = data.item;

            const viewFigure = conversionApi.mapper.toViewElement( modelElement );

            if ( !viewFigure ) {
                return;
            }

            // The code below assumes that classes are set on the element inside the <figure>.
            const viewElement = findViewChild( viewFigure, viewElementName, conversionApi );

            conversionApi.writer.addClass( modelElement.getAttribute( VIEW_CLASS ), viewElement );
        } );*/
        dispatcher.on( `attribute:${VIEW_CLASS}:${modelElementName}`, ( evt, data, conversionApi ) => {
            const modelElement = data.item;

            const viewFigure = conversionApi.mapper.toViewElement( modelElement );

            if ( !viewFigure ) {
                return;
            }
            let viewElement;
            if(viewFigure.name === viewElementName){
                viewElement = viewFigure;
            }else {
                viewElement = findViewChild( viewFigure, viewElementName, conversionApi );
            }

            if ( !viewElement ) {
                return;
            }
            if (_isStrNotEmpty(data.attributeOldValue)) {
                conversionApi.writer.removeClass(data.attributeOldValue.split(' '), viewElement);
            }
            if (_isStrNotEmpty(data.attributeNewValue)) {
                conversionApi.writer.addClass(data.attributeNewValue.split(' '), viewElement);
            }

        } );
    });

}

/**
 * Sets up a conversion for a custom attribute on the view elements contained inside a <figure>.
 *
 * This method:
 * - Adds proper schema rules.
 * - Adds an upcast converter.
 * - Adds a downcast converter.
 */
function setupCustomAttributeConversion( viewElementName, modelElementName, viewAttribute, editor ) {
    // Extends the schema to store an attribute in the model.
    const modelAttribute = `custom${ viewAttribute }`;

    editor.model.schema.extend( modelElementName, { allowAttributes: [ modelAttribute ] } );

    editor.conversion.for( 'upcast' ).add( upcastAttribute( viewElementName, viewAttribute, modelAttribute ) );
    editor.conversion.for( 'downcast' ).add( downcastAttribute( modelElementName, viewElementName, viewAttribute, modelAttribute ) );
}

/**
 * Helper method that searches for a given view element in all children of the model element.
 *
 * @param {module:engine/view/item~Item} viewElement
 * @param {String} viewElementName
 * @param {module:engine/conversion/downcastdispatcher~DowncastConversionApi} conversionApi
 * @return {module:engine/view/item~Item}
 */
function findViewChild( viewElement, viewElementName, conversionApi ) {
    const viewChildren = Array.from( conversionApi.writer.createRangeIn( viewElement ).getItems() );

    return viewChildren.find( item => item.is( 'element', viewElementName ) );
}

/**
 * Returns the custom attribute upcast converter.
 */
function upcastAttribute( viewElementName, viewAttribute, modelAttribute ) {
    return dispatcher => dispatcher.on( `element:${ viewElementName }`, ( evt, data, conversionApi ) => {
        const viewItem = data.viewItem;
        const modelRange = data.modelRange;

        const modelElement = modelRange && modelRange.start.nodeAfter;

        if ( !modelElement ) {
            return;
        }

        conversionApi.writer.setAttribute( modelAttribute, viewItem.getAttribute( viewAttribute ), modelElement );
    } );
}

/**
 * Returns the custom attribute downcast converter.
 */
function downcastAttribute( modelElementName, viewElementName, viewAttribute, modelAttribute ) {
    return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
        const modelElement = data.item;

        const viewFigure = conversionApi.mapper.toViewElement( modelElement );
        const viewElement = findViewChild( viewFigure, viewElementName, conversionApi );

        if ( !viewElement ) {
            return;
        }

        conversionApi.writer.setAttribute( viewAttribute, modelElement.getAttribute( modelAttribute ), viewElement );
    } );
}
