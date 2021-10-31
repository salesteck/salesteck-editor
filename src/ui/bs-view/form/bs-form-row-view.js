import { View } from 'ckeditor5/src/ui';
import { uid } from 'ckeditor5/src/utils';
import Collapse from 'bootstrap/js/src/collapse';
import {viewCreator} from "../../utils";
export default class BsFormRowView extends View {
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'show', false );
        this.set( 'hasBorder', false );
        this.set( 'rounded', false );
        this.set( 'class' );
        this.set( 'title' );
        this.set( 'value' );
        this.set('hasSubElement', false);
        this.set('collapsable');
        this.set('_expanded', false);
        /**
         * @property {Boolean} _collapse
         */
        this.set('_collapse', false);
        /**
         * @property {String} _collapseContainerId
         */
        this.set('_collapseContainerId',  uid());


        this.collapseContainer = null;

        this.children = this.createCollection();

        // this._collapseContainerId = uid();

        this.collapseElement = this.createCollection();


        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'row',
                    'my-5',
                    bind.if('hasBorder', 'b-all'),
                    bind.if('rounded', 'rounded'),
                    bind.to('class'),
                    bind.if('hasSubElement', 'has-sub-element'),
                    bind.to('_expanded', value => value ? 'expanded' : '')
                ]
            },
            children : this.children
        })

    }

    _addSubItem(element){
        // console.log(`_addSubItem`, {element});
        if(element){
            this.collapseElement.add(element);
            this.set('hasSubElement', true);
        }
    }

    render(){
        super.render();
        const _this = this;
        if(this.title){
            this.children.add(viewCreator(_this.locale, {
                tag : 'div',
                attributes : {
                    class : ['dropdown-label', 'col-12', 'px-0', 'py-10', 'tt-uppercase', 'fw-bold']
                },
                children : [{text : _this.title}]
            }), 0);

        }
        // if(this.collapseElement.length > 0){

            const collapseContainer = this._createCollapseContainer();

            // for (let element of this.collapseElement){
            //     collapseContainer.children.add(element);
            //     // run code
            // }
            collapseContainer.render();

            collapseContainer.element.addEventListener('show.bs.collapse', function (e) {
                _this.fire('expand');
                _this._expanded = true;
                e.stopPropagation();
            });
            collapseContainer.element.addEventListener('shown.bs.collapse', function (e) {
                e.stopPropagation();
            });
            collapseContainer.element.addEventListener('hide.bs.collapse', function (e) {
                _this.fire('collapse');
                _this._expanded = false;
                e.stopPropagation();
            });
            collapseContainer.element.addEventListener('hidden.bs.collapse', function (e) {
                e.stopPropagation();
            });
            if(this._collapse){
                this.collapsable = new Collapse(collapseContainer.element, {toggle : false});
            }
            this.collapseContainer = collapseContainer;
            this.children.add(this.collapseContainer);
        // }
        this.on('change:show', (evt, propertyName, newValue, oldValue)=>{
            // console.log( `BsFormRowView:${ propertyName } has changed from ${ oldValue } to ${ newValue }`, {collapsable: _this.collapsable, _this} );
            if(newValue === false){
                if(_this.collapsable){
                    _this.collapsable.hide();
                }
            }
        });
    }

    _createCollapseContainer(){
        const _this = this;
        const bind = _this.bindTemplate;

        const collapseContainer = new View(_this.locale);

        collapseContainer.set({
            children : collapseContainer.createCollection()
        });
        collapseContainer.setTemplate({
            tag : 'div',
            attributes : {
                class : [bind.to('_collapse', value => value ? 'collapse' : '')],
                id : bind.to('_collapseContainerId')
            },
            children : this.collapseElement
        });
        return collapseContainer;
    }
}
