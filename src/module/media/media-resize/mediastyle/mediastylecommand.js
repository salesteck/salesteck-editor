/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imagestyle/imagestylecommand
 */

// import Command from '@ckeditor/ckeditor5-core/src/command';
// import { isMedia } from '../media/utils';

import { Command } from 'ckeditor5/src/core';
import { isMedia } from '../media/utils';

/**
 * The image style command. It is used to apply different image styles.
 *
 * @extends @ckEditor5/core/command~Command
 */
export default class MediaStyleCommand extends Command {
	/**
	 * Creates an instance of the image style command. Each command instance is handling one style.
	 *
	 * @param {@ckEditor5/core/editor/editor~Editor} editor The editor instance.
	 * @param {Array.<module:image/imagestyle/imagestyleediting~ImageStyleFormat>} styles The styles that this command supports.
	 */
	constructor( editor, styles ) {
		super( editor );

		/**
		 * The name of the default style, if it is present. If there is no default style, it defaults to `false`.
		 *
		 * @readonly
		 * @type {Boolean|String}
		 */
		this.defaultStyle = false;

		/**
		 * A style handled by this command.
		 *
		 * @readonly
		 * @member {Array.<module:image/imagestyle/imagestyleediting~ImageStyleFormat>} #styles
		 */
		this.styles = styles.reduce( ( styles, style ) => {
			styles[ style.name ] = style;

			if ( style.isDefault ) {
				this.defaultStyle = style.name;
			}

			return styles;
		}, {} );
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		this.isEnabled = isMedia( element );

		if ( !element ) {
			this.value = false;
		} else if ( element.hasAttribute( 'mediaStyle' ) ) {
			const attributeValue = element.getAttribute( 'mediaStyle' );
			this.value = this.styles[ attributeValue ] ? attributeValue : false;
		} else {
			this.value = this.defaultStyle;
		}
	}

	/**
	 * Executes the command.
	 *
	 *		editor.execute( 'imageStyle', { value: 'side' } );
	 *
	 * @param {Object} options
	 * @param {String} options.value The name of the style (based on the
	 * {@link @ckEditor5/image/image~ImageConfig#styles `image.styles`} configuration option).
	 * @fires execute
	 */
	execute( options ) {
		const styleName = options.value;

		const model = this.editor.model;
		const imageElement = model.document.selection.getSelectedElement();

		model.change( writer => {
			// Default style means that there is no `imageStyle` attribute in the model.
			// https://github.com/ckeditor/ckeditor5-image/issues/147
			if ( this.styles[ styleName ].isDefault ) {
				writer.removeAttribute( 'mediaStyle', imageElement );
			} else {
				writer.setAttribute( 'mediaStyle', styleName, imageElement );
			}
		} );
	}
}
