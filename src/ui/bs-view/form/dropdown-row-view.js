import {uid} from 'ckeditor5/src/utils';
import BsFormRowView from "./bs-form-row-view";
import {viewCreator} from "../../utils";
import Dropdown from 'bootstrap/js/src/dropdown';

export default class DropdownRowView extends BsFormRowView {
    constructor(locale, options = {}) {
        super(locale);
        const bind = this.bindTemplate;
        const t = locale.t;
        const buttonId = uid();
        const _this = this;
        let columns = 1;
        if ( options && options.columns ) {
            columns = options.columns;
        }
        this.set( 'columns', columns );
        this.set( 'singleChoice', true );
        this.set('labelSizeClass', 'col-7');
        this.set('dropdownSizeClass', 'col-5');
        this.set( 'isReadOnly', false );

        this._dropddownItems = this.createCollection();

        const labelView = viewCreator(locale, {
            tag: 'a',
            attributes: {
                class: [bind.to('labelSizeClass'), 'col-form-label', "ps-0", "py-0", 'tt-capitalize', 'text-c-info', 'fs-sm', 'user-select-none'],
                role : bind.to('collapsable', collapsable => collapsable ? 'button' : '')
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
        labelView.on('click', function (e) {
            e.stop();
            // console.log("click", {collapsable : _this.collapsable, e});
            if (_this.collapsable) {
                _this.collapsable.toggle();
            }
        });
        this.children.add(labelView);


        const dropdownContent = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['dropdown-content', 'd-grid', 'p-5'],
                style : {
                    // gridTemplateColumns : `repeat( ${ columns }, 1fr)`
                    gridTemplateColumns : bind.to('columns', col =>`repeat( ${ col }, 1fr)`)
                }
            },
            children : this._dropddownItems
        });
        const dropdownMenu = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: ['dropdown-menu', 'dropdown-menu-end'],
                'aria-labelledby' : buttonId
            },
            children: [dropdownContent]
        });

        const buttonView = viewCreator(locale, {
            tag: 'button',
            attributes: {
                class: ['btn', 'b-all', 'btn-s-sm', 'fs-xsmall', 'rounded', 'dropdown-toggle', 'w-p100', 'btn-c-outline-dark', bind.if('isReadOnly', 'disabled')],
                'data-bs-toggle': 'dropdown',
                type: 'button',
                role: 'button',
                'data-bs-auto-close'  : bind.to('singleChoice', singleChoice=> singleChoice ===true ? 'true' : 'outside'),
                'aria-disabled': bind.to('isReadOnly'),
                id : buttonId
            },
            children: [
                {text: bind.to('value', value => value ? (value) : t('Select'))}
            ]
        });

        const dropdownContainerView = viewCreator(locale, {
            tag: 'div',
            attributes: {
                class: [bind.to('dropdownSizeClass'), 'px-0']
            },
            children: [
                buttonView, dropdownMenu
            ]
        });



        buttonView.render();
        this.buttonView = buttonView;
        this.dropdownContainerView = dropdownContainerView;

        this.children.add(dropdownContainerView);


        dropdownContainerView.once('render', ()=>{
            new Dropdown(_this.buttonView);
        })
        this.extendTemplate({
            attributes : {
                class : ['dropdown-row']
            }
        })

    }

    _addDropdownItem(item) {
        this._dropddownItems.add(item);
    }

    render() {
        super.render();
    }
}
