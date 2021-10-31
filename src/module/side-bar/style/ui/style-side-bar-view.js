import OffCanvasView from "../../../../ui/bs-view/offcanvas/off-canvas-view";
import StyleView from "./style-view";

export default class StyleSideBarView extends OffCanvasView{
    constructor( locale, editor, {defaultColors} ) {
        super( locale );
        this.editor = editor;

        this.defaultColors = defaultColors;
        const bind = this.bindTemplate;

        /**
         * The balloon panel's current position. The position name is reflected in the CSS class set
         * to the balloon, i.e. `.ck-balloon-panel_arrow_nw` for the "arrow_nw" position. The class
         * controls the minor aspects of the balloon's visual appearance like the placement
         * of an {@link #withArrow arrow}. To support a new position, an additional CSS must be created.
         *
         * Default position names correspond with
         * {@link @ckEditor5:ui/panel/balloon/balloonpanelview~BalloonPanelView.defaultPositions}.
         *
         * See the {@link #attachTo} and {@link #pin} methods to learn about custom balloon positions.
         *
         * @observable
         * @default 'arrow_nw'
         * @member {'arrow_nw'|'arrow_ne'|'arrow_sw'|'arrow_se'} #position
         */
        this.set( 'position', 'start' );
        this.set( 'width' );
        this.set('extraTitle');

        this.set( 'title', 'Element Styles' );

        /**
         * Controls whether the balloon panel is visible or not.
         *
         * @observable
         * @default false
         * @member {Boolean} #isVisible
         */
        this.set( 'isVisible', false );

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'class' );
        this.set( 'id', 'ct-style-offcanvas' );

        /**
         * A callback that starts pinning the panel when {@link #isVisible} gets
         * `true`. Used by {@link #pin}.
         *
         * @private
         * @member {Function} #_pinWhenIsVisibleCallback
         */

        /**
         * A collection of the child views that creates the balloon panel contents.
         *
         * @readonly
         * @member {@ckEditor5:ui/viewcollection~ViewCollection}
         */
        this.content = this.createCollection();


        this.extendTemplate( {
            attributes: {
                class : ['w-xs-p100']
            },
            children: this.content
        } );
        this.styleView = new StyleView(locale, editor, {defaultColors});

        this.styleView.bind('show').to(this, 'isVisible');
        // this.styleView.bind('_undoStepBatch').to(this, '_undoStepBatch');
        this.body.content.add(this.styleView);

        const _this = this;
        this.on('cancel', ()=>{
            if (_this.styleView._undoStepBatch.operations.length) {
                editor.execute('undo', _this.styleView._undoStepBatch);
            }
        })
    }

    /**
     * Shows the panel.
     *
     * See {@link #isVisible}.
     */
    show() {
        this.isVisible = true;
    }

    /**
     * Hides the panel.
     *
     * See {@link #isVisible}.
     */
    hide() {
        this.isVisible = false;
    }
}
