
import {
    View, IconView, TooltipView, ViewCollection
} from 'ckeditor5/src/ui';

export default class BsView extends View{
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;

        this.set('class');
        this.set('id');
        this.set('isDisplayed', false);


        this.children = this.createCollection();

        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'row',
                    bind.to('class')
                ],
                id : bind.to('id')
            },
            children : this.children
        })

    }

    addChildren(view){
        if(view){
            this.children.add(view);
        }
    }

    render(){
        super.render();
        // const _this =this;
        // // this.on('change:isDisplayed', (evt, propertyName, newValue) =>{
        // //     if(newValue){
        // //         _this.fire('show');
        // //     }else {
        // //         _this.fire('false');
        // //
        // //     }
        // // })
    }

}
