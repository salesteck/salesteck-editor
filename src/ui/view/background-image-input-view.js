/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/ui/colorinputview
 */

import { View, InputTextView, ButtonView} from 'ckeditor5/src/ui';
import browseFilesIcon from '../../theme/icon/browse-files.svg';
import {_isStrNotEmpty} from "../../general";

/**
 * The color input _view class. It allows the user to type in a color (hex, rgb, etc.)
 * or choose it from the configurable color palette with a preview.
 *
 * @private-attribute
 * @extends @ckEditor5/ui/_view~View
 */
export default class BackgroundImageInputView extends View {
	/**
	 * Creates an instance of the color input _view.
	 *
	 * @param {@ckEditor5/utils/locale~Locale} locale The locale instance.
	 * @param {Object} options The input options.
	 * @param {@ckEditor5/ui/colorgrid/colorgrid~ColorDefinition} options.colorDefinitions The colors to be displayed
	 * in the palette inside the input's dropdown.
	 * @param {Number} options.modelName The number of columns in which the colors will be displayed.
	 */
	constructor( locale, options ) {
		super( locale );
		// this.commandName = options.commandName || null;

		const bind = this.bindTemplate;
		this.modelName = options.modelName;
		/**
		 * The value of the input.
		 *
		 * @observable
		 * @member {String} #value
		 * @default ''
		 */
		this.set( 'value', '' );

		/**
		 * The `id` attribute of the input (i.e. to pair with the `<label>` element).
		 *
		 * @observable
		 * @member {String} #id
		 */
		this.set( 'id' );

		/**
		 * Controls whether the input _view is in read-only mode.
		 *
		 * @observable
		 * @member {Boolean} #isReadOnly
		 * @default false
		 */
		this.set( 'isReadOnly', false );

		/**
		 * Set to `true` when the field has some error. Usually controlled via
		 * {@link @ckEditor5/ui/labeledinput/labeledinputview~LabeledInputView#errorText}.
		 *
		 * @observable
		 * @member {Boolean} #hasError
		 * @default false
		 */
		this.set( 'hasError', false );

		/**
		 * An observable flag set to `true` when the input is focused by the user.
		 * `false` otherwise.
		 *
		 * @readonly
		 * @observable
		 * @member {Boolean} #isFocused
		 * @default false
		 */
		this.set( 'isFocused', false );

		/**
		 * An observable flag set to `true` when the input contains no text.
		 *
		 * @readonly
		 * @observable
		 * @member {Boolean} #isEmpty
		 * @default true
		 */
		this.set( 'isEmpty', true );

		/**
		 * The `id` of the element describing this field. When the field has
		 * some error, it helps screen readers read the error text.
		 *
		 * @observable
		 * @member {Boolean} #ariaDescribedById
		 */
		this.set( 'ariaDescribedById' );


		/**
		 * An instance of the input allowing the user to type a color value.
		 *
		 * @protected
		 * @member {@ckEditor5/ui/inputtext/inputtextview~InputTextView}
		 */
		this._inputView = this._createInputTextView( locale );

		this._ckFinderButton = this._createCkFinderButton(locale);

		/**
		 * The flag that indicates whether the user is still typing.
		 * If set to true, it means that the text input field ({@link #_inputView}) still has the focus.
		 * So, we should interrupt the user by replacing the input's value.
		 *
		 * @protected
		 * @member {Boolean}
		 */
		this._stillTyping = false;

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'ck-input-color',
					bind.if( 'hasError', 'ck-error' )
				],
				id: bind.to( 'id' ),
				'aria-invalid': bind.if( 'hasError', true ),
				'aria-describedby': bind.to( 'ariaDescribedById' )
			},
			children: [
				this._ckFinderButton,
				this._inputView
			]
		} );

		this.on( 'change:value', ( evt, name, inputValue ) => this._setInputValue( inputValue ) );
	}

	/**
	 * Focuses the input.
	 */
	focus() {
		this._inputView.focus();
	}


	/**
	 * Creates and configures an instance of {@link @ckEditor5/ui/inputtext/inputtextview~InputTextView}.
	 *
	 * @private-attribute
	 * @returns {@ckEditor5/ui/inputtext/inputtextview~InputTextView} A configured instance to be set as {@link #_inputView}.
	 */
	_createInputTextView() {
		const locale = this.locale;
		const inputView = new InputTextView( locale );

		inputView.extendTemplate( {
			on: {
				blur: inputView.bindTemplate.to( 'blur' )
			}
		} );

		inputView.value = this.value;
		inputView.bind( 'isReadOnly', 'hasError' ).to( this );
		this.bind( 'isFocused', 'isEmpty' ).to( inputView );

		inputView.on( 'input', () => {
			this._stillTyping = true;
			this.value = inputView.element.value;
		} );

		inputView.on( 'blur', () => {
			this._stillTyping = false;
			this._setInputValue( inputView.element.value );
		} );

		inputView.delegate( 'input' ).to( this );

		return inputView;
	}
	/**
	 * Creates and configures an instance of {@link @ckEditor5/ui/inputtext/inputtextview~InputTextView}.
	 *
	 * @private-attribute
	 * @returns {@ckEditor5/ui/inputtext/inputtextview~InputTextView} A configured instance to be set as {@link #_inputView}.
	 */
	_createCkFinderButton() {
		const locale = this.locale;

		const ckFinderButton = new ButtonView( locale );

		ckFinderButton.set( {
			label: locale.t( 'Insert image or file' ),
			icon: browseFilesIcon,
			tooltip: true
		} );
		ckFinderButton.extendTemplate({

			attributes: {
				class: [
					'ck',
					'ck-finder-button'
				]
			}
		});

		// ckFinderButton.bind( 'isEnabled' ).to( command );

		// ckFinderButton.on( 'execute', () => {
		// 	// editor.execute( 'ckfinder' );
		// 	console.log('ckFinderButton#execute')
		// 	// editor.editing._view.focus();
		// } );


		ckFinderButton.delegate( 'execute' ).to( this );
		return ckFinderButton;
	}

	/**
	 * Sets {@link #_inputView}'s value property to the color value or color label,
	 * if there is one and the user is not typing.
	 *
	 * Handles cases like:
	 *
	 * * Someone picks the color in the grid.
	 * * The color is set from the plugin level.
	 *
	 * @private-attribute
	 * @param {String} inputValue Color value to be set.
	 */
	_setInputValue( inputValue ) {
		// console.log("_setInputValue", {inputValue});
		if ( !this._stillTyping ) {
			inputValue = cleanImageUrlForInput( inputValue );
			this._inputView.value = inputValue || '';
		}
	}
}
// Normalizes color value, by stripping extensive whitespace.
// For example., transforms:
// * `   rgb(  25 50    0 )` to `rgb(25 50 0)`,
// * "\t  rgb(  25 ,  50,0 )		" to `rgb(25 50 0)`.
//
// @param {String} colorString The value to be normalized.
// @returns {String}
export function cleanImageUrlForInput( value ) {
	return _isStrNotEmpty(value) ?  value.replace(/url\(/g, '').replace(/\)/g, '').replace(/'/g, '').replace(/"/g, '') : '';
}
