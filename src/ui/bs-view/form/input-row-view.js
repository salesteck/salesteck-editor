import { View } from 'ckeditor5/src/ui';
import { uid } from 'ckeditor5/src/utils';
import BsFormRowView from "./bs-form-row-view";
import {_isStrNotEmpty} from "../../../general";
import InputView from "./input-view";
import {viewCreator} from "../../utils";

export default class InputRowView extends BsFormRowView{
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
        this.set( 'type' );
        this.set( 'label' );
        this.set( 'placeholder' );
        this.set( 'errorText', null );
        this.set('labelSizeClass', 'col-7');
        this.set('inputGroupSizeClass', 'col-5');

        const _this = this;

        const labelView = new View(locale);
        labelView.setTemplate({
            tag : 'a',
            attributes : {
                class : [bind.to('labelSizeClass'), 'col-form-label', "px-0", 'tt-capitalize', 'text-c-info'],
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


        const inputView = new InputView(locale);
        inputView.set('id', inputId);
        inputView.bind('hasError').to(this, 'errorText', errorText => _isStrNotEmpty(errorText));
        inputView.bind('isReadOnly').to(this, 'isReadOnly');

        inputView.delegate('input').to(this);
        this.inputView = inputView;
        this.statusView = this._createStatusView( statusUid );

        const inputContainerView = new View(locale);
        inputContainerView.setTemplate({
            tag : 'div',
            attributes : {
                class : [bind.to('inputGroupSizeClass'), 'px-0', 'position-relative']
            },
            children : [inputView, this.statusView]
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
                    bind.to('class'),
                ]
            },
            children : this.children
        })
    }
    /**
     * Creates the status _view instance. It displays {@link #errorText} and {@link #infoText}
     * next to the {@link #fieldView}. See {_statusText}.
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
                    'end-0'
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
}
