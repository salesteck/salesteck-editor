/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/utils
 */

import { isWidget, toWidget } from 'ckeditor5/src/widget';

/**
 * Converts a given {@link @ckEditor5/engine/_view/element~Element} to a media embed widget:
 * * Adds a {@link @ckEditor5/engine/_view/element~Element#_setCustomProperty custom property} allowing to recognize the media widget element.
 * * Calls the {@link @ckEditor5/widget/utils~toWidget} function with the proper element's label creator.
 *
 * @param {@ckEditor5/engine/_view/element~Element} viewElement
 * @param {@ckEditor5/engine/_view/downcastwriter~DowncastWriter} writer An instance of the _view writer.
 * @param {String} label The element's label.
 * @returns {@ckEditor5/engine/_view/element~Element}
 */
export function toMediaWidget( viewElement, writer, label ) {
	writer.setCustomProperty( 'media', true, viewElement );

	return toWidget( viewElement, writer, { label } );
}

/**
 * Checks if a given _view element is a media widget.
 *
 * @param {@ckEditor5/engine/_view/element~Element} viewElement
 * @returns {Boolean}
 */
export function isMediaWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'media' ) && isWidget( viewElement );
}

/**
 * Creates a _view element representing the media. Either a "semantic" one for the data pipeline:
 *
 *		<figure class="media">
 *			<oembed url="foo"></oembed>
 *		</figure>
 *
 * or a "non-semantic" (for the editing _view pipeline):
 *
 *		<figure class="media">
 *			<div data-oembed-url="foo">[ non-semantic media preview for "foo" ]</div>
 *		</figure>
 *
 * @param {@ckEditor5/engine/_view/downcastwriter~DowncastWriter} writer
 * @param {@ckEditor5/media-embed/mediaregistry~MediaRegistry} registry
 * @param {String} url
 * @param {Object} options
 * @param {String} [options.useSemanticWrapper]
 * @param {String} [options.renderForEditingView]
 * @returns {@ckEditor5/engine/_view/containerelement~ContainerElement}
 */
export function createMediaFigureElement( writer, registry, url, options ) {
	const figure = writer.createContainerElement( 'figure', { class: 'media' } );

	writer.insert( writer.createPositionAt( figure, 0 ), registry.getMediaViewElement( writer, url, options ) );

	return figure;
}

/**
 * Returns a selected media element in the model, if any.
 *
 * @param {@ckEditor5/engine/model/selection~Selection} selection
 * @returns {@ckEditor5/engine/model/element~Element|null}
 */
export function getSelectedMediaModelWidget( selection ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement && selectedElement.is( 'element', 'media' ) ) {
		return selectedElement;
	}

	return null;
}

/**
 * Creates a media element and inserts it into the model.
 *
 * **Note**: This method will use {@link @ckEditor5/engine/model/model~Model#insertContent `model.insertContent()`} logic of inserting content
 * if no `insertPosition` is passed.
 *
 * @param {@ckEditor5/engine/model/model~Model} model
 * @param {String} url An URL of an embeddable media.
 * @param {@ckEditor5/engine/model/position~Position} [insertRange] Position to insert the media. If not specified,
 * the default behavior of {@link @ckEditor5/engine/model/model~Model#insertContent `model.insertContent()`} will
 * be applied.
 */
export function insertMedia( model, url, insertRange ) {
	model.change( writer => {
		const mediaElement = writer.createElement( 'media', { url } );

		model.insertContent( mediaElement, insertRange );

		writer.setSelection( mediaElement, 'on' );
	} );
}
