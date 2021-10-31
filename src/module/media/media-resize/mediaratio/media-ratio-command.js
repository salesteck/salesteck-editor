/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media/mediaresize/mediaresizecommand
 */

// import Command from '@ckeditor/ckeditor5-core/src/command';
// import { isMedia } from '../media/utils';


import { Command } from 'ckeditor5/src/core';
import { isMedia } from '../media/utils';
import {VIEW_CLASS} from "../../../../const";
import {_isStrNotEmpty} from "../../../../general";

/**
 * The image resize command. Currently, it only supports the width attribute.
 *
 * @extends @ckEditor5/core/command~Command
 */
export default class MediaRatioCommand extends Command {
	constructor(editor, defaultClass = '') {
		super(editor);
		this._defaultClass = defaultClass;
	}
	/**
	 * @inheritDoc
	 */
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();
		const _defaultClass = this._defaultClass ||'';

		this.isEnabled = isMedia( element );
		let containDefClass= true;
		if ( !element || !element.hasAttribute( 'ratio' ) ) {
			this.value = null;
		} else {
			let modelClasses = element.getAttribute(VIEW_CLASS) || '';
			modelClasses = modelClasses.split(' ')
			const ratioAttr = element.getAttribute( 'ratio' ) || '';
			let hasRatio = false;
			if(_isStrNotEmpty(ratioAttr) && modelClasses.includes(ratioAttr)){
				hasRatio = true;
			}
			if(_isStrNotEmpty(_defaultClass)  && !modelClasses.includes(_defaultClass)){
				hasRatio = false;
				containDefClass = false;
			}
			// console.log({modelClasses, ratioAttr, _defaultClass, hasRatio, containDefClass})
			this.value = { ratio : hasRatio ? ratioAttr : null };
		}
	}

	/**
	 * Executes the command.
	 *
	 *		// Sets the width to 50%:
	 *		editor.execute( 'imageResize', { width: '50%' } );
	 *
	 *		// Removes the width attribute:
	 *		editor.execute( 'imageResize', { width: null } );
	 *
	 * @param {Object} options
	 * @param {String|null} options.ratio The new width of the image.
	 * @fires execute
	 */
	execute( options ) {
		const model = this.editor.model;
		const selectedElement = model.document.selection.getSelectedElement();
		const newRatioValue = options.ratio || null;
		const _defaultClass = this._defaultClass ||'';
		this.value = {
			ratio: newRatioValue
		};

		if ( selectedElement ) {
			let modelClasses = selectedElement.getAttribute(VIEW_CLASS) || '';
			modelClasses = modelClasses.split(' ');
			const ratioAttr = selectedElement.getAttribute('ratio') || '';
			// console.log(`MediaRatioCommand:execute`, {selectedElement, newRatioValue, modelClasses, _defaultClass, ratioAttr});

			if(_isStrNotEmpty(newRatioValue)){
				modelClasses  = _isStrNotEmpty(ratioAttr) ? modelClasses.filter(elem =>  elem !== ratioAttr) : modelClasses;
				if( _isStrNotEmpty(_defaultClass) && !modelClasses.includes(_defaultClass) ){
					modelClasses.push(_defaultClass)
				}
				if( !modelClasses.includes(newRatioValue) ){
					modelClasses.push(newRatioValue)
				}
			}else {
				modelClasses = modelClasses.filter(elem =>  elem !== ratioAttr);
				if(_isStrNotEmpty(_defaultClass)){
					modelClasses = modelClasses.filter(elem =>  elem !== _defaultClass);
				}
			}
			// console.log(`MediaRatioCommand:execute`, {selectedElement, newRatioValue, modelClasses, _defaultClass, ratioAttr});
			model.change( writer => {
				writer.setAttribute( 'ratio', newRatioValue, selectedElement );
				writer.setAttribute( VIEW_CLASS, modelClasses.join(' '), selectedElement );
			} );
		}
	}
}
