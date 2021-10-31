import { View } from 'ckeditor5/src/ui';
import { /*uid,*/ toUnit } from 'ckeditor5/src/utils';
const pxUnit = toUnit('px');

import mix from '@ckeditor/ckeditor5-utils/src/mix';
import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';

import OffCanvasHeaderView from "./off-canvas-header-view";
import OffCanvasBodyView from "./off-canvas-body-view";
import OffCanvasFooterView from "./off-canvas-footer-view";
import BsButtonView from "../form/bs-button-view";
import {viewCreator} from "../../utils";
import Document from "@ckeditor/ckeditor5-engine/src/view/document";
export default class OffCanvasView extends View{
    constructor( locale, header = true, footer = true ) {
        super(locale);

        const bind = this.bindTemplate;
        const t = this.t;
        this.set( 'width' );

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


        /**
         * Controls whether the balloon panel is visible or not.
         *
         * @observable
         * @default false
         * @member {Boolean} #isVisible
         */
        this.set( 'isVisible', false );


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

        if(header){
            this.header = new OffCanvasHeaderView(locale);
            this.header.bind('title').to(this, 'title');
            this.header.bind('extraTitle').to(this, 'extraTitle');
            this.content.add(this.header);
        }


        this.body = new OffCanvasBodyView(locale);
        this.content.add(this.body);

        if(footer){
            this.footer = new OffCanvasFooterView(locale);
            const saveBtn = new BsButtonView(locale);
            saveBtn.set({
                color : 'btn-c-outline-success',
                withText : true,
                label : t('Save'),
                class : 'm-5 w-p50 b-w-2 btn-s-sm'
            });
            saveBtn.delegate('');

            saveBtn.children.add(viewCreator(locale,{
                tag : 'i',
                attributes : {
                    class : ['fa', 'fa-check', 'm-3']
                }
            }));
            saveBtn.delegate('execute').to(this, 'save');

            this.footer.content.add(saveBtn);
            const cancelBtn = new BsButtonView(locale);
            cancelBtn.set({
                color : 'btn-c-outline-danger',
                withText : true,
                label : t('Cancel'),
                class : 'm-5 w-p50 b-w-2 btn-s-sm'
            });
            cancelBtn.children.add(viewCreator(locale,{
                tag : 'i',
                attributes : {
                    class : ['fa', 'fa-times', 'm-3']
                }
            }));
            cancelBtn.delegate('execute').to(this, 'cancel');

            this.footer.content.add(cancelBtn)
            this.content.add(this.footer);
        }



        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-offcanvas-sidebar',
                    'offcanvas',
                    bind.to( 'position', value => `offcanvas-${ value }` ),
                    bind.to( 'class' )
                ],
                id : bind.to( 'id' ),
                'data-bs-scroll' : bind.to('_scroll', value => value ? 'true' : 'false' ),
                'data-bs-backdrop' : bind.to('_backdrop'/*, value => value ? 'true' : 'false' */),
                style: {
                    'width': bind.to('width', value => value ? pxUnit(value) : null),
                    zIndex : '7999'
                }
            },

            children: this.content
        } );

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

mix( Document, ObservableMixin );
