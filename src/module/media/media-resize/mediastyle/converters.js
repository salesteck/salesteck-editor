/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// import first from '@ckeditor/ckeditor5-utils/src/first';

import { first } from 'ckeditor5/src/utils';
/**
 * @module image/imagestyle/converters
 */

/**
 * Returns a ckeditor5-converter for the `imageStyle` attribute. It can be used for adding, changing and removing the attribute.
 *
 * @param {Object} styles An object containing available styles. See {@link @ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat}
 * for more details.
 * @returns {Function} A model-to-_view attribute ckeditor5-converter.
 */
export function modelToViewStyleAttribute( styles ) {
	return ( evt, data, conversionApi ) => {
		if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
			return;
		}

		// Check if there is class name associated with given value.
		const newStyle = getStyleByName( data.attributeNewValue, styles );
		const oldStyle = getStyleByName( data.attributeOldValue, styles );

		const viewElement = conversionApi.mapper.toViewElement( data.item );
		const viewWriter = conversionApi.writer;

		if ( oldStyle ) {
			viewWriter.removeClass( oldStyle.className, viewElement );
		}

		if ( newStyle ) {
			viewWriter.addClass( newStyle.className, viewElement );
		}
	};
}

/**
 * Returns a _view-to-model ckeditor5-converter converting image CSS classes to a proper value in the model.
 *
 * @param {Array.<@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat>} styles The styles for which the ckeditor5-converter is created.
 * @returns {Function} A _view-to-model ckeditor5-converter.
 */
export function viewToModelStyleAttribute( styles ) {
	// Convert only non–default styles.
	const filteredStyles = styles.filter( style => !style.isDefault );

	return ( evt, data, conversionApi ) => {
		if ( !data.modelRange ) {
			return;
		}

		const viewFigureElement = data.viewItem;
		const modelImageElement = first( data.modelRange.getItems() );

		// Check if `imageStyle` attribute is allowed for current element.
		if ( !conversionApi.schema.checkAttribute( modelImageElement, 'mediaStyle' ) ) {
			return;
		}

		// Convert style one by one.
		for ( const style of filteredStyles ) {
			// Try to consume class corresponding with style.
			if ( conversionApi.consumable.consume( viewFigureElement, { classes: style.className } ) ) {
				// And convert this style to model attribute.
				conversionApi.writer.setAttribute( 'mediaStyle', style.name, modelImageElement );
			}
		}
	};
}

// Returns the style with a given `name` from an array of styles.
//
// @param {String} name
// @param {Array.<@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat> } styles
// @returns {@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat|undefined}
function getStyleByName( name, styles ) {
	for ( const style of styles ) {
		if ( style.name === name ) {
			return style;
		}
	}
}
