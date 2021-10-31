import {
    View
} from 'ckeditor5/src/ui';

export default class OffCanvasHeaderView extends View {

    constructor(locale, option = {_withCloseBtn : false}) {
        super(locale);

        const bind = this.bindTemplate;

        this._withCloseBtn = option._withCloseBtn;
        this.set( 'title', '' );
        this.set( 'extraTitle', '' );

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'class' );
        this.set( 'id' );
        let closeBtn = null;
        if(this._withCloseBtn){

            closeBtn = new View(locale);
            closeBtn.setTemplate({
                tag : 'button',
                attributes : {
                    type: 'button',
                    "data-bs-dismiss" : 'offcanvas',
                    "aria-label" : 'Close',
                    class : [
                        'btn-close',
                        'btn-close-white',
                        'float-end'
                    ]
                }
            })
            this.closeBtn = closeBtn;

        }
        /**
         * A collection of the child views that creates the balloon panel contents.
         *
         * @readonly
         * @member {@ckEditor5:ui/viewcollection~ViewCollection}
         */
        this.content = this.createCollection();
        let titleView = new View(locale);
        const titleChildren = [
            {text: bind.to( 'title' )},
            {text: bind.to( 'extraTitle' )},
        ];
        if(this.closeBtn){
            titleChildren.push(this.closeBtn);
        }
        titleView.setTemplate({
            tag : 'div',
            children : titleChildren
        });
        this.content.add(titleView);
        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'shadow',
                    'bg-gradient-info', 'text-c-light',
                    'ck-offcanvas-header',
                    'offcanvas-header',
                    bind.to( 'class' )
                ],
                id : bind.to( 'id' )
            },
            children: this.content
        } );
    }
}
