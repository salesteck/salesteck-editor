/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/media/utils
 */


import {  isWidget } from 'ckeditor5/src/widget';

/**
 * Checks if a given _view element is an image widget.
 *
 * @param {@ckEditor5/engine/_view/element~Element} viewElement
 * @returns {Boolean}
 */
export function isImageWidget( viewElement ) {
	return !!viewElement.getCustomProperty( 'media' ) && isWidget( viewElement );
}

/**
 * Returns an image widget editing _view element if one is selected.
 *
 * @param {@ckEditor5/engine/_view/selection~Selection|@ckEditor5/engine/_view/documentselection~DocumentSelection} selection
 * @returns {@ckEditor5/engine/_view/element~Element|null}
 */
export function getSelectedImageWidget( selection ) {
	const viewElement = selection.getSelectedElement();

	if ( viewElement && isImageWidget( viewElement ) ) {
		return viewElement;
	}

	return null;
}

/**
 * Checks if the provided model element is an `image`.
 *
 * @param {@ckEditor5/engine/model/element~Element} modelElement
 * @returns {Boolean}
 */
export function isMedia( modelElement ) {
	return !!modelElement && modelElement.is( 'element', 'media' );
}


