import { View, IconView } from 'ckeditor5/src/ui';
import { uid } from 'ckeditor5/src/utils';

export default class BsSwitchView extends View{
    /**
     * Creates an instance of the color input _view.
     *
     * @param {@ckEditor5/utils/locale~Locale} locale The locale instance.
     */
    constructor( locale ) {
        super( locale );
        // this.commandName = options.commandName || null;

        const bind = this.bindTemplate;
        /**
         * The value of the input.
         *
         * @observable
         * @member {String} #value
         * @default ''
         */
        this.set( 'value', '' );
        this.set( 'isChecked', false );
        this.set('label', '');
        this.set( 'isEnabled', true );
        this.set( 'icon' );
        this._uid = uid();

        /**
         * The `id` attribute of the input (i.e. to pair with the `<label>` element).
         *
         * @observable
         * @member {String} #id
         */
        this.set( 'id' );


        /**
         * An instance of the input allowing the user to type a color value.
         *
         * @protected
         * @member {@ckEditor5/ui/inputtext/inputtextview~InputTextView}
         */
        this._inputView = new View(locale);
        this._inputView.setTemplate({
            tag: 'input',
            attributes: {
                class: [
                    'form-check-input',
                ],
                type : 'checkbox',
                id : this._uid,
                'checked': bind.if( 'isChecked' ),
                'aria-disabled': bind.if( 'isEnabled', true, value => !value ),
            }

        });

        this.iconView = new IconView();

        this.iconView.extendTemplate( {
            attributes: {
                class: 'ck-button__icon'
            }
        } );

        this._labelView = new View(locale);
        this._labelView.setTemplate({
            tag: 'label',
            attributes: {
                class: [
                    'form-check-label',
                ],
                for : this._uid
            },
            children: [
                {
                    text: this.bindTemplate.to( 'label' )
                },
                this.iconView
            ]

        });

        this.setTemplate( {
            tag: 'div',
            attributes: {
                class: [
                    'bs-view',
                    'form-check',
                    'form-switch'
                ],
                id: bind.to( 'id' ),
            },
            children: [
                this._inputView,
                this._labelView,
            ],

            on: {
                mousedown: bind.to( evt => {
                    evt.preventDefault();
                } ),

                click: bind.to( evt => {
                    // We can't make the button disabled using the disabled attribute, because it won't be focusable.
                    // Though, shouldn't this condition be moved to the button controller?
                    if ( this.isEnabled ) {
                        this.fire( 'execute' );
                    } else {
                        // Prevent the default when button is disabled, to block e.g.
                        // automatic form submitting. See ckeditor/ckeditor5-link#74.
                        evt.preventDefault();
                    }
                } )
            }
        } );

        this.on( 'change:value', ( evt, name, inputValue ) => this._setInputValue( inputValue ) );
    }
    render() {
        super.render();

        if ( this.icon ) {
            this.iconView.bind( 'content' ).to( this, 'icon' );
            this.children.add( this.iconView );
        }
    }

}
