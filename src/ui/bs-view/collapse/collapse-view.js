import BsView from "../form/bs-view";
import { uid } from 'ckeditor5/src/utils';
import Collapse from 'bootstrap/js/src/collapse';


export default class CollapseView extends BsView{
    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;
        /**
         * @property {Boolean} enableCollapse
         */
        this.set('enableCollapse', false);
        /**
         * @property {null|Class} collapsible
         */
        this.set('collapsible', null);
        this.set('id', uid());

        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    bind.if('enableCollapse', 'collapse'),
                    bind.to('class')
                ],
                id : bind.to('id')
            },
            children : this.children
        });
    }

    render() {
        super.render();
        const _this = this;
        if(_this.enableCollapse){
            _this.collapsible = new Collapse(_this.element, {toggle : false});
        }
        _this.on('change:enableCollapse', (evt, propertyName, newValue) =>{
            if(newValue){
                if(_this.collapsible === null){
                    _this.collapsible = new Collapse(_this.element, {toggle : false});
                }
            }else {
                _this.collapsible = null;
            }
        })
    }

    showCollapse(){
        const _this = this;
        if(_this.collapsible){
            _this.collapsible.show();
            _this.fire('show');
        }
    }

    hideCollapse(){
        const _this = this;
        if(_this.collapsible){
            _this.collapsible.hide();
            _this.fire('hide');
        }
    }

    toggleCollapse(){
        const _this = this;
        if(_this.collapsible){
            _this.collapsible.toggle();
            _this.fire('toggle');
        }
    }


}
