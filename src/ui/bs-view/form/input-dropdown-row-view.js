import {uid, Collection} from 'ckeditor5/src/utils';
import BsFormRowView from "./bs-form-row-view";
import {viewCreator} from "../../utils";
import Dropdown from 'bootstrap/js/src/dropdown';
import InputView from "./input-view";
import {_isStrNotEmpty} from "../../../general";
// import Collection from "@ckeditor/ckeditor5-utils/src/collection";

export default class InputDropdownRowView extends BsFormRowView {
    constructor(locale, options = {}) {
        super(locale);
        const bind = this.bindTemplate;

        const buttonId = uid();
        const inputId = uid();

        const _this = this;
        let defaultColumn = 1;
        if ( options && options.columns ) {
            defaultColumn = options.columns;
        }
        this.set( 'isReadOnly', false );
        this.set( 'singleChoice', true );
        this.content = this.createCollection();

        this._dropddownItems = this.createCollection();

        const labelView = viewCreator(locale, {
            tag: 'a',
            attributes: {
                class: ['col-5', 'col-form-label', "px-0", 'tt-capitalize', 'text-c-info'],
                // 'data-bs-toggle' : bind.if('hasSubElement', "collapse"),
                // target : bind.if('hasSubElement', '#'+this._collapseContainerId),
                role: bind.if('hasSubElement', 'button'),
                // for : inputId
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
        inputView.set('id', inputId);
        inputView.set('class', ['b']);
        inputView.bind('hasError').to(this, 'errorText', errorText => _isStrNotEmpty(errorText));
        inputView.bind('isReadOnly').to(this, 'isReadOnly');

        inputView.delegate('input').to(this);



        this.inputView = inputView;
        this.content.add(inputView);


        const buttonView = viewCreator(locale, {
            tag: 'button',
            class : ''
        });

        buttonView.setTemplate({
            tag: 'button',
            attributes: {
                class: ['btn', 'b', 'dropdown-toggle', 'tt-capitalize', bind.if('isReadOnly', 'disabled'), buttonView.bindTemplate.to('class')],
                'data-bs-toggle': 'dropdown',
                'type': 'button',
                'data-bs-auto-close'  : bind.to('singleChoice', singleChoice=> singleChoice ===true ? 'true' : 'outside'),
                'aria-disabled': bind.to('isReadOnly'),
                id : buttonId
            },
            children: buttonView.children
        });
        buttonView.delegate( 'execute' ).to( this );


        this.buttonView = buttonView;
        this.content.add(buttonView);


        const dropdownContent = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['dropdown-content', 'd-grid', 'p-5'],
                style : {
                    gridTemplateColumns : `repeat( ${ defaultColumn }, 1fr)`
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
            // children : this.content
            // children: [
            //     inputView, buttonView, dropdownMenu
            // ]
        });
        inputGroup.setTemplate({
            tag: 'div',
            attributes: {
                class: ['input-group']
            },
            children : this.content
        })

        const dropdownContainerView = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['col-7', 'px-0']
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
        // this.once('render', ()=>{
        //     new Dropdown(_this.buttonView);
        // });
        this.extendTemplate({
            attributes : {
                class : ['']
            }
        })

    }

    _addDropdownItem(item) {
        this._dropddownItems.add(item);
    }


}
