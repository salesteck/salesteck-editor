
import { Collection, uid } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';
import {  Model } from 'ckeditor5/src/ui';
import {viewCreator} from "../../../../../ui/utils";
// import ListSeparatorView from "@ckeditor/ckeditor5-ui/src/list/listseparatorview";
import BsButtonView from "../../../../../ui/bs-view/form/bs-button-view";
import InputView from "../../../../../ui/bs-view/form/input-view";
import {_isStrNotEmpty} from "../../../../../general";
import BsFormRowView from "../../../../../ui/bs-view/form/bs-form-row-view";
import Dropdown from "bootstrap/js/src/dropdown";

function _getColorDefinitions(view, colors, styleProperty){
    const itemDefinitions = new Collection();
    colors.forEach( elem =>{
        const definition = {
            type: 'button',
            model: new Model( {
                _value: elem.color,
                attributes : {
                    style : {
                        backgroundColor : elem.color
                    },
                    class : [elem.color]
                },
            } )
        };

        definition.model.bind( 'isOn' ).to( view, '_styles', _styles =>{
            return  _styles ? _styles.getAsString(styleProperty) === elem.color : false;
        });
        itemDefinitions.add( definition );
    });


    return itemDefinitions;
}
function _addColorsToDropdown( dropdownView, items ) {
    const locale = dropdownView.locale;

    dropdownView._dropddownItems.bindTo( items ).using( ( { type, model } ) => {
        if ( type === 'separator' ) {
            // return new ListSeparatorView( locale );
        } else if ( type === 'button' || type === 'switchbutton' ) {
            let buttonView;

            if ( type === 'button' ) {
                buttonView = new BsButtonView( locale );
            } else {
                // buttonView = new SwitchButtonView( locale );
            }
            buttonView.extendTemplate({
                attributes : {
                    class : ['m-2'],
                    style : {
                        backgroundColor : model._value,
                        minWidth : '30px',
                        height : '30px'
                    }
                }
            })

            // Bind all model properties to the button _view.
            buttonView.bind( ...Object.keys( model ) ).to( model );
            buttonView.delegate( 'execute' ).to( dropdownView );


            return buttonView;
        }
    } );
}


export default class ColorDropdownView extends BsFormRowView{

    constructor(locale, {columns, defaultColors, styleProperty }) {

        super(locale);
        const bind = this.bindTemplate;

        const buttonId = uid();
        const inputId = uid();

        const _this = this;
        let defaultColumn = 1;
        if ( columns ) {
            defaultColumn = columns;
        }
        this.set({
            isReadOnly : false,
            label : _this.t('Colors'),
            class :'p-10 b rounded'
        });

        this.content = this.createCollection();

        this._dropddownItems = this.createCollection();

        const labelView = viewCreator(locale, {
            tag: 'a',
            attributes: {
                class: ['col-12', 'col-form-label', "px-0", 'tt-capitalize', 'text-c-info'],
                role: bind.if('hasSubElement', 'button'),
            },
            children: [
                {text: bind.to('label')}
            ]
        });
        labelView.extendTemplate({
            on: {
                click: labelView.bindTemplate.to('click'),
            }
        });
        labelView.on('click', function () {
            if (_this.collapsible) {
                _this.collapsible.toggle();
            }
        });
        this.children.add(labelView);


        const inputView = new InputView(locale);
        inputView.set({
            id : inputId,
            hasBorder : true
        });
        inputView.bind('hasError').to(this, 'errorText', errorText => _isStrNotEmpty(errorText));
        inputView.bind('isReadOnly').to(this, 'isReadOnly');

        inputView.delegate('input').to(this);



        this.inputView = inputView;
        this.content.add(inputView);






        const colorInputView = new InputView(locale);
        colorInputView.set({
            id : uid(),
            hasBorder : true,
            type : 'color'
        });
        colorInputView.bind('hasError').to(this, 'errorText', errorText => _isStrNotEmpty(errorText));
        colorInputView.bind('isReadOnly').to(this, 'isReadOnly');

        this.colorInputView = colorInputView;
        this.content.add(this.colorInputView);


        const buttonView = viewCreator(locale, {
            tag: 'button',
            class : ''
        });

        buttonView.setTemplate({
            tag: 'button',
            attributes: {
                class: ['btn', 'b-all', 'dropdown-toggle', 'tt-capitalize', bind.if('isReadOnly', 'disabled'), buttonView.bindTemplate.to('class')],
                'data-bs-toggle': 'dropdown',
                'type': 'button',
                'aria-disabled': bind.to('isReadOnly'),
                id : buttonId
            },
            children: buttonView.children
        });

        buttonView.delegate( 'execute' ).to( this );

        buttonView.render();

        this.buttonView = buttonView;

        this.content.add(buttonView);




        const dropdownContent = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['dropdown-content', 'd-grid', 'p-5'],
                style : {
                    gridTemplateColumns : `repeat( ${ defaultColumn }, auto)`
                }
            },
            children : this._dropddownItems
        });

        const dropdownMenu = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['dropdown-menu', 'dropdown-menu-end', 'shadow'],
                'aria-labelledby' : buttonId,
                style : {
                    transition : 'unset'
                }
            },
            children: [dropdownContent]
        });
        this.dropdownMenu = dropdownMenu;
        this.content.add(dropdownMenu);

        const inputGroup = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['input-group']
            },
            children : this.content
        });

        const dropdownContainerView = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['col-12', 'px-0']
            },
            children: [
                inputGroup
            ]
        });


        this.dropdownContainerView = dropdownContainerView;

        this.children.add(dropdownContainerView);


        dropdownContainerView.once('render', ()=>{
            new Dropdown(_this.buttonView);
        });

        this.extendTemplate({
            attributes : {
                class : ['']
            }
        })

        const removeButton = new BsButtonView(locale);
        removeButton.extendTemplate({
            attributes : {
                class : ['m-2', 'fs-xsmall'],
                style : {
                    gridColumnEnd : `span ${columns}`
                }
            }
        });

        removeButton.set({
            icon : icons.eraser,
            _value : '',
            label : _this.t( 'Remove color' )
        });
        removeButton.delegate('execute').to(this);
        this._addDropdownItem(removeButton);

        _addColorsToDropdown(this, _getColorDefinitions(this, defaultColors, styleProperty));
    }

    _addDropdownItem(item) {
        this._dropddownItems.add(item);
    }


    render() {
        super.render();
        const _this = this;
        this.on('change:isReadOnly', ( eventInfo, propertyName, newValue, oldValue)=>{
            // console.log( `ColorDropdownView:${ propertyName } has changed from ${ oldValue } to ${ newValue }` );
            _this.colorInputView.element.disabled = newValue;
        })
    }

}
