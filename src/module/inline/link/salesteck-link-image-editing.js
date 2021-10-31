
import { Plugin } from 'ckeditor5/src/core';
import SalesteckLinkEditing from "./salesteck-linkediting";
import {DATA_BLOCK_TYPE} from "../../../const";
/**
 * @module salesteck/link-image
 *
 * @class
 *
 * @property editor
 *
 * The link image engine feature.
 *
 * It accepts the `linkHref="url"` attribute in the model for the {@link @ckeditor5/image/image~Image `<imageBlock>`} element
 * which allows linking images.
 *
 */

class SalesteckLinkImageEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return ['ImageEditing', 'ImageUtils', 'LinkEditing', 'LinkImageEditing', SalesteckLinkEditing];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckLinkImageEditing';
    }

    /**
     * @inheritDoc
     * @param editor
     */
    constructor(editor) {
        super(editor);
    }

    init() {
        const editor = this.editor;
        // const schema = editor.model.schema;

        // if ( editor.plugins.has( 'ImageBlockEditing' ) ) {
        //     schema.extend( 'imageBlock', { allowAttributes: [ 'linkHref' ] } );
        // }
        //
        // if ( editor.plugins.has( 'ImageInlineEditing' ) ) {
        //     schema.extend( 'imageInline', { allowAttributes: [ 'linkHref' ] } );
        // }

        // editor.conversion.for( 'upcast' ).add( upcastLink( editor ) );
        editor.conversion.for( 'downcast' ).add( downcastImageLink );

        // Definitions for decorators are provided by the `link` command and the `LinkEditing` plugin.
        // this._enableAutomaticDecorators();
        // this._enableManualDecorators();
    }

}

// Creates a ckeditor5-converter that adds `<a>` to linked block image view elements.
//
// @private
function downcastImageLink( dispatcher ) {
    dispatcher.on( 'attribute:linkHref:imageBlock', ( evt, data, conversionApi ) => {
        // The image will be already converted - so it will be present in the view.
        const viewFigure = conversionApi.mapper.toViewElement( data.item );
        const writer = conversionApi.writer;

        // But we need to check whether the link element exists.
        const linkInImage = Array.from( viewFigure.getChildren() ).find( child => child.name === 'a' );

        // If so, update the attribute if it's defined or remove the entire link if the attribute is empty.
        if ( linkInImage ) {
            if ( data.attributeNewValue ) {
                writer.setAttribute( 'href', data.attributeNewValue, linkInImage );
            } else {
                const viewImage = Array.from( linkInImage.getChildren() ).find( child => child.name === 'img' );

                writer.move( writer.createRangeOn( viewImage ), writer.createPositionAt( viewFigure, 0 ) );
                writer.remove( linkInImage );
            }
        } else {
            // But if it does not exist. Let's wrap already converted image by newly created link element.
            // 1. Create an empty link element.
            const linkElement = writer.createContainerElement( 'a', { href: data.attributeNewValue } );
            writer.setAttribute( DATA_BLOCK_TYPE, 'link', linkElement );

            // 2. Insert link inside the associated image.
            writer.insert( writer.createPositionAt( viewFigure, 0 ), linkElement );

            // 3. Move the image to the link.
            writer.move( writer.createRangeOn( viewFigure.getChild( 1 ) ), writer.createPositionAt( linkElement, 0 ) );
            evt.stop()
        }
    }, { priority : 'high'} );
}

export default SalesteckLinkImageEditing;
