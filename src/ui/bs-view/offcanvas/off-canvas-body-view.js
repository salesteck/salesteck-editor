import {
    View
} from 'ckeditor5/src/ui';
import "../../../module/side-bar/style/theme/style.css";

export default class OffCanvasBodyView extends View{

    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;
        /**
         * A collection of the child views that creates the balloon panel contents.
         *
         * @readonly
         * @member {@ckEditor5:ui/viewcollection~ViewCollection}
         */
        this.content = this.createCollection();
        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'class' );
        this.set( 'id' );

        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    // 'bg-light',
                    'ck-offcanvas-body',
                    'offcanvas-body',
                    bind.to( 'class' )
                ],
                id : bind.to( 'id' )
            },
            children: this.content
        } );
    }

}
