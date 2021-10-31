/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/mediastyle/mediastyleui
 */

// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import BsButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// import { normalizeMediaStyles } from './utils';



import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import { normalizeMediaStyles } from './utils';


// import '../../theme/imagestyle.css';

/**
 * The image style UI plugin.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class MediaStyleUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SalesteckMediaStyleUI';
	}

	/**
	 * Returns the default localized style titles provided by the plugin.
	 *
	 * The following localized titles corresponding with
	 * {@link @ckEditor5/media/mediastyle/utils~defaultStyle} are available:
	 *
	 * * `'Full size image'`,
	 * * `'Side image'`,
	 * * `'Left aligned image'`,
	 * * `'Centered image'`,
	 * * `'Right aligned image'`
	 *
	 * @returns {Object.<String,String>}
	 */
	get localizedDefaultStylesTitles() {
		const t = this.editor.t;

		return {
			'Full size image': t( 'Full size image' ),
			'Side image': t( 'Side image' ),
			'Left aligned image': t( 'Left aligned image' ),
			'Centered image': t( 'Centered image' ),
			'Right aligned image': t( 'Right aligned image' )
		};
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const configuredStyles = editor.config.get( 'mediaEmbed.styles' );

		const translatedStyles = translateStyles( normalizeMediaStyles( configuredStyles ), this.localizedDefaultStylesTitles );

		for ( const style of translatedStyles ) {
			this._createButton( style );
		}
	}

	/**
	 * Creates a button for each style and stores it in the editor {@link @ckEditor5/ui/componentfactory~ComponentFactory ComponentFactory}.
	 *
	 * @private-attribute
	 * @param {@ckEditor5/media/mediastyle/mediastyleediting~MediaStyleFormat} style
	 */
	_createButton( style ) {
		const editor = this.editor;
		const componentName = `mediaStyle:${ style.name }`;

		editor.ui.componentFactory.add( componentName, locale => {
			const command = editor.commands.get( 'mediaStyle' );
			const view = new ButtonView( locale );

			view.set( {
				label: style.title,
				icon: style.icon,
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			view.bind( 'isOn' ).to( command, 'value', value => value === style.name );

			this.listenTo( view, 'execute', () => {
				editor.execute( 'mediaStyle', { value: style.name } );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}

/**
 * Returns the translated `title` from the passed styles array.
 *
 * @param {Array.<@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat>} styles
 * @param titles
 * @returns {Array.<@ckEditor5/image/imagestyle/imagestyleediting~ImageStyleFormat>}
 */
function translateStyles( styles, titles ) {
	for ( const style of styles ) {
		// Localize the titles of the styles, if a title corresponds with
		// a localized default provided by the plugin.
		if ( titles[ style.title ] ) {
			style.title = titles[ style.title ];
		}
	}

	return styles;
}
