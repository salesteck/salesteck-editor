import {EditorUIView, InlineEditableUIView, ToolbarView, Template} from 'ckeditor5/src/ui';

/**
 * The multi-root editor UI _view. It is a virtual _view providing an inline editable, but without
 * any specific arrangement of the components in the DOM.
 *
 * @extends @ckeditor/ckeditor5-ui/editorui/editoruiview~EditorUIView
 */
export default class MultirootEditorUiView extends EditorUIView {
    /**
     * Creates an instance of the multi-root editor UI _view.
     *
     * @param {@ckEditor5/utils/locale~Locale} locale The locale instance.
     * @param {@ckEditor5/engine/_view/_view~View} editingView The editing _view instance this _view is related to.
     * @param {Object.<String,HTMLElement>} editableElements The list of editable elements, containing name and html element
     * @param {Object} [options={}] Configuration options fo the view instance.
     * @param {Boolean} [options.shouldGroupWhenFull] When set `true` enables automatic items grouping
     * for each editable.
     */
    constructor( locale, editingView, editableElements, options = {} ) {
        super( locale );


        /**
         * The main toolbar of the multi-root editor UI.
         *
         * @readonly
         * @member {@ckEditor5/@ckeditor/ckeditor5-ui/toolbar/toolbarview~ToolbarView}
         */
        this.toolbar = new ToolbarView( locale, {shouldGroupWhenFull : options.shouldGroupWhenFull} );
        // this.sidebar = new SideBarView(locale);

        /**
         * The editables of the multi-root editor UI.
         *
         * @readonly
         * @member {Array.<@ckEditor5/@ckeditor/ckeditor5-ui/editableui/inline/inlineeditableuiview~InlineEditableUIView>}
         */
        this.editables = [];

        // Create InlineEditableUIView instance for each editable.
        for ( const editableName of Object.keys( editableElements ) ) {
            const inlineEditableUIView = new InlineEditableUIView( locale, editingView, editableElements[ editableName ] );

            inlineEditableUIView.name = editableName;
            // console.log(`MultirootEditorUiView:constructor:${editableName}`, {editableName, editable : editableElements[ editableName ], inlineEditableUIView})
            this.editables.push( inlineEditableUIView );
        }

        // This toolbar may be placed anywhere in the page so things like font size need to be reset in it.
        // Because of the above, make sure the toolbar supports rounded corners.
        // Also, make sure the toolbar has the proper dir attribute because its ancestor may not have one
        // and some toolbar item styles depend on this attribute.
        Template.extend( this.toolbar.template, {
            attributes: {
                class: [
                    'ck-reset_all',
                    'ck-rounded-corners'
                ],
                dir: locale.uiLanguageDirection
            }
        } );
    }

    /**
     * @inheritDoc
     */
    render() {
        super.render();

        this.registerChild( this.editables );
        this.registerChild( [ this.toolbar ] );
    }
}
