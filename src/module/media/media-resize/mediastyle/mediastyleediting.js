/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/mediastyle/mediastyleediting
 */

import { Plugin } from 'ckeditor5/src/core';
import MediaStyleCommand from './mediastylecommand';
import { viewToModelStyleAttribute, modelToViewStyleAttribute } from './converters';
import { normalizeMediaStyles } from './utils';

/**
 * The image style engine plugin. It sets the default configuration, creates converters and registers
 * {@link @ckEditor5/image/imagestyle/imagestylecommand~ImageStyleCommand ImageStyleCommand}.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class MediaStyleEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SalesteckMediaStyleEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const data = editor.data;
		const editing = editor.editing;

		// Define default configuration.
		// editor.config.define( 'media.styles', [ 'full', 'side', 'alignLeft', 'alignCenter', 'alignRight' ] );

		// Get configuration.
		const styles = normalizeMediaStyles( editor.config.get( 'mediaEmbed.styles' ) );

		// Allow imageStyle attribute in image.
		// We could call it 'style' but https://github.com/ckeditor/ckeditor5-engine/issues/559.
		schema.extend( 'media', { allowAttributes: 'mediaStyle' } );

		// Converters for imageStyle attribute from model to _view.
		const modelToViewConverter = modelToViewStyleAttribute( styles );
		editing.downcastDispatcher.on( 'attribute:mediaStyle:media', modelToViewConverter );
		data.downcastDispatcher.on( 'attribute:mediaStyle:media', modelToViewConverter );

		// Converter for figure element from _view to model.
		data.upcastDispatcher.on( 'element:figure', viewToModelStyleAttribute( styles ), { priority: 'low' } );

		// Register imageStyle command.
		editor.commands.add( 'mediaStyle', new MediaStyleCommand( editor, styles ) );
	}
}

/**
 * The image style format descriptor.
 *
 *		import fullSizeIcon from 'path/to/icon.svg';
 *
 *		const imageStyleFormat = {
 *			name: 'fullSize',
 *			icon: fullSizeIcon,
 *			title: 'Full size image',
 *			className: 'image-full-size'
 *		}
 *
 * @typedef {Object} @ckEditor5/media/mediastyle/mediastyleediting~MediaStyleFormat
 *
 * @property {String} name The unique name of the style. It will be used to:
 *
 * * Store the chosen style in the model by setting the `imageStyle` attribute of the `<image>` element.
 * * As a value of the {@link @ckEditor5/image/imagestyle/imagestylecommand~ImageStyleCommand#execute `imageStyle` command},
 * * when registering a button for each of the styles (`'imageStyle:{name}'`) in the
 * {@link @ckEditor5/ui/componentfactory~ComponentFactory UI components factory} (this functionality is provided by the
 * {@link @ckEditor5/image/imagestyle/imagestyleui~ImageStyleUI} plugin).
 *
 * @property {Boolean} [isDefault] When set, the style will be used as the default one.
 * A default style does not apply any CSS class to the _view element.
 *
 * @property {String} icon One of the following to be used when creating the style's button:
 *
 * * An SVG icon source (as an XML string).
 * * One of {@link @ckEditor5/media/mediastyle/utils~defaultIcons} to use a default icon provided by the plugin.
 *
 * @property {String} title The style's title.
 *
 * @property {String} className The CSS class used to represent the style in the _view.
 */
