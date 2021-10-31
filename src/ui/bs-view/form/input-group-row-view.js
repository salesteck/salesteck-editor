import { View, IconView } from 'ckeditor5/src/ui';
import { uid } from 'ckeditor5/src/utils';
import BsFormRowView from "./bs-form-row-view";
import {_isStrNotEmpty} from "../../../general";
import InputView from "./input-view";
import {viewCreator} from "../../utils";

export default class InputGroupRowView extends BsFormRowView{
    constructor(locale) {
        super(locale);
        // this.set('_collapse', false);
        this.set( 'value' );
        const bind = this.bindTemplate;
        const inputId = uid();
        const statusUid = `ck-input-view-status-${ uid() }`;

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */




        this.set( 'isReadOnly' );
        this.set( 'disableButton', false );
        this.set( 'hasBorder', false );
        this.set( 'rounded', false );
        this.set( 'type' );
        this.set( '_icon', null );
        this.set( 'label' );
        this.set('labelSizeClass', 'col-5');
        this.set('inputGroupSizeClass', 'col-7');
        this.set( 'placeholder' );
        this.set( 'errorText', null );

        const _this = this;


        const labelView = new View(locale);
        labelView.setTemplate({
            tag : 'a',
            attributes : {
                class : [bind.to('labelSizeClass'), 'col-form-label', "p-0", 'tt-capitalize', 'text-c-info'],
                role : bind.to('collapsible', value => value ? 'button' : '')
            },
            children : [
                {text : bind.to('label')}
            ],
            on : {
                click: labelView.bindTemplate.to('click'),
            }
        });
        labelView.on('click', function (){
            // eventInfo.stop();
            if(_this.collapsible){
                _this.collapsible.toggle();
            }
        });
        this.children.add(labelView);
        /**
         * The icon view of the button. Will be added to {@link #children} when the
         * {@link #icon icon attribute} is defined.
         *
         * @readonly
         * @member {@ckEditor5/ui/icon/iconview~IconView} #iconView
         */
        this.iconView = new IconView();

        this.iconView.extendTemplate( {
            attributes: {
                class: 'ck-button__icon'
            }
        } );

        const inputView = new InputView(locale);
        inputView.set({
            id : inputId,
            type : bind.to('type'),
            class : ['b-all']
        });
        inputView.bind('type').to(this, 'type');
        // inputView.set('id', inputId);
        // inputView.set('type', bind.to('type'));
        // inputView.set('class', ['b']);
        inputView.bind('hasError').to(this, 'errorText', errorText => _isStrNotEmpty(errorText));
        inputView.bind('isReadOnly').to(this, 'isReadOnly');

        inputView.delegate('input').to(this);



        this.inputView = inputView;


        const buttonView = viewCreator(locale, {
            tag: 'button'
        });

        this.buttonView = buttonView;
        this.buttonView.setTemplate({
            tag: 'button',
            attributes: {
                class: [
                    'input-group-text',
                    'btn', 'b-all', 'b-0-start', buttonView.bindTemplate.to('class'),
                    'tt-capitalize', 'btn-c-outline-dark', bind.if('isReadOnly', 'disabled'), bind.if('disableButton', 'disabled')],
                'type': 'button',
                'aria-disabled': bind.to('isReadOnly')
            },
            children : this.buttonView.children,
            on: {
                // mousedown: bind.to( evt => {
                //     evt.preventDefault();
                // } ),

                click: bind.to( evt => {
                    // We can't make the button disabled using the disabled attribute, because it won't be focusable.
                    // Though, shouldn't this condition be moved to the button controller?
                    if ( !_this.isReadOnly ) {
                        _this.value = _this.getValue();
                        _this.fire( 'execute' );
                    } else {
                        // Prevent the default when button is disabled, to block e.g.
                        // automatic form submitting. See ckeditor/link#74.
                        evt.preventDefault();
                    }
                } )
            }
        })
        this.buttonView.delegate( 'execute' ).to( this );

        this.statusView = this._createStatusView( statusUid );

        const inputGroup = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['has-validation', 'input-group', 'input-group-sm']
            },
            children: [
                buttonView, inputView, this.statusView
            ]
        });


        const inputContainerView = new View(locale);
        inputContainerView.setTemplate({
            tag : 'div',
            attributes : {
                class : [bind.to('inputGroupSizeClass'), 'px-0', 'position-relative']
            },
            children : [inputGroup]
        });
        this.children.add(inputContainerView);



        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'row',
                    'my-5',
                    bind.if('hasBorder', 'b-all'),
                    bind.if('rounded', 'rounded'),
                    bind.to('class')
                ]
            },
            children : this.children
        })
    }
    /**
     * Creates the status _view instance. It displays {@link #errorText} and {@link #infoText}
     * next to the {@link #fieldView}. See {@link #_statusText}.
     *
     * @private
     * @param {String} statusUid Unique id of the status, shared with the {@link #fieldView _view's}
     * `aria-describedby` attribute.
     * @returns {@ckEditor5/ui/_view~View}
     */
    _createStatusView( statusUid ) {
        const bind = this.bindTemplate;
        return viewCreator(this.locale, {
            tag: 'div',
            attributes: {
                class: [
                    bind.to( 'errorText', value => _isStrNotEmpty(value) ? 'invalid-tooltip' : '' ),
                    'end-0',
                    'rounded'
                ],
                id : statusUid
            },
            children: [
                {
                    text: bind.to( 'errorText')
                }
            ]
        })
    }
    getValue(){
        return this.inputView._getDomElementValue();
    }
    setValue(value){
        this.inputView._setDomElementValue(value);
    }

    render() {
        super.render();


        if ( this.icon ) {
            this.iconView.bind( 'content' ).to( this, 'icon' );
            this.buttonView.children.add(this.iconView);
        }
    }
}
