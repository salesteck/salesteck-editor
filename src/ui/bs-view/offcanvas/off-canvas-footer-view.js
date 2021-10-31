import {
    View
} from 'ckeditor5/src/ui';

export default class OffCanvasFooterView extends View {

    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'class' );
        this.set( 'id' );
        /**
         * A collection of the child views that creates the balloon panel contents.
         *
         * @readonly
         * @member {@ckEditor5:ui/viewcollection~ViewCollection}
         */
        this.content = this.createCollection();

        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'shadow',
                    'offcanvas-footer',
                    'd-flex align-items-center justify-content-around p-15',
                    // 'offcanvas-header',
                    bind.to( 'class' )
                ],
                id : bind.to( 'id' )
            },
            children: this.content
        } );
    }
}
