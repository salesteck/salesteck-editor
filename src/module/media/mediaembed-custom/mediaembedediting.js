/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/mediaembedediting
 */

import { Plugin } from 'ckeditor5/src/core';

import { modelToViewUrlAttributeConverter } from './converters';
import MediaEmbedCommand from './mediaembedcommand';
import MediaRegistry from './mediaregistry';
import { toMediaWidget, createMediaFigureElement } from './utils';

import './theme/mediaembedediting.css';
import {ALLOWED_ATTR} from "../../../_block/block/blocks-editing";
import {
	_upcastBlockType,
	_upcastViewAttr,
	_upcastViewClass,
	_upcastViewName
} from "../../../engine/utils/converter/upcast";
import {_enableBlockEditing, _enableIdAttr, _setBlockName} from "../../../engine/utils/view";
import {_enableCustomAttribute} from "../../inline/element/inline-element-editing";

/**
 * The media embed editing feature.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class MediaEmbedEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SalesteckMediaEmbedEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'mediaEmbed', {
			providers: [
				{
					name: 'dailymotion',
					url: /^dailymotion\.com\/video\/(\w+)/,
					html: match => {
						const id = match[ 1 ];

						return (
								`<iframe src="https://www.dailymotion.com/embed/video/${ id }" ` +
									'style="width: 100%; height: 100%;" ' +
									'width="480" height="270" allowfullscreen allow="autoplay">' +
								'</iframe>'
						);

						// return (
						// 	'<div style="position: relative; height: 0; ">' +
						// 		`<iframe src="https://www.dailymotion.com/embed/video/${ id }" ` +
						// 			'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						// 			'width="480" height="270" allowfullscreen allow="autoplay">' +
						// 		'</iframe>' +
						// 	'</div>'
						// );
					}
				},

				{
					name: 'spotify',
					url: [
						/^open\.spotify\.com\/(artist\/\w+)/,
						/^open\.spotify\.com\/(album\/\w+)/,
						/^open\.spotify\.com\/(track\/\w+)/
					],
					html: match => {
						const id = match[ 1 ];

						return (
								`<iframe src="https://open.spotify.com/embed/${ id }" ` +
									'style="width: 100%; height: 100%;" ' +
									'allowtransparency="true" allow="encrypted-media">' +
								'</iframe>'
						);
						// return (
						// 	'<div style="position: relative; height: 0; padding-bottom: 126%;">' +
						// 		`<iframe src="https://open.spotify.com/embed/${ id }" ` +
						// 			'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						// 			'allowtransparency="true" allow="encrypted-media">' +
						// 		'</iframe>' +
						// 	'</div>'
						// );
					}
				},

				{
					name: 'youtube',
					url: [
						/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
						/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
						/^youtube\.com\/embed\/([\w-]+)/,
						/^youtu\.be\/([\w-]+)/
					],
					html: match => {
						const id = match[ 1 ];

						return (
								`<iframe src="https://www.youtube.com/embed/${ id }" ` +
									'style="width: 100%; height: 100%;" ' +
									'allow="autoplay; encrypted-media" allowfullscreen>' +
								'</iframe>'
						);
						// return (
						// 	'<div style="position: relative; height: 0; padding-bottom: 56.2493%;">' +
						// 		`<iframe src="https://www.youtube.com/embed/${ id }" ` +
						// 			'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						// 			'allow="autoplay; encrypted-media" allowfullscreen>' +
						// 		'</iframe>' +
						// 	'</div>'
						// );
					}
				},

				{
					name: 'vimeo',
					url: [
						/^vimeo\.com\/(\d+)/,
						/^vimeo\.com\/[^/]+\/[^/]+\/video\/(\d+)/,
						/^vimeo\.com\/album\/[^/]+\/video\/(\d+)/,
						/^vimeo\.com\/channels\/[^/]+\/(\d+)/,
						/^vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
						/^vimeo\.com\/ondemand\/[^/]+\/(\d+)/,
						/^player\.vimeo\.com\/video\/(\d+)/
					],
					html: match => {
						const id = match[ 1 ];
						return (
							`<iframe src="https://player.vimeo.com/video/${ id }" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" allowfullscreen></iframe>`
						);

						// return (
						// 	'<div style="position: relative; height: 0; padding-bottom: 56.2493%;">' +
						// 		`<iframe src="https://player.vimeo.com/video/${ id }" ` +
						// 			'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						// 			'webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
						// 		'</iframe>' +
						// 	'</div>'
						// );
					}
				},

				{
					name: 'instagram',
					url: /^instagram\.com\/p\/(\w+)/
				},
				{
					name: 'twitter',
					url: /^twitter\.com/,
					html: match => {
						const id = match[ 1 ];
						return (
							`<iframe src="https://${ match.input }"  ` +
							'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
							'allowfullscreen>' +
							'</iframe>'
						);

						// return (
						// 	'<div style="position: relative; height: 0; padding-bottom: 56.2493%;">' +
						// 		`<iframe src="https://player.vimeo.com/video/${ id }" ` +
						// 			'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						// 			'webkitallowfullscreen mozallowfullscreen allowfullscreen>' +
						// 		'</iframe>' +
						// 	'</div>'
						// );
					}
				},
				{
					name: 'googleMaps',
					url: /^google\.com\/maps/,
					html: match => {
						// console.log({
						// 	match
						// })
						return (
							`<iframe src="https://${ match.input }" allowfullscreen style="display:block; width: 100%; height: 100%"></iframe>`
						);
						// return (
						// 	`<div style="position: relative; height: 0; padding-bottom: 75%;">
						// 		<iframe src="https:${ match.input }" webkitallowfullscreen mozallowfullscreen allowfullscreen
						// 		style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
						// 		</iframe>
						// 	</div>`
						// );
					}
				},
				{
					name: 'slider',
					url: /slider\.php/,
					html: match => {
						// console.log({
						// 	match
						// })
						//todo
						return (
							`<iframe src="${ match.input }" allowfullscreen style="display:block; width: 100%; height: 100%"></iframe>`
						);
						// return (
						// 	`<div style="position: relative; height: 0; padding-bottom: 75%;">
						// 		<iframe src="https:${ match.input }" webkitallowfullscreen mozallowfullscreen allowfullscreen
						// 		style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
						// 		</iframe>
						// 	</div>`
						// );
					}
				},
				{
					name: 'flickr',
					url: /^flickr\.com/
				},
				{
					name: 'facebook',
					url: /^facebook\.com/
				}
			]
		} );

		/**
		 * The media registry managing the media providers in the editor.
		 *
		 * @member {@ckEditor5/media-embed/mediaregistry~MediaRegistry} #registry
		 */
		this.registry = new MediaRegistry( editor.locale, editor.config.get( 'mediaEmbed' ) );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const t = editor.t;
		const conversion = editor.conversion;
		const renderMediaPreview = editor.config.get( 'mediaEmbed.previewsInData' );
		const registry = this.registry;

		editor.commands.add( 'mediaEmbed', new MediaEmbedCommand( editor ) );

		const modelName = 'media';
		// Configure the schema.
		schema.register( modelName, {
			isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowAttributes: ALLOWED_ATTR.concat([ 'url' ])
		} );
		// schema.extend('media', {
		// 	allowAttributes: [ALLOWED_ATTR]
		// });

		// Model -> Data
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: modelName,
			view: ( modelElement, { writer } ) => {
				const url = modelElement.getAttribute( 'url' );

				return createMediaFigureElement( writer, registry, url, {
					renderMediaPreview: url && renderMediaPreview
				} );
			}
		} );

		// Model -> Data (url -> data-oembed-url)
		conversion.for( 'dataDowncast' ).add(
			modelToViewUrlAttributeConverter( registry, {
				renderMediaPreview
			} )
		);




		// Model -> View (element)
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: modelName,
			view: ( modelElement, { writer } ) => {
				const url = modelElement.getAttribute( 'url' );
				const figure = createMediaFigureElement( writer, registry, url, {
					renderForEditingView: true
				} );
				_setBlockName(writer, figure, 'media');
				_enableBlockEditing(writer, figure);
				_enableIdAttr(writer, figure);
				_enableCustomAttribute(writer, figure);

				return toMediaWidget( figure, writer, t( 'media widget' ) );
			}
		} );

		// Model -> View (url -> data-oembed-url)
		conversion.for( 'editingDowncast' ).add(
			modelToViewUrlAttributeConverter( registry, {
				renderForEditingView: true
			} ) );




		// View -> Model (data-oembed-url -> url)
		conversion.for( 'upcast' )
			// Upcast non-semantic media.
			.elementToElement( {
				view: {
					name: 'figure',
					attributes: {
						'data-oembed-url': true
					}
				},
				model: ( viewElement, { writer } ) => {
					const url = viewElement.getAttribute( 'data-oembed-url' );

					if ( registry.hasMedia( url ) ) {
						let modelElement =  writer.createElement( 'media', { url } );

						// modelElement = _upcastViewStyle(writer, modelElement, viewElement);

						modelElement = _upcastViewClass(writer, modelElement, viewElement);

						modelElement = _upcastViewAttr(writer, modelElement, viewElement);

						modelElement = _upcastViewName(writer, modelElement, viewElement);

						modelElement = _upcastBlockType(writer, modelElement, viewElement);


						return modelElement;
					}
				},
				converterPriority : "highest"
			} )
			// Upcast semantic media.
			.elementToElement( {
				view: {
					name: 'oembed',
					attributes: {
						url: true
					}
				},
				model: ( viewElement, { writer } ) => {
					const url = viewElement.getAttribute( 'url' );

					if ( registry.hasMedia( url ) ) {
						let modelElement =  writer.createElement( 'media', { url } );
						// modelElement = _upcastViewStyle(writer, modelElement, viewElement);

						modelElement = _upcastViewClass(writer, modelElement, viewElement);

						modelElement = _upcastViewAttr(writer, modelElement, viewElement);

						modelElement = _upcastViewName(writer, modelElement, viewElement);


						modelElement = _upcastBlockType(writer, modelElement, viewElement);


						return modelElement;
					}
				},
				converterPriority : "high"
			} )
			// Upcast non-semantic media.
			.elementToElement( {
				view: {
					name: 'div',
					attributes: {
						'data-oembed-url': true
					}
				},
				model: ( viewElement, { writer } ) => {
					const url = viewElement.getAttribute( 'data-oembed-url' );

					if ( registry.hasMedia( url ) ) {
						let modelElement =  writer.createElement( 'media', { url } );
						const figureView = viewElement.parent && viewElement.parent.name === 'figure' ? viewElement.parent : null;
						if(figureView){

							// modelElement = _upcastViewStyle(writer, modelElement, viewElement);
							modelElement = _upcastViewClass(writer, modelElement, viewElement);

							modelElement = _upcastViewAttr(writer, modelElement, viewElement);

							modelElement = _upcastViewName(writer, modelElement, viewElement);
						}



						modelElement = _upcastBlockType(writer, modelElement, viewElement);


						return modelElement;
					}
				},
				converterPriority : "high"
			} );
	}
}
