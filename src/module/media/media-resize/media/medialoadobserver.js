/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/image/imageloadobserver
 */

// import Observer from '@ckeditor/ckeditor5-engine/src/_view/observer/observer';

import { Observer } from 'ckeditor5/src/engine';
/**
 * Observes all new images added to the {@link @ckEditor5/engine/_view/document~Document},
 * fires {@link @ckEditor5/engine/_view/document~Document#event:imageLoaded} and
 * {@link @ckEditor5/engine/_view/document~Document#event:layoutChanged} event every time when the new image
 * has been loaded.
 *
 * **Note:** This event is not fired for images that has been added to the document and rendered as `complete` (already loaded).
 *
 * @extends @ckEditor5/engine/_view/observer/observer~Observer
 */
export default class MediaLoadObserver extends Observer {
	/**
	 * @inheritDoc
	 */
	observe( domRoot ) {
		this.listenTo( domRoot, 'load', ( event, domEvent ) => {
			const domElement = domEvent.target;

			if ( this.checkShouldIgnoreEventFromTarget( domElement ) ) {
				return;
			}

			if ( domElement.tagName == 'IFRAME' ) {
				this._fireEvents( domEvent );
			}
			// Use capture phase for better performance (#4504).
		}, { useCapture: true } );
	}

	/**
	 * Fires {@link @ckEditor5/engine/_view/document~Document#event:layoutChanged} and
	 * {@link @ckEditor5/engine/_view/document~Document#event:imageLoaded}
	 * if observer {@link #isEnabled is enabled}.
	 *
	 * @protected
	 * @param {Event} domEvent The DOM event.
	 */
	_fireEvents( domEvent ) {
		if ( this.isEnabled ) {
			this.document.fire( 'layoutChanged' );
			this.document.fire( 'mediaLoaded', domEvent );
		}
	}
}

/**
 * Fired when an <img/> DOM element has been loaded in the DOM root.
 *
 * Introduced by {@link @ckEditor5/image/image/imageloadobserver~ImageLoadObserver}.
 *
 * @see @ckEditor5/image/image/imageloadobserver~ImageLoadObserver
 * @event @ckEditor5/engine/_view/document~Document#event:imageLoaded
 * @param {@ckEditor5/engine/_view/observer/domeventdata~DomEventData} data Event data.
 */
