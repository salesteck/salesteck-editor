import {
    View, ButtonView
} from 'ckeditor5/src/ui';

import {uid} from 'ckeditor5/src/utils';
import Collapse from 'bootstrap/js/src/collapse';
export default class AccordionItemView extends View{

    constructor(locale, editor, options = {}) {
        super(locale);
        this.editor = editor;
        this.options = options;

        const bind = this.bindTemplate;

        const collapseId = uid();

        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'title', '' );
        this.set( 'class' );
        this.set( 'width' );
        this.set( 'show', false );
        this.set( 'display', true );
        this.set( '_isEnabled', true );
        this.set( 'isCollapsed', true );
        this.set( 'collapseId', collapseId );
        this.set( 'content', this.createCollection() );
        this.set( 'collapseOnHide', true );
        const button = new ButtonView(locale);
        button.setTemplate({
            tag : 'button',
            isEnabled : false,
            attributes : {
                class : [
                    'accordion-button',
                    'tt-capitalize',
                    bind.if( '_isEnabled', 'disabled', value => !value ),
                    bind.if( 'isCollapsed', 'collapsed')
                ],
                'type' : 'button',
                'role' : 'button',
                'data-bs-toggle' : bind.if( '_isEnabled', 'collapse' ),
                // 'data-bs-target' : "#"+collapseId,
                'aria-expanded' : bind.to('isCollapsed', value => !value ? 'true' : 'false'),
                'aria-controls' : collapseId,
                'aria-disabled' : bind.to('_isEnabled', value => !value ? 'true' : 'false')
            },
            children : [{text : bind.to('title')}],
            on : {
                click : button.bindTemplate.to('click')
            }
        });
        this.button = button;
        const header = new View(locale);
        header.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'accordion-header'
                ]
            },
            children : [button]
        });
        this.content.add(header);

        this.collapseBody = null;

        const accordionBody = new View(locale);
        accordionBody.set('children', accordionBody.createCollection());
        accordionBody.setTemplate({
            tag : 'div',
            attributes : {
                class : ['accordion-body']
            },
            children : accordionBody.children
        });
        this.accordionBody = accordionBody;


        const collapseElement = new View(locale);

        collapseElement.setTemplate({
            tag : 'div',
            attributes : {
                class : ['accordion-collapse', 'collapse', 'container'],
                id : bind.to('collapseId')
            },
            children : [
                accordionBody
            ]
        });
        this.collapseElement = collapseElement;
        this.content.add(collapseElement);

        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'accordion-item',
                    bind.to('class'),
                    bind.if('display', 'd-none',( value ) => !value)
                ]
            },
            children : this.content
        })


    }

    _getBody(options = {}){
        return [];
    }

    render(){
        super.render();
        const _this = this;

        _this.accordion = new Collapse(_this.collapseElement.element, {toggle : false});

        _this.collapseElement.element.addEventListener('show.bs.collapse', function (e) {
            e.stopPropagation();
            _this.fire('show');
            if(_this.collapseBody === null){

                _this.collapseBody = _this._getBody(_this.options);
                _this.collapseBody.forEach(element =>{
                    _this.accordionBody.children.add(element);
                })
            }
            _this.set('isCollapsed', false);
        });
        _this.collapseElement.element.addEventListener('shown.bs.collapse', function (e) {
            e.stopPropagation();
            _this.fire('shown');
            // _this.set('isCollapsed', false);
        });
        _this.collapseElement.element.addEventListener('hide.bs.collapse', function (e) {
            e.stopPropagation();
            _this.fire('hide');
            _this.set('isCollapsed', true);
        });
        _this.collapseElement.element.addEventListener('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            _this.fire('hidden');
            // _this.set('isCollapsed', true);
        });
        _this.accordion.hide();

        _this.button.on('click', () =>{
            if(_this._isEnabled){
                if(_this.isCollapsed){
                    _this._showAccordion();
                }else {
                    _this._hideAccordion();
                }
            }
        })

        _this.on('change:show', (evt, propertyName, newValue)=>{
            // console.log( `AccordionItemView:${ propertyName } has changed from ${ oldValue } to ${ newValue }`/*, {collapse: collapse}*/ );
            if(newValue === false && _this.collapseOnHide){
                _this.set('isCollapsed', !newValue);
                _this.accordion.hide();
            }
        });
        // this.on('change:isCollapsed', (evt, propertyName, newValue) =>{
        //     if(newValue ===  false){
        //         _this.fire('show');
        //         // if(_this.collapseBody === null){
        //         //
        //         //     _this.collapseBody = _this._getBody(_this.options);
        //         //     _this.collapseBody.forEach(element =>{
        //         //         _this.accordionBody.children.add(element);
        //         //     })
        //         // }
        //     }
        //     else {
        //         _this.fire('hide');
        //     }
        // });
    }

    _hideAccordion(){
        // this.set('isCollapsed', true);
        this.accordion.hide()

    }
    _showAccordion(){
        // this.set('isCollapsed', false);
        this.accordion.show();
    }
}
