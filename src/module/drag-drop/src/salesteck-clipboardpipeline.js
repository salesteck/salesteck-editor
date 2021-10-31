/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module clipboard/clipboardpipeline
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';

import SalesteckClipboardObserver from './salesteck-clipboardobserver';

import plainTextToHtml from './utils/plaintexttohtml';
import normalizeClipboardHtml from './utils/normalizeclipboarddata';
import viewToPlainText from './utils/viewtoplaintext.js';

// Input pipeline events overview:
//
//              ┌──────────────────────┐          ┌──────────────────────┐
//              │     view.Document    │          │     view.Document    │
//              │         paste        │          │         drop         │
//              └───────────┬──────────┘          └───────────┬──────────┘
//                          │                                 │
//                          └────────────────┌────────────────┘
//                                           │
//                                 ┌─────────V────────┐
//                                 │   view.Document  │   Retrieves text/html or text/plain from data.dataTransfer
//                                 │  clipboardInput  │   and processes it to view.DocumentFragment.
//                                 └─────────┬────────┘
//                                           │
//                               ┌───────────V───────────┐
//                               │   ClipboardPipeline   │   Converts view.DocumentFragment to model.DocumentFragment.
//                               │  inputTransformation  │
//                               └───────────┬───────────┘
//                                           │
//                                ┌──────────V──────────┐
//                                │  ClipboardPipeline  │   Calls model.insertContent().
//                                │   contentInsertion  │
//                                └─────────────────────┘
//
//
// Output pipeline events overview:
//
//              ┌──────────────────────┐          ┌──────────────────────┐
//              │     view.Document    │          │     view.Document    │   Retrieves the selected model.DocumentFragment
//              │         copy         │          │          cut         │   and converts it to view.DocumentFragment.
//              └───────────┬──────────┘          └───────────┬──────────┘
//                          │                                 │
//                          └────────────────┌────────────────┘
//                                           │
//                                 ┌─────────V────────┐
//                                 │   view.Document  │   Processes view.DocumentFragment to text/html and text/plain
//                                 │  clipboardOutput │   and stores the results in data.dataTransfer.
//                                 └──────────────────┘
//

/**
 * The clipboard-modified pipeline feature. It is responsible for intercepting the `paste` and `drop` events and
 * passing the pasted content through a series of events in order to insert it into the editor's content.
 * It also handles the `cut` and `copy` events to fill the native clipboard-modified with the serialized editor's data.
 *
 * # Input pipeline
 *
 * The behavior of the default handlers (all at a `low` priority):
 *
 * ## Event: `paste` or `drop`
 *
 * 1. Translates the event data.
 * 2. Fires the {@link @ckEditor5/engine/view/document~Document#event:clipboardInput `view.Document#clipboardInput`} event.
 *
 * ## Event: `view.Document#clipboardInput`
 *
 * 1. If the `data.content` event field is already set (by some listener on a higher priority), it takes this content and fires the event
 *    from the last point.
 * 2. Otherwise, it retrieves `text/html` or `text/plain` from `data.dataTransfer`.
 * 3. Normalizes the raw data by applying simple filters on string data.
 * 4. Processes the raw data to {@link @ckEditor5/engine/view/documentfragment~DocumentFragment `view.DocumentFragment`} with the
 *    {@link @ckEditor5/engine/controller/datacontroller~DataController#htmlProcessor `DataController#htmlProcessor`}.
 * 5. Fires the {@link @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline#event:inputTransformation
 *   `ClipboardPipeline#inputTransformation`} event with the view document fragment in the `data.content` event field.
 *
 * ## Event: `ClipboardPipeline#inputTransformation`
 *
 * 1. Converts {@link @ckEditor5/engine/view/documentfragment~DocumentFragment `view.DocumentFragment`} from the `data.content` field to
 *    {@link @ckEditor5/engine/model/documentfragment~DocumentFragment `model.DocumentFragment`}.
 * 2. Fires the {@link @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline#event:contentInsertion `ClipboardPipeline#contentInsertion`}
 *    event with the model document fragment in the `data.content` event field.
 *    **Note**: The `ClipboardPipeline#contentInsertion` event is fired within a model change block to allow other handlers
 *    to run in the same block without post-fixers called in between (i.e., the selection post-fixer).
 *
 * ## Event: `ClipboardPipeline#contentInsertion`
 *
 * 1. Calls {@link @ckEditor5/engine/model/model~Model#insertContent `model.insertContent()`} to insert `data.content`
 *    at the current selection position.
 *
 * # Output pipeline
 *
 * The behavior of the default handlers (all at a `low` priority):
 *
 * ## Event: `copy`, `cut` or `dragstart`
 *
 * 1. Retrieves the selected {@link @ckEditor5/engine/model/documentfragment~DocumentFragment `model.DocumentFragment`} by calling
 *    {@link @ckEditor5/engine/model/model~Model#getSelectedContent `model#getSelectedContent()`}.
 * 2. Converts the model document fragment to {@link @ckEditor5/engine/view/documentfragment~DocumentFragment `view.DocumentFragment`}.
 * 3. Fires the {@link @ckEditor5/engine/view/document~Document#event:clipboardOutput `view.Document#clipboardOutput`} event
 *    with the view document fragment in the `data.content` event field.
 *
 * ## Event: `view.Document#clipboardOutput`
 *
 * 1. Processes `data.content` to HTML and plain text with the
 *    {@link @ckEditor5/engine/controller/datacontroller~DataController#htmlProcessor `DataController#htmlProcessor`}.
 * 2. Updates the `data.dataTransfer` data for `text/html` and `text/plain` with the processed data.
 * 3. For the `cut` method, calls {@link @ckEditor5/engine/model/model~Model#deleteContent `model.deleteContent()`}
 *    on the current selection.
 *
 * Read more about the clipboard-modified integration in the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 *
 * @extends @ckEditor5/core/plugin~Plugin
 */
export default class SalesteckClipboardPipeline extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SalesteckClipboardPipeline';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const view = editor.editing.view;

		view.addObserver( SalesteckClipboardObserver );

		this._setupPasteDrop();
		this._setupCopyCut();
	}

	/**
	 * The clipboard-modified paste pipeline.
	 *
	 * @private
	 */
	_setupPasteDrop() {
		const editor = this.editor;
		const model = editor.model;
		const view = editor.editing.view;
		const viewDocument = view.document;

		// Pasting and dropping is disabled when editor is in the read-only mode.
		// See: https://github.com/ckeditor/ckeditor5-clipboard/issues/26.
		this.listenTo( viewDocument, 'salesteckClipboardInput', ( evt, data ) => {
			if ( editor.isReadOnly ) {
				evt.stop();
			}
		}, { priority: 'highest' } );

		this.listenTo( viewDocument, 'salesteckClipboardInput', ( evt, data ) => {
			const dataTransfer = data.dataTransfer;
			let content = data.content || '';
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data, content});

			// Some feature could already inject content in the higher priority event handler (i.e., codeBlock).
			if ( !content ) {
				if ( dataTransfer.getData( 'text/html' ) ) {
					// data.content = data.content

					content = normalizeClipboardHtml( dataTransfer.getData( 'text/html' )
						.replace(/>\s+</g,'><')
						.replace(/\r?\n|\r/g, "")
					);
				} else if ( dataTransfer.getData( 'text/plain' ) ) {
					content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );
				}
				// console.log(`clipboardPipeline:${evt.name}`, {evt, data, content});

				content = content
					.replace(/>\s+</g,'><')
					.replace(/\r?\n|\r/g, "");
				content = editor.data.htmlProcessor.toView( content );
			}
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data, content});

			const eventInfo = new EventInfo( this, 'salesteckInputTransformation' );

			this.fire( eventInfo, {
				content,
				dataTransfer,
				targetRanges: data.targetRanges,
				method: data.method,
				targetPosition : data.targetPosition || "",
				targetContext : data.targetContext || null
			} );

			// If CKEditor handled the input, do not bubble the original event any further.
			// This helps external integrations recognize this fact and act accordingly.
			// https://github.com/ckeditor/ckeditor5-upload/issues/92
			if ( eventInfo.stop.called ) {
				// console.log(`SalesteckClipboardPipeline:${evt.name}.stop.called`, {evt, data, content});
				evt.stop();
			}

			view.scrollToTheSelection();
			// evt.stop();
		}, { priority: 'low' } );

		this.listenTo( this, 'salesteckInputTransformation', ( evt, data ) => {
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data});
			if ( data.content.isEmpty ) {
				return;
			}

			const dataController = this.editor.data;

			// Convert the pasted content into a model document fragment.
			// The conversion is contextual, but in this case an "all allowed" context is needed
			// and for that we use the $clipboardHolder item.
			let modelFragment;
			// let modelFragment;
			if(data.targetContext){
				modelFragment = dataController.toModel( data.content, data.targetContext.name );
				// modelFragment = dataController.toModel( data.content, 'block' );
			}else {
				modelFragment = dataController.toModel( data.content, '$clipboardHolder' );
			}

			// for(const child of modelFragment.getChildren()){
			// 	console.log(`clipboardPipeline:${evt.name}`, {evt, data, fragment : modelFragment, childCount : modelFragment.childCount, child});
			// }
			if ( modelFragment.childCount === 0 ) {
				return;
			}

			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data, fragment : modelFragment, childCount : modelFragment.childCount});

			evt.stop();

			// Fire content insertion event in a single change block to allow other handlers to run in the same block
			// without post-fixers called in between (i.e., the selection post-fixer).

			const undoStepBatch = editor.model.createBatch();
			model.enqueueChange( undoStepBatch, writer => {
				this.fire( 'salesteckContentInsertion', {
					content: modelFragment,
					method: data.method,
					dataTransfer: data.dataTransfer,
					targetRanges: data.targetRanges,
					targetPosition : data.targetPosition || ""
				} );

			})
			// model.change( () => {
			// 	this.fire( 'salesteckContentInsertion', {
			// 		content: modelFragment,
			// 		method: data.method,
			// 		dataTransfer: data.dataTransfer,
			// 		targetRanges: data.targetRanges,
			// 		targetPosition : data.targetPosition || ""
			// 	} );
			// } );
		}, { priority: 'low' } );

		this.listenTo( this, 'salesteckContentInsertion', ( evt, data ) => {
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data});
			data.resultRange = model.insertContent( data.content );
			// evt.stop();
		}, { priority: 'low' } );
	}

	/**
	 * The clipboard-modified copy/cut pipeline.
	 *
	 * @private
	 */
	_setupCopyCut() {
		const editor = this.editor;
		const modelDocument = editor.model.document;
		const view = editor.editing.view;
		const viewDocument = view.document;

		function onCopyCut( evt, data ) {
			const dataTransfer = data.dataTransfer;

			data.preventDefault();

			const content = editor.data.toView( editor.model.getSelectedContent( modelDocument.selection ) );
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data});

			viewDocument.fire( 'salesteckClipboardOutput', { dataTransfer, content, method: evt.name } );
		}

		this.listenTo( viewDocument, 'copy', onCopyCut, { priority: 'low' } );
		this.listenTo( viewDocument, 'cut', ( evt, data ) => {
			// Cutting is disabled when editor is in the read-only mode.
			// See: https://github.com/ckeditor/ckeditor5-clipboard/issues/26.
			if ( editor.isReadOnly ) {
				data.preventDefault();
			} else {
				onCopyCut( evt, data );
			}
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data});
		}, { priority: 'low' } );

		this.listenTo( viewDocument, 'salesteckClipboardOutput', ( evt, data ) => {
			if ( !data.content.isEmpty ) {
				let dataHtml = this.editor.data.htmlProcessor.toData( data.content );
				dataHtml = dataHtml.replace(/>\s+</g,'><').replace(/\r?\n|\r/g, "").replace(/&nbsp;/g, "");
				data.dataTransfer.setData( 'text/html', dataHtml );
				data.dataTransfer.setData( 'text/plain', viewToPlainText( data.content ) );
				// console.log(`SalesteckClipboardPipeline:${evt.name}`,
				// 	{ evt, data, viewPlainText : viewToPlainText( data.content ), dataHtml  }
				// );
			}

			if ( data.method == 'cut' ) {
				editor.model.deleteContent( modelDocument.selection );
			}
			// console.log(`SalesteckClipboardPipeline:${evt.name}`, {evt, data});
		}, { priority: 'low' } );
	}
}

/**
 * Fired with the `content`, `dataTransfer`, `method`, and `targetRanges` properties:
 *
 * * The `content` which comes from the clipboard-modified (it was pasted or dropped) should be processed in order to be inserted into the editor.
 * * The `dataTransfer` object is available in case the transformation functions need access to the raw clipboard-modified data.
 * * The `method` indicates the original DOM event (for example `'drop'` or `'paste'`).
 * * The `targetRanges` property is an array of view ranges (it is available only for `'drop'`).
 *
 * It is a part of the {@glink framework/guides/deep-dive/clipboard-modified#input-pipeline clipboard-modified input pipeline}.
 *
 * **Note**: You should not stop this event if you want to change the input data. You should modify the `content` property instead.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @see @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline
 * @event @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline#event:inputTransformation
 * @param {Object} data The event data.
 * @param {@ckEditor5/engine/view/documentfragment~DocumentFragment} data.content The event data. The content to be inserted into the editor.
 * It can be modified by event listeners. Read more about the clipboard-modified pipelines in
 * the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 * @param {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} data.dataTransfer The data transfer instance.
 * @param {'paste'|'drop'} data.method Whether the event was triggered by a paste or drop operation.
 * @param {Array.<@ckEditor5/engine/view/range~Range>} data.targetRanges The target drop ranges.
 */

/**
 * Fired with the `content`, `dataTransfer`, `method`, and `targetRanges` properties:
 *
 * * The `content` which comes from the clipboard-modified (was pasted or dropped) should be processed in order to be inserted into the editor.
 * * The `dataTransfer` object is available in case the transformation functions need access to the raw clipboard-modified data.
 * * The `method` indicates the original DOM event (for example `'drop'` or `'paste'`).
 * * The `targetRanges` property is an array of view ranges (it is available only for `'drop'`).
 *
 * Event handlers can modify the content according to the final insertion position.
 *
 * It is a part of the {@glink framework/guides/deep-dive/clipboard-modified#input-pipeline clipboard-modified input pipeline}.
 *
 * **Note**: You should not stop this event if you want to change the input data. You should modify the `content` property instead.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @see @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline
 * @see @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline#event:inputTransformation
 * @event @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline#event:contentInsertion
 * @param {Object} data The event data.
 * @param {@ckEditor5/engine/model/documentfragment~DocumentFragment} data.content The event data. The content to be inserted into the editor.
 * Read more about the clipboard-modified pipelines in the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 * @param {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} data.dataTransfer The data transfer instance.
 * @param {'paste'|'drop'} data.method Whether the event was triggered by a paste or drop operation.
 * @param {Array.<@ckEditor5/engine/view/range~Range>} data.targetRanges The target drop ranges.
 * @param {@ckEditor5/engine/model/range~Range} data.resultRange The result of the `model.insertContent()` call
 *  (inserted by the event handler at a low priority).
 */

/**
 * Fired on {@link @ckEditor5/engine/view/document~Document#event:copy} and {@link @ckEditor5/engine/view/document~Document#event:cut}
 * with a copy of the selected content. The content can be processed before it ends up in the clipboard-modified.
 *
 * It is a part of the {@glink framework/guides/deep-dive/clipboard-modified#output-pipeline clipboard-modified output pipeline}.
 *
 * @see @ckEditor5/clipboard-modified/clipboardobserver~ClipboardObserver
 * @see @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardPipeline
 * @event @ckEditor5/engine/view/document~Document#event:clipboardOutput
 * @param {@ckEditor5/clipboard-modified/clipboardpipeline~ClipboardOutputEventData} data The event data.
 */

/**
 * The value of the {@link @ckEditor5/engine/view/document~Document#event:clipboardOutput} event.
 *
 * @class @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardOutputEventData
 */

/**
 * The data transfer instance.
 *
 * @readonly
 * @member {@ckEditor5/clipboard-modified/datatransfer~DataTransfer} @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardOutputEventData#dataTransfer
 */

/**
 * Content to be put into the clipboard-modified. It can be modified by the event listeners.
 * Read more about the clipboard-modified pipelines in the {@glink framework/guides/deep-dive/clipboard-modified clipboard-modified deep dive guide}.
 *
 * @member {@ckEditor5/engine/view/documentfragment~DocumentFragment} @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardOutputEventData#content
 */

/**
 * Whether the event was triggered by a copy or cut operation.
 *
 * @member {'copy'|'cut'} @ckEditor5/clipboard-modified/clipboardpipeline~ClipboardOutputEventData#method
 */
