
// NOT AVAILABLE
import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
import DataApiMixin from '@ckeditor/ckeditor5-core/src/editor/utils/dataapimixin';
import {mix, setDataInElement, getDataFromElement} from 'ckeditor5/src/utils';



import MultiRootEditorUi from './multi-root-editor-ui';
import MultirootEditorUiView from './multi-root-editor-ui-view';
import './theme/multiroot-editor.css';
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";
import {ElementApiMixin} from "ckeditor5/src/core";



/**
 * The multi-root editor implementation. It provides inline editables and a single toolbar.
 *
 * Unlike other editors, the toolbar is not rendered automatically and needs to be attached to the DOM manually.
 *
 * This type of an editor is dedicated to integrations which require a customized UI with an open
 * structure, allowing developers to specify the exact location of the interface.
 *placeholder
 * @mixes @ckEditor5/@ckeditor/ckeditor5-core/editor/utils/dataapimixin~DataApiMixin
 * @implements @ckEditor5/@ckeditor/ckeditor5-core/editor/editorwithui~EditorWithUI
 * @extends @ckEditor5/@ckeditor/ckeditor5-core/editor/editor~Editor
 */
export default class MultiRootEditor extends Editor {

    /**
     * Creates a multi-root editor instance.
     *
     * @param {Object.<String,HTMLElement>} sourceElements The list of DOM elements that will be the source
     * for the created editor (on which the editor will be initialized).
     * @param {@ckEditor5/@ckeditor/ckeditor5-core/editor/editorconfig~EditorConfig} config The editor configuration.
     * @returns {Promise} A promise resolved once the editor is ready. The promise returns the created multi-root editor instance.
     */
    static create( sourceElements, config ) {

        Object.entries(sourceElements).map( ([rootName, element]) =>{
            element.innerHTML = element.innerHTML
                .replace(/>&nbsp;</g,'><')
                .replace(/>\s+</g,'><')
                .replace(/\r?\n|\r/g, "")
            // .replace(/&nbsp;/g, "")
            ;
            sourceElements[rootName] = element;
        })
        return new Promise( resolve => {
            const editor = new this( sourceElements, config );
            editor.on('ready', ()=>{
                if(!document.getElementsByTagName('body')[0].classList.contains('ct-editing')){
                    document.getElementsByTagName('body')[0].classList.add('ct-editing');
                }
                MultiRootEditor._appendToolbar(editor);
                if(editor.config.get( 'debug' ) && window.CKEditorInspector){
                    if(window.CKEditorInspector){
                        window.CKEditorInspector.attach(editor);
                    }
                }
            })
            resolve(
                editor.initPlugins()
                    .then( () => editor.ui.init() )
                    .then( () => {

                        const initialData = {};

                        // Create initial data object containing data from all roots.
                        for ( const rootName of Object.keys( sourceElements ) ) {

                            // console.log({ rootName, sourceElement : sourceElements[ rootName ] })
                            initialData[ rootName ] = getDataFromElement( sourceElements[ rootName ] );
                        }

                        return editor.data.init( initialData );
                    } )
                    .then( () => editor.fire( 'ready' ) )
                    .then( () => editor )

            );
        } );
    }
    /**
     * Creates an instance of the multi-root editor.
     *
     * **Note:** Do not use the constructor to create editor instances. Use the static `MultiRootEditor.create()` method instead.
     *
     * @protected
     * @param {Object.<String,HTMLElement>} sourceElements The list of DOM elements that will be the source
     * for the created editor (on which the editor will be initialized).
     * @param {@ckEditor5/core/editor/editorconfig~EditorConfig} config The editor configuration.
     */
    constructor( sourceElements, config ) {
        super( config );
        // const blockElements = this.editing.view.domConverter.blockElements.slice();
        // this.editing.view.domConverter.blockElements.push('style');
        // console.log({
        //     blockElements, blockElements2 : this.editing.view.domConverter.blockElements.slice()
        // })

        // Create root and UIView element for each editable container.
        for ( const rootName of Object.keys( sourceElements ) ) {

            // console.log({ rootName : rootName })
            this.model.document.createRoot( '$root', rootName );
        }
        const shouldGroupWhenFull = !!this.config.get( 'toolbar.shouldGroupWhenFull' );
        this.ui = new MultiRootEditorUi( this, new MultirootEditorUiView( this.locale, this.editing.view, sourceElements, {shouldGroupWhenFull} ) );
    }

    /**
     * @inheritDoc
     */
    destroy() {
        // Cache the data and editable DOM elements, then destroy.
        // It's safe to assume that the model->_view conversion will not work after super.destroy(),
        // same as `ui.getEditableElement()` method will not return editableElements.
        const data = {};
        const editableElements = {};
        const editableNames = Array.from( this.ui.getEditableElementsNames() );

        for ( const rootName of editableNames ) {
            data[ rootName ] = this.getData( { rootName } );
            editableElements[ rootName ] = this.ui.getEditableElement( rootName );
        }

        // console.log(`MultiRootEditor:destroy`, { data, editableElements });
        this.ui.destroy();

        return super.destroy()
            .then( () => {
                for ( const rootName of editableNames ) {
                    setDataInElement( editableElements[ rootName ], data[ rootName ] );
                }
            } );
    }

    _getData (formatSave = true){
        const _this = this;
        const document = _this.model.document;
        const rootNames = document.getRootNames();
        let data = {};
        if(rootNames.length > 0){
            rootNames.forEach(function (rootName/*, index, array*/){
                let rootData = _this.getData({rootName, trim : 'none'});
                if(formatSave){
                    rootData = _formatSaveData(rootData);
                }
                data[rootName] = rootData;
                // console.log(`MultiRootEditor:_getData`, { rootName, rootData });
            })
        }
        // console.log(`MultiRootEditor:_getData`, { data, _this });
        return data;
    }

    static _appendToolbar(editor){
        let toolbarElement = document.querySelector("#ct-toolbar");
        if(!toolbarElement){
            toolbarElement = document.createElement('div');
            toolbarElement.setAttribute("id", "ct-toolbar");
            document.body.prepend(toolbarElement);

        }
        toolbarElement.prepend(editor.ui.view.toolbar.element);
    }
}

function _formatSaveData(dataString){
    return dataString
        .replace(/>&nbsp;</g,'><')
        .replace(/>\s</g,'><')
        .replace(/&nbsp;{2,}/g,' ')
    ;
}


mix( MultiRootEditor, DataApiMixin );
mix( InlineEditor, ElementApiMixin );
