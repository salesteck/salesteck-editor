import "./theme/style.css";
import { VIEW_ATTR, VIEW_CLASS} from "../../const";
import { Plugin } from 'ckeditor5/src/core';
import {
    _upcastBlockType,
    _upcastViewAttr,
    _upcastViewClass,
    _upcastViewName,
} from "../../engine/utils/converter/upcast";
import {
    determineImageTypeForInsertionAtSelection,
    getImgViewElementMatcher
} from "@ckeditor/ckeditor5-image/src/image/utils";
import {_isJsonString} from "../../general";
import {LivePosition, LiveRange, UpcastWriter} from "ckeditor5/src/engine";
import SalesteckClipboardPipeline from "../drag-drop/src/salesteck-clipboardpipeline";
import {global} from "ckeditor5/src/utils";
import {createImageTypeRegExp, fetchLocalImage, isLocalImage} from "@ckeditor/ckeditor5-image/src/imageupload/utils";
import {isHtmlIncluded} from "@ckeditor/ckeditor5-image/src/imageupload/imageuploadediting";
import {FileRepository} from "ckeditor5/src/upload";

// Implements the pattern: http(s)://(www.)example.com/path/to/resource.ext?query=params&maybe=too.
const IMAGE_URL_REGEXP = new RegExp( String( /^(http(s)?:\/\/)?[\w-]+\.[\w.~:/[\]@!$&'()*+,;=%-]+/.source +
    /\.(jpg|jpeg|png|gif|ico|webp|JPG|JPEG|PNG|GIF|ICO|WEBP)/.source +
    /(\?[\w.~:/[\]@!$&'()*+,;=%-]*)?/.source +
    /(#[\w.~:/[\]@!$&'()*+,;=%-]*)?$/.source ) );
export default class ImageCustom extends Plugin{
    static get pluginName(){
        return 'ImageCustom'
    }

    afterInit() {
        const modelName = 'imageBlock';
        const model = this.editor.model;
        const conversion =  this.editor.conversion;
        model.schema.extend(
            modelName,
            {
                // allowIn: [BlocksEditing.contentModelName],
                // allowWhere: '$block',
                allowAttributes: [VIEW_CLASS, VIEW_ATTR]
            }
        );
        model.schema.extend(
            'imageInline', {
                // allowIn: [BlocksEditing.contentModelName],
                // allowWhere: '$block',
                allowAttributes: [VIEW_CLASS, VIEW_ATTR]
            }
        );

        conversion.for('upcast').add( dispatcher =>
            dispatcher.on(`element:figure`, (evt, data, conversionApi) => {
                const viewElement = data.viewItem;
                const modelRange = data.modelRange;

                let modelElement = modelRange && modelRange.start.nodeAfter;

                if (!modelElement) {
                    return;
                }
                modelElement = _upcastViewAttr(conversionApi.writer, modelElement, viewElement);

                modelElement = _upcastViewName(conversionApi.writer, modelElement, viewElement);

                modelElement = _upcastViewClass(conversionApi.writer, modelElement, viewElement);
                // console.log(`${evt.name}`, {arguments, modelElement});

                return modelElement;

            }),
            {priority: 'low'}
        );


        conversion.for('upcast').elementToElement({
            view: getImgViewElementMatcher(this.editor, 'imageInline'),
            model: (viewElement, {writer: modelWriter}) => {
                let modelElement = modelWriter.createElement('imageInline',  { src: viewElement.getAttribute( 'src' ) });

                modelElement = _upcastViewClass(modelWriter, modelElement, viewElement);

                modelElement = _upcastBlockType(modelWriter, modelElement, viewElement);
                let attributes = Object.fromEntries(viewElement.getAttributes());
                delete attributes.class; delete attributes.style;
                delete attributes.src; delete attributes.alt;
                modelWriter.setAttribute(VIEW_ATTR, JSON.stringify(attributes), modelElement);


                // modelElement = _upcastChildCount(modelWriter, modelElement, viewDefinition);

                // console.log('_upcastElement', {viewElement, modelElement});
                return modelElement;
            }, converterPriority : 'high'
        });
        conversion.for('dataDowncast').add(dispatcher => {

            dispatcher.on( 'attribute:linkHref:imageInline', ( evt, data, { writer, consumable, mapper } ) => {
                // Recreate current wrapping node. It will be used to unwrap view range if the attribute value has changed
                // or the attribute was removed.
                const modelElement = data.item;
                const oldViewElement = writer.createAttributeElement( 'a', { href :data.attributeOldValue } );

                // Create node to wrap with.
                const newViewElement = writer.createAttributeElement( 'a', { href :data.attributeNewValue } );

                let allAttr;
                if(modelElement.hasAttribute(VIEW_ATTR)){
                    allAttr = modelElement.getAttribute(VIEW_ATTR);
                    if (_isJsonString(allAttr)) {
                        allAttr = JSON.parse(allAttr);

                        Object.entries(allAttr).map(([attrKey, attrVal]) => {
                            writer.setAttribute(attrKey, attrVal, newViewElement);
                        })

                    }
                }
                // Create node to wrap with.
                if ( !consumable.consume( modelElement, evt.name ) ) {
                    return;
                }
                // let imageInline = mapper.toViewElement(modelElement);
                // console.log(evt.name, { newViewElement, href: data.attributeNewValue, modelElement, imageInline, allAttr })
                // Node attribute conversion.
                let viewRange = mapper.toViewRange( data.range );

                // First, unwrap the range from current wrapper.
                if ( data.attributeOldValue !== null && oldViewElement ) {
                    viewRange = writer.unwrap( viewRange, oldViewElement );
                }

                if ( data.attributeNewValue !== null && newViewElement ) {
                    writer.wrap( viewRange, newViewElement );
                }
                evt.stop()
            }, {priority : 'highest'});
            // dispatcher.on( 'attribute:linkHref:imageInline', ( evt, data, { writer, consumable, mapper } ) => {
            //     if ( !consumable.consume( data.item, evt.name ) ) {
            //         return;
            //     }
            //     let imageInline = mapper.toViewElement(data.item);
            //
            //     const model = data.item;
            //     // Priority 5 - https://github.com/ckeditor/ckeditor5-link/issues/121.
            //     const href = data.attributeNewValue;
            //     const linkElement = writer.createAttributeElement( 'a', { href } );
            //     writer.setCustomProperty( 'link', true, linkElement );
            //     writer.setAttribute( DATA_BLOCK_TYPE, 'link', linkElement );
            //     console.log({
            //         linkElement, href, model, imageInline
            //     })
            //     writer.insert(writer.createPositionAt( linkElement, 0 ), imageInline);
            //     evt.stop()
            //     return linkElement;
            // }, {priority : 'highest'} );
            // dispatcher.on( 'attribute:linkHref:imageInline', ( evt, data, {writer : viewWriter, mapper} ) => {
            //     const model = data.item;
            //     let blockView = mapper.toViewElement(model);
            //     const viewLink = data.viewItem;
            //     console.log(`_dataDowncastElement:${data.item.name}`, {modelElement : data.item, blockView});
            // });
        });



        if ( this.editor.plugins.has( 'ImageInlineEditing' ) ) {
            this._imageInlineSetup();
        }

        if ( this.editor.plugins.has( 'ImageBlockEditing' ) ) {
            this._imageBlockSetup();
        }

        if ( this.editor.plugins.has( 'AutoImage' ) ) {
            this._autoImageSetup();
        }

        if ( this.editor.plugins.has( 'ImageUploadEditing' ) ) {
            this._imageUploadSetup();
        }
    }
    _imageUploadSetup(){


        const editor = this.editor;
        const fileRepository = editor.plugins.get( FileRepository );
        const imageUtils = editor.plugins.get( 'ImageUtils' );
        const imageTypes = createImageTypeRegExp( editor.config.get( 'image.upload.types' ) );
        // Handle pasted images.
        // For every image file, a new file loader is created and a placeholder image is
        // inserted into the content. Then, those images are uploaded once they appear in the model
        // (see Document#change listener below).
        this.listenTo( editor.editing.view.document, 'salesteckClipboardInput', ( evt, data ) => {
            // Skip if non empty HTML data is included.
            // https://github.com/ckeditor/ckeditor5-upload/issues/68
            if ( isHtmlIncluded( data.dataTransfer ) ) {
                return;
            }

            const images = Array.from( data.dataTransfer.files ).filter( file => {
                // See https://github.com/ckeditor/ckeditor5-image/pull/254.
                if ( !file ) {
                    return false;
                }

                return imageTypes.test( file.type );
            } );

            if ( !images.length ) {
                return;
            }

            evt.stop();

            editor.model.change( writer => {
                // Set selection to paste target.
                if ( data.targetRanges ) {
                    writer.setSelection( data.targetRanges.map( viewRange => editor.editing.mapper.toModelRange( viewRange ) ) );
                }

                // Upload images after the selection has changed in order to ensure the command's state is refreshed.
                editor.model.enqueueChange( 'default', () => {
                    editor.execute( 'uploadImage', { file: images } );
                } );
            } );
        } );

        // Handle HTML pasted with images with base64 or blob sources.
        // For every image file, a new file loader is created and a placeholder image is
        // inserted into the content. Then, those images are uploaded once they appear in the model
        // (see Document#change listener below).
        this.listenTo( editor.plugins.get( SalesteckClipboardPipeline.pluginName ), 'salesteckInputTransformation', ( evt, data ) => {
            const fetchableImages = Array.from( editor.editing.view.createRangeIn( data.content ) )
                .filter( value => isLocalImage( imageUtils, value.item ) && !value.item.getAttribute( 'uploadProcessed' ) )
                .map( value => { return { promise: fetchLocalImage( value.item ), imageElement: value.item }; } );

            if ( !fetchableImages.length ) {
                return;
            }

            const writer = new UpcastWriter( editor.editing.view.document );

            for ( const fetchableImage of fetchableImages ) {
                // Set attribute marking that the image was processed already.
                writer.setAttribute( 'uploadProcessed', true, fetchableImage.imageElement );

                const loader = fileRepository.createLoader( fetchableImage.promise );

                if ( loader ) {
                    writer.setAttribute( 'src', '', fetchableImage.imageElement );
                    writer.setAttribute( 'uploadId', loader.id, fetchableImage.imageElement );
                }
            }
        } );

        // Prevents from the browser redirecting to the dropped image.
        editor.editing.view.document.on( 'dragover', ( evt, data ) => {
            data.preventDefault();
        } );
    }
    _imageInlineSetup(){
        const editor = this.editor;
        const model = editor.model;
        const editingView = editor.editing.view;
        const imageUtils = editor.plugins.get( 'ImageUtils' );

        this.listenTo( editor.plugins.get( SalesteckClipboardPipeline.pluginName ), 'salesteckInputTransformation', ( evt, data ) => {
            const docFragmentChildren = Array.from( data.content.getChildren() );
            let modelRange;

            // Make sure only <figure class="image"></figure> elements are dropped or pasted. Otherwise, if there some other HTML
            // mixed up, this should be handled as a regular paste.
            if ( !docFragmentChildren.every( imageUtils.isBlockImageView ) ) {
                return;
            }

            // When drag and dropping, data.targetRanges specifies where to drop because
            // this is usually a different place than the current model selection (the user
            // uses a drop marker to specify the drop location).
            if ( data.targetRanges ) {
                modelRange = editor.editing.mapper.toModelRange( data.targetRanges[ 0 ] );
            }
            // Pasting, however, always occurs at the current model selection.
            else {
                modelRange = model.document.selection.getFirstRange();
            }

            const selection = model.createSelection( modelRange );

            // Convert block images into inline images only when pasting or dropping into non-empty blocks
            // and when the block is not an object (e.g. pasting to replace another widget).
            if ( determineImageTypeForInsertionAtSelection( model.schema, selection ) === 'imageInline' ) {
                const writer = new UpcastWriter( editingView.document );

                // Unwrap <figure class="image"><img .../></figure> -> <img ... />
                // but <figure class="image"><img .../><figcaption>...</figcaption></figure> -> stays the same
                const inlineViewImages = docFragmentChildren.map( blockViewImage => {
                    // If there's just one child, it can be either <img /> or <a><img></a>.
                    // If there are other children than <img>, this means that the block image
                    // has a caption or some other features and this kind of image should be
                    // pasted/dropped without modifications.
                    if ( blockViewImage.childCount === 1 ) {
                        // Pass the attributes which are present only in the <figure> to the <img>
                        // (e.g. the style="width:10%" attribute applied by the ImageResize plugin).
                        Array.from( blockViewImage.getAttributes() )
                            .forEach( attribute => writer.setAttribute(
                                ...attribute,
                                imageUtils.findViewImgElement( blockViewImage )
                            ) );

                        return blockViewImage.getChild( 0 );
                    } else {
                        return blockViewImage;
                    }
                } );

                data.content = writer.createDocumentFragment( inlineViewImages );
            }
        } );
    }
    _imageBlockSetup(){
        const editor = this.editor;
        const model = editor.model;
        const editingView = editor.editing.view;
        const imageUtils = editor.plugins.get( 'ImageUtils' );

        this.listenTo( editor.plugins.get( SalesteckClipboardPipeline.pluginName ), 'salesteckInputTransformation', ( evt, data ) => {
            const docFragmentChildren = Array.from( data.content.getChildren() );
            let modelRange;

            // Make sure only <img> elements are dropped or pasted. Otherwise, if there some other HTML
            // mixed up, this should be handled as a regular paste.
            if ( !docFragmentChildren.every( imageUtils.isInlineImageView ) ) {
                return;
            }

            // When drag and dropping, data.targetRanges specifies where to drop because
            // this is usually a different place than the current model selection (the user
            // uses a drop marker to specify the drop location).
            if ( data.targetRanges ) {
                modelRange = editor.editing.mapper.toModelRange( data.targetRanges[ 0 ] );
            }
            // Pasting, however, always occurs at the current model selection.
            else {
                modelRange = model.document.selection.getFirstRange();
            }

            const selection = model.createSelection( modelRange );

            // Convert inline images into block images only when the currently selected block is empty
            // (e.g. an empty paragraph) or some object is selected (to replace it).
            if ( determineImageTypeForInsertionAtSelection( model.schema, selection ) === 'imageBlock' ) {
                const writer = new UpcastWriter( editingView.document );

                // Wrap <img ... /> -> <figure class="image"><img .../></figure>
                const blockViewImages = docFragmentChildren.map(
                    inlineViewImage => writer.createElement( 'figure', { class: 'image' }, inlineViewImage )
                );

                data.content = writer.createDocumentFragment( blockViewImages );
            }
        } );
    }

    _autoImageSetup(){

        const editor = this.editor;
        const modelDocument = editor.model.document;
        // We need to listen on `Clipboard#inputTransformation` because we need to save positions of selection.
        // After pasting, the content between those positions will be checked for a URL that could be transformed
        // into an image.
        this.listenTo( editor.plugins.get( SalesteckClipboardPipeline.pluginName ), 'salesteckInputTransformation', () => {
            const firstRange = modelDocument.selection.getFirstRange();

            const leftLivePosition = LivePosition.fromPosition( firstRange.start );
            leftLivePosition.stickiness = 'toPrevious';

            const rightLivePosition = LivePosition.fromPosition( firstRange.end );
            rightLivePosition.stickiness = 'toNext';

            modelDocument.once( 'change:data', () => {
                this._embedImageBetweenPositions( leftLivePosition, rightLivePosition );

                leftLivePosition.detach();
                rightLivePosition.detach();
            }, { priority: 'high' } );
        } );

        editor.commands.get( 'undo' ).on( 'execute', () => {
            if ( this._timeoutId ) {
                global.window.clearTimeout( this._timeoutId );
                this._positionToInsert.detach();

                this._timeoutId = null;
                this._positionToInsert = null;
            }
        }, { priority: 'high' } );
    }

    /**
     * Analyzes the part of the document between provided positions in search for a URL representing an image.
     * When the URL is found, it is automatically converted into an image.
     *
     * @protected
     * @param {@ckeditor5/engine/model/liveposition~LivePosition} leftPosition Left position of the selection.
     * @param {@ckeditor5/engine/model/liveposition~LivePosition} rightPosition Right position of the selection.
     */
    _embedImageBetweenPositions( leftPosition, rightPosition ) {
        const editor = this.editor;
        // TODO: Use a marker instead of LiveRange & LivePositions.
        const urlRange = new LiveRange( leftPosition, rightPosition );
        const walker = urlRange.getWalker( { ignoreElementEnd: true } );
        const selectionAttributes = Object.fromEntries( editor.model.document.selection.getAttributes() );
        const imageUtils = this.editor.plugins.get( 'ImageUtils' );

        let src = '';

        for ( const node of walker ) {
            if ( node.item.is( '$textProxy' ) ) {
                src += node.item.data;
            }
        }

        src = src.trim();

        // If the URL does not match the image URL regexp, let's skip that.
        if ( !src.match( IMAGE_URL_REGEXP ) ) {
            urlRange.detach();

            return;
        }

        // Position will not be available in the `setTimeout` function so let's clone it.
        this._positionToInsert = LivePosition.fromPosition( leftPosition );

        // This action mustn't be executed if undo was called between pasting and auto-embedding.
        this._timeoutId = global.window.setTimeout( () => {
            // Do nothing if image element cannot be inserted at the current position.
            // See https://github.com/ckeditor/ckeditor5/issues/2763.
            // Condition must be checked after timeout - pasting may take place on an element, replacing it. The final position matters.
            const imageCommand = editor.commands.get( 'insertImage' );

            if ( !imageCommand.isEnabled ) {
                urlRange.detach();

                return;
            }

            editor.model.change( writer => {
                this._timeoutId = null;

                writer.remove( urlRange );
                urlRange.detach();

                let insertionPosition;

                // Check if the position where the element should be inserted is still valid.
                // Otherwise leave it as undefined to use the logic of insertImage().
                if ( this._positionToInsert.root.rootName !== '$graveyard' ) {
                    insertionPosition = this._positionToInsert.toPosition();
                }

                imageUtils.insertImage( { ...selectionAttributes, src }, insertionPosition );

                this._positionToInsert.detach();
                this._positionToInsert = null;
            } );
        }, 100 );
    }
}
