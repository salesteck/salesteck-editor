import OffCanvasView from "../../../../ui/bs-view/offcanvas/off-canvas-view";
import ElementsView from "./elements-view";
export default class ElementsSideBarView extends OffCanvasView{
    constructor( locale, editor) {
        super( locale, true, false );
        this.editor = editor;

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
        this.set( 'position', 'end' );
        this.set( 'title', 'Plugins' );

        this.set( '_backdrop', false );

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #id
         */
        this.set( 'id', 'ct-elements-offcanvas' );

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
                class : ['w-xs-p100', 'tt-capitalize']
            },
            children: this.content
        } );
        this.elementsView = new ElementsView(locale, editor);
        this.elementsView.delegate('execute').to(this);
        this.elementsView.delegate('dragstart').to(this);
        this.elementsView.delegate('dragend').to(this);
        this.elementsView.bind('show').to(this, 'isVisible');
        this.body.content.add(this.elementsView);

        const _this = this;
        this.on('cancel', ()=>{
            if (_this.elementsView._undoStepBatch.operations.length) {
                editor.execute('undo', _this.elementsView._undoStepBatch);
            }
        });

    }

    render(){
        super.render();
    }
    /**
     * A utility that expands the plain toolbar configuration into
     *
     * @param {Array.<String>|Object} items The toolbar items or the entire toolbar configuration object.
     */
    _fillFromConfig( items ) {
        // console.log({arguments})
        this.elementsView._fillFromConfig(items);
    }
}
