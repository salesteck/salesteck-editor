/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/converters
 */

import {getFillerOffset} from 'ckeditor5/src/engine';

import {PARENT_CLASS} from "./customList";
import {injectViewList} from "@ckeditor/ckeditor5-list/src/utils";
import {VIEW_CLASS} from "../../const";


/**
 * A view-to-model converter that converts the `<li>` view elements into the `listItem` model elements.
 *
 * To set correct values of the `listType` and `listIndent` attributes the converter:
 * * checks `<li>`'s parent,
 * * stores and increases the `conversionApi.store.indent` value when `<li>`'s sub-items are converted.
 *
 * @see @ckEditor5/engine/conversion/upcastdispatcher~UpcastDispatcher#event:element
 * @param {@ckEditor5/utils/eventinfo~EventInfo} evt An object containing information about the fired event.
 * @param {Object} data An object containing conversion input and a placeholder for conversion output and possibly other values.
 * @param {@ckEditor5/engine/conversion/upcastdispatcher~UpcastConversionApi} conversionApi Conversion interface to be used by the callback.
 */
export function _viewModelConverter( evt, data, conversionApi ) {
	// console.log(`${evt.name}`, {evt, data});
	for ( const listItem of data.modelRange.getItems( { shallow: true } ) ) {
		// console.log(`${evt.name}`, {evt, data, listItem});
		const itemCLass = data.viewItem.getAttribute('class') || '';
		conversionApi.writer.setAttribute( VIEW_CLASS, itemCLass, listItem );
		if(data.viewItem.parent){
			const parentClass = data.viewItem.parent.getAttribute('class') || '';
			conversionApi.writer.setAttribute( PARENT_CLASS, parentClass, listItem );
		}
	}
}

/**
 * A model-to-view converter for the `listItem` model element insertion.
 *
 * It creates a `<ul><li></li><ul>` (or `<ol>`) view structure out of a `listItem` model element, inserts it at the correct
 * position, and merges the list with surrounding lists (if available).
 *
 * @see @ckEditor5/engine/conversion/downcastdispatcher~DowncastDispatcher#event:insert
 * @param {@ckEditor5/engine/model/model~Model} model Model instance.
 * @returns {Function} Returns a conversion callback.
 */
export function _modelViewInsertion( model ) {
	return ( evt, data, conversionApi ) => {
		const consumable = conversionApi.consumable;

		if ( !consumable.test( data.item, 'insert' ) ||
			!consumable.test( data.item, 'attribute:listType' ) ||
			!consumable.test( data.item, 'attribute:listIndent' )
		) {
			return;
		}

		consumable.consume( data.item, 'insert' );
		consumable.consume( data.item, 'attribute:listType' );
		consumable.consume( data.item, 'attribute:listIndent' );

		const modelItem = data.item;

		const viewItem = _generateLiInUl( modelItem, conversionApi );

		injectViewList( modelItem, viewItem, conversionApi, model );
		evt.stop();
	};
}

/**
 * Helper function that creates a `<ul><li></li></ul>` or (`<ol>`) structure out of the given `modelItem` model `listItem` element.
 * Then, it binds the created view list item (`<li>`) with the model `listItem` element.
 * The function then returns the created view list item (`<li>`).
 *
 * @param {@ckEditor5/engine/model/item~Item} modelItem Model list item.
 * @param {@ckEditor5/engine/conversion/upcastdispatcher~UpcastConversionApi} conversionApi Conversion interface.
 * @returns {@ckEditor5/engine/view/containerelement~ContainerElement} View list element.
 */
export function _generateLiInUl( modelItem, conversionApi ) {
	const mapper = conversionApi.mapper;
	const viewWriter = conversionApi.writer;
	const listType = modelItem.getAttribute( 'listType' ) == 'numbered' ? 'ol' : 'ul';
	const viewItem = _createViewListItemElement( viewWriter );

	const viewList = viewWriter.createContainerElement( listType, null );

	//TODO added for class
	viewWriter.setAttribute('class', modelItem.getAttribute(PARENT_CLASS) || '', viewList );
	//TODO added for class
	viewWriter.setAttribute('class', modelItem.getAttribute(VIEW_CLASS) || '', viewItem );

	viewWriter.insert( viewWriter.createPositionAt( viewList, 0 ), viewItem );

	mapper.bindElements( modelItem, viewItem );

	return viewItem;
}
/**
 * Creates a list item {@link @ckEditor5/engine/view/containerelement~ContainerElement}.
 *
 * @param {@ckEditor5/engine/view/downcastwriter~DowncastWriter} writer The writer instance.
 * @returns {@ckEditor5/engine/view/containerelement~ContainerElement}
 */
function _createViewListItemElement( writer ) {
	const viewItem = writer.createContainerElement( 'li' );

	viewItem.getFillerOffset = _getListItemFillerOffset;

	return viewItem;
}

// Implementation of getFillerOffset for view list item element.
//
// @returns {Number|null} Block filler offset or `null` if block filler is not needed.
function _getListItemFillerOffset() {
	const hasOnlyLists = !this.isEmpty && ( this.getChild( 0 ).name == 'ul' || this.getChild( 0 ).name == 'ol' );

	if ( this.isEmpty || hasOnlyLists ) {
		return 0;
	}

	return getFillerOffset.call( this );
}
