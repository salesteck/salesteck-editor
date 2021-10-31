/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/mediaresize/mediaresizebuttons
 */


import { Plugin } from 'ckeditor5/src/core';
import { DropdownButtonView, Model, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

import MediaRatioEditing from './media-ratio-editing';
import {_isArray} from "../../../../general";
import AspectRationIcon from './theme/icon/aspect-ratio.svg';



/**
 * The image resize buttons plugin.
 *
 * It adds a possibility to resize images using the toolbar dropdown or individual buttons, depending on the plugin configuration.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class MediaRatioButtons extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ MediaRatioEditing ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SalesteckMediaRatioButtons';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const options = editor.config.get( 'mediaEmbed.ratio.options' );
		const command = editor.commands.get( 'mediaRatio' );

		this.bind( 'isEnabled' ).to( command );
		if(_isArray(options) && options.length){
			this._registerImageResizeDropdown( options );
		}
	}

	/**
	 * A helper function that creates a dropdown component for the plugin containing all the resize options defined in
	 * the editor configuration.
	 *
	 * @private-attribute
	 * @param {Array.<@ckeditor5/image/imageresize/imageresizebuttons~ImageResizeOption>} options An array of configured options.
	 */
	_registerImageResizeDropdown( options ) {
		const editor = this.editor;
		const t = editor.t;
		const originalSizeOption = options.find( option => !option.value );

		// Register dropdown.
		editor.ui.componentFactory.add( 'mediaRatio', locale => {
			const command = editor.commands.get( 'mediaRatio' );
			const dropdownView = createDropdown( locale, DropdownButtonView );
			const dropdownButton = dropdownView.buttonView;

			dropdownButton.set( {
				tooltip: t( 'Media ratio' ),
				commandValue: originalSizeOption.value,
				icon: AspectRationIcon,
				isToggleable: true,
				label: this._getOptionLabelValue( originalSizeOption ),
				withText: true,
				class: 'ck-resize-image-button'
			} );

			dropdownButton.bind( 'label' ).to( command, 'value', commandValue => {
				if ( commandValue && commandValue.ratio ) {

					const selectedOption = options.find( option => option.value === commandValue.ratio );
					// console.log({ commandValue, selectedOption });
					return selectedOption ? selectedOption.label :  '';
				} else {
					return this._getOptionLabelValue( originalSizeOption );
				}
			} );
			dropdownView.bind( 'isOn' ).to( command );
			dropdownView.bind( 'isEnabled' ).to( this );

			addListToDropdown( dropdownView, this._getResizeDropdownListItemDefinitions( options, command ) );

			dropdownView.listView.ariaLabel = t( 'Media ratio list' );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( evt.source.commandName, { ratio: evt.source.commandValue } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	/**
	 * A helper function for creating an option label value string.
	 *
	 * @private-attribute
	 * @param {@ckEditor5/image/imageresize/imageresizebuttons~ImageResizeOption} option A resize option object.
	 * @param {Boolean} [forTooltip] An optional flag for creating a tooltip label.
	 * @returns {String} A user-defined label combined from the numeric value and the resize unit or the default label
	 * for reset options (`Original`).
	 */
	_getOptionLabelValue( option, forTooltip ) {
		const t = this.editor.t;

		if ( option.label ) {
			return option.label;
		} else if ( forTooltip ) {
			if ( option.value ) {
				return t( 'Resize media to %0', option.value );
			} else {
				return t( 'Resize media to the original size' );
			}
		} else {
			if ( option.value ) {
				return option.value;
			} else {
				return t( 'Original' );
			}
		}
	}

	/**
	 * A helper function that parses the resize options and returns list item definitions ready for use in the dropdown.
	 *
	 * @private-attribute
	 * @param {Array.<@ckeditor5/image/imageresize/imageresizebuttons~ImageResizeOption>} options The resize options.
	 * @param {@ckEditor5/image/imageresize/imageresizecommand~ImageResizeCommand} command The resize image command.
	 * @returns {Iterable.<@ckeditor5/ui/dropdown/utils~ListDropdownItemDefinition>} Dropdown item definitions.
	 */
	_getResizeDropdownListItemDefinitions( options, command ) {
		const itemDefinitions = new Collection();

		options.map( option => {
			const definition = {
				type: 'button',
				model: new Model( {
					commandName: 'mediaRatio',
					commandValue: option.value,
					label: this._getOptionLabelValue( option ),
					withText: true,
					icon: null
				} )
			};

			definition.model.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( option.value ) );

			itemDefinitions.add( definition );
		} );

		return itemDefinitions;
	}
}

// A helper function for setting the `isOn` state of buttons in value bindings.
function getIsOnButtonCallback( value ) {
	return commandValue => {
		if ( value === null && commandValue === value ) {
			return true;
		}

		return commandValue && commandValue.ratio === value;
	};
}

/**
 * The image resize option used in the {@link @ckEditor5/image/image~ImageConfig#resizeOptions image resize configuration}.
 *
 * @typedef {Object} @ckeditor5/image/imageresize/imageresizebuttons~ImageResizeOption
 * @property {String} name The name of the UI component that changes the image size.
 * * If you configure the feature using individual resize buttons, you can refer to this name in the
 * {@link @ckEditor5/image/image~ImageConfig#toolbar image toolbar configuration}.
 * * If you configure the feature using the resize dropdown, this name will be used for a list item in the dropdown.
 * @property {String} value The value of the resize option without the unit
 * ({@link @ckEditor5/image/image~ImageConfig#resizeUnit configured separately}). `null` resets an image to its original size.
 * @property {String} [resizeOptions.icon] An icon used by an individual resize button (see the `name` property to learn more).
 * Available icons are: `'small'`, `'medium'`, `'large'`, `'original'`.
 * @property {String} [label] An option label displayed in the dropdown or, if the feature is configured using
 * individual buttons, a {@link @ckEditor5/ui/button/buttonview~ButtonView#tooltip} and an ARIA attribute of a button.
 * If not specified, the label is generated automatically based on the `value` option and the
 * {@link @ckEditor5/image/image~ImageConfig#resizeUnit `config.image.resizeUnit`}.
 */
