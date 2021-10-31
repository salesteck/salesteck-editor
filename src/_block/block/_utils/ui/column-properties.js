/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/utils/ui/table-properties
 */

import { isColor, isLength, isPercentage } from 'ckeditor5/src/engine';

export function isEmpty(value){
	return value === '';
}

/**
 * Returns a localized error string that can be displayed next to color (background, border)
 * fields that have an invalid value.
 *
 * @param {@ckEditor5/utils/locale~Locale#t} t The "t" function provided by the editor
 * that is used to localize strings.
 * @returns {String}
 */
export function getLocalizedColorErrorText( t ) {
	return t( 'The color is invalid. Try "#FF0000" or "rgb(255,0,0)" or "red".' );
}
/**
 * Returns a localized error string that can be displayed next to color (background, border)
 * fields that have an invalid value.
 *
 * @param {@ckEditor5/utils/locale~Locale#t} t The "t" function provided by the editor
 * that is used to localize strings.
 * @returns {String}
 */
export function getLocalizedEmptyErrorText( t ) {
	return t( 'The value is empty' );
}

/**
 * Returns a localized error string that can be displayed next to length (padding, border width)
 * fields that have an invalid value.
 *
 * @param {@ckEditor5/utils/locale~Locale#t} t The "t" function provided by the editor
 * that is used to localize strings.
 * @returns {String}
 */
export function getLocalizedLengthErrorText( t ) {
	return t( 'The value is invalid. Try "10px" or "2em" or simply "2".' );
}
function _isRootColor(value){
	return value.startsWith( 'var(' ) && value.endsWith(')');
}
/**
 * Returns `true` when the passed value is an empty string or a valid CSS color expression.
 * Otherwise, `false` is returned.
 *
 * See {@link @ckEditor5/engine/_view/styles/utils~isColor}.
 *
 * @param {String} value
 * @returns {Boolean}
 */
export function colorFieldValidator( value ) {
	return isEmpty( value ) || isColor( value ) || _isRootColor(value);
}

/**
 * Returns `true` when the passed value is an empty string, a number without a unit or a valid CSS length expression.
 * Otherwise, `false` is returned.
 *
 * See {@link @ckEditor5/engine/_view/styles/utils~isLength}.
 * See {@link @ckEditor5/engine/_view/styles/utils~isPercentage}.
 *
 * @param {String} value
 * @returns {Boolean}
 */
export function lengthFieldValidator( value ) {
	return isEmpty( value ) || /*isNumberString( value ) || */ value === "0" ||isLength( value );
}

/**
 * Returns `true` when the passed value is an empty string, a number without a unit or a valid CSS length expression.
 * Otherwise, `false` is returned.
 *
 * See {@link @ckEditor5/engine/_view/styles/utils~isLength}.
 * See {@link @ckEditor5/engine/_view/styles/utils~isPercentage}.
 *
 * @param {String} value
 * @returns {Boolean}
 */
export function lengthFieldValidatorPercent( value ) {

	return lengthFieldValidator( value ) || isPercentage( value );
}

/**
 * Returns `true` when the passed value is an empty string, a number without a unit or a valid CSS length expression.
 * Otherwise, `false` is returned.
 *
 * See {@link @ckEditor5/engine/_view/styles/utils~isLength}.
 *
 * @param {String} value
 * @returns {Boolean}
 */
export function lineWidthFieldValidator( value ) {
	return isEmpty( value ) || isNumberString( value ) || isLength( value );
}


export function backgroundImageFieldValidator(value){
	return isEmpty( value ) || value;
}


/**
 * A default color palette used by various user interfaces related to tables, for instance,
 * by {@link @ckEditor5/table/tablecellproperties/tablecellpropertiesui~TableCellPropertiesUI} or
 * {@link @ckEditor5/table/tableproperties/tablepropertiesui~TablePropertiesUI}.
 *
 * The color palette follows the {@link @ckEditor5/table/table~TableColorConfig table color configuration format}
 * and contains the following color definitions:
 *
 *		const defaultColors = [
 *			{
 *				color: 'hsl(0, 0%, 0%)',
 *				label: 'Black'
 *			},
 *			{
 *				color: 'hsl(0, 0%, 30%)',
 *				label: 'Dim grey'
 *			},
 *			{
 *				color: 'hsl(0, 0%, 60%)',
 *				label: 'Grey'
 *			},
 *			{
 *				color: 'hsl(0, 0%, 90%)',
 *				label: 'Light grey'
 *			},
 *			{
 *				color: 'hsl(0, 0%, 100%)',
 *				label: 'White',
 *				hasBorder: true
 *			},
 *			{
 *				color: 'hsl(0, 75%, 60%)',
 *				label: 'Red'
 *			},
 *			{
 *				color: 'hsl(30, 75%, 60%)',
 *				label: 'Orange'
 *			},
 *			{
 *				color: 'hsl(60, 75%, 60%)',
 *				label: 'Yellow'
 *			},
 *			{
 *				color: 'hsl(90, 75%, 60%)',
 *				label: 'Light green'
 *			},
 *			{
 *				color: 'hsl(120, 75%, 60%)',
 *				label: 'Green'
 *			},
 *			{
 *				color: 'hsl(150, 75%, 60%)',
 *				label: 'Aquamarine'
 *			},
 *			{
 *				color: 'hsl(180, 75%, 60%)',
 *				label: 'Turquoise'
 *			},
 *			{
 *				color: 'hsl(210, 75%, 60%)',
 *				label: 'Light blue'
 *			},
 *			{
 *				color: 'hsl(240, 75%, 60%)',
 *				label: 'Blue'
 *			},
 *			{
 *				color: 'hsl(270, 75%, 60%)',
 *				label: 'Purple'
 *			}
 *		];
 */
export const defaultColors = [
	{
		color: 'hsl(0, 0%, 0%)',
		label: 'Black'
	},
	{
		color: 'hsl(0, 0%, 30%)',
		label: 'Dim grey'
	},
	{
		color: 'hsl(0, 0%, 60%)',
		label: 'Grey'
	},
	{
		color: 'hsl(0, 0%, 90%)',
		label: 'Light grey'
	},
	{
		color: 'hsl(0, 0%, 100%)',
		label: 'White',
		hasBorder: true
	},
	{
		color: 'hsl(0, 75%, 60%)',
		label: 'Red'
	},
	{
		color: 'hsl(30, 75%, 60%)',
		label: 'Orange'
	},
	{
		color: 'hsl(60, 75%, 60%)',
		label: 'Yellow'
	},
	{
		color: 'hsl(90, 75%, 60%)',
		label: 'Light green'
	},
	{
		color: 'hsl(120, 75%, 60%)',
		label: 'Green'
	},
	{
		color: 'hsl(150, 75%, 60%)',
		label: 'Aquamarine'
	},
	{
		color: 'hsl(180, 75%, 60%)',
		label: 'Turquoise'
	},
	{
		color: 'hsl(210, 75%, 60%)',
		label: 'Light blue'
	},
	{
		color: 'hsl(240, 75%, 60%)',
		label: 'Blue'
	},
	{
		color: 'hsl(270, 75%, 60%)',
		label: 'Purple'
	}
];

// A simple helper method to detect number strings.
// I allows full number notation, so omitting 0 is not allowed:
function isNumberString( value ) {
	const parsedValue = parseFloat( value );

	return !Number.isNaN( parsedValue ) && value === String( parsedValue );
}
