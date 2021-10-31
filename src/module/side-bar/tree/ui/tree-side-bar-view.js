import OffCanvasView from "../../../../ui/bs-view/offcanvas/off-canvas-view";
import '../theme/style.css';
import RootContainerView from "./root-container-view";

export default class TreeSideBarView extends OffCanvasView {
    constructor(locale, editor, config = {} ) {
        super(locale, true, false);
        this.editor = editor;
        this.config =config;


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
        this.set('position', 'start');
        this.set('width', 450);
        this.set('title', 'Tree');
        this.set('extraTitle', '');

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #id
         */
        this.set('id', 'ct-tree-offcanvas');

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


        this.extendTemplate({
            attributes: {
                class: ['w-xs-p100']
            },
            children: this.content
        });
        // this.treeView = new CustomTreeView(locale, editor, options);
        this.rootContainerView = new RootContainerView(locale, editor, config);

        this.rootContainerView.bind('show').to(this, 'isVisible');
        this.rootContainerView.delegate('elementSelected').to(this);
        this.rootContainerView.delegate('removeChild').to(this);
        this.body.content.add(this.rootContainerView);

        const _this = this;
        this.on('cancel', () => {
            if (_this.rootContainerView._undoStepBatch.operations.length) {
                editor.execute('undo', _this.rootContainerView._undoStepBatch);
            }
        });
    }

    render() {
        super.render();
    }


}
