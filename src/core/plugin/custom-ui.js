import {Plugin} from 'ckeditor5/src/core';
import {ContextualBalloon} from 'ckeditor5/src/ui';

export default class CustomUi extends Plugin{
    /**
     * @inheritDoc
     */
    static get requires() {
        return [ContextualBalloon];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckCustomUi';
    }



    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        // console.log("CustomUi#constructor", {editor});
    }

    init(){

        const editor = this.editor;

        /**
         * The contextual balloon plugin instance.
         *
         * @private-attribute
         * @member {@ckEditor5/ui/panel/balloon/contextualballoon~ContextualBalloon}
         */
        this._balloon = editor.plugins.get(ContextualBalloon);

        /**
         * The cell properties form _view displayed inside the balloon.
         *
         * @member {@ckEditor5/table/tablecellproperties/ui/tablecellpropertiesview~TableCellPropertiesView}
         */
        /**
         * The batch used to undo all changes made by the form (which are live, as the user types)
         * when "Cancel" was pressed. Each time the _view is shown, a new batch is created.
         *
         * @protected
         * @member {@ckEditor5/engine/model/batch~Batch}
         */
        this._undoStepBatch = null;

        this.currentView = null;

        this._startPlugin(editor);
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        // console.log("CustomUi#destroy");

        // Destroy created UI components as they are not automatically destroyed.
        // See https://github.com/ckeditor/ckeditor5/issues/1341.
        if (this.currentView) {
            this.currentView.destroy();
        }
    }

    /**
     * Returns `true` when the {@link #view} is visible in the {@link #_balloon}.
     *
     * @private-attribute
     * @type {Boolean}
     */
    get _isViewVisible() {
        return this._balloon.visibleView === this.currentView;
    }

    /**
     * Returns `true` when the {@link #view} is in the {@link #_balloon}.
     *
     * @private-attribute
     * @type {Boolean}
     */
    get _isViewInBalloon() {
        return this._balloon.hasView(this.currentView);
    }


    /**
     * Removes the {@link #view} from the {@link #_balloon}.
     *
     * @protected
     */
    _hideView() {
        if (!this._isViewInBalloon) {
            return;
        }

        // console.log("CustomUi#_hideView");
        const editor = this.editor;

        this._clearListener(editor);

        this.stopListening(editor.ui, 'update');

        // Blur any input element before removing it from DOM to prevent issues in some browsers.
        // See https://github.com/ckeditor/ckeditor5/issues/1501.
        this.currentView.saveButtonView.focus();

        this._balloon.remove(this.currentView);

        // Make sure the focus is not lost in the process by putting it directly
        // into the editing _view.
        this.editor.editing.view.focus();
    }

    _startPlugin(editor){

    }
    _clearListener(editor){

    }


}
