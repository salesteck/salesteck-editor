import { ViewCollection, View, FocusCycler } from 'ckeditor5/src/ui';
import {KeystrokeHandler, FocusTracker} from 'ckeditor5/src/utils';

export default class AccordionView extends View{

    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;

        this.set('isVisible', false);
        /**
         * Tracks information about the DOM focus in the form.
         *
         * @readonly
         * @member {@ckEditor5/utils/focustracker~FocusTracker}
         */
        this.focusTracker = new FocusTracker();

        /**
         * An instance of the {@link @ckEditor5/utils/keystrokehandler~KeystrokeHandler}.
         *
         * @readonly
         * @member {@ckEditor5/utils/keystrokehandler~KeystrokeHandler}
         */
        this.keystrokes = new KeystrokeHandler();

        /**
         * A collection of child views in the form.
         *
         * @readonly
         * @type {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this.children = this.createCollection();

        /**
         * A collection of views that can be focused in the form.
         *
         * @readonly
         * @protected
         * @member {@ckEditor5/ui/viewcollection~ViewCollection}
         */
        this._focusables = new ViewCollection();

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'class' );
        this.set( 'id' );
        this.set( 'show', false );

        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'accordion',
                    bind.to('class')
                ],
                id : bind.to('id')
            },
            children : this.children
        })

        /**
         * Helps cycling over {@link #_focusables} in the form.
         *
         * @readonly
         * @protected
         * @member {@ckEditor5/ui/focuscycler~FocusCycler}
         */
        this._focusCycler = new FocusCycler({
            focusables: this._focusables,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the Shift + Tab keystroke.
                focusPrevious: 'shift + tab',

                // Navigate form fields forwards using the Tab key.
                focusNext: 'tab'
            }
        });
    }

    addAccordionItem(element){
        if(element){
            this.children.add(element);
            element.bind('show').to(this, 'show');
            element.bind('isVisible').to(this, 'isVisible');
        }
    }
    render(){
        super.render();

        //
        // // Mainly for closing using "Esc" and navigation using "Tab".
        this.keystrokes.listenTo(this.element);
    }

    /**
     * Focuses the fist focusable field in the form.
     */
    focus() {
        this._focusCycler.focusFirst();
    }
}
