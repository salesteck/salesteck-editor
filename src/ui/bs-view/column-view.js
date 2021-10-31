
import BsView from "./form/bs-view";

export default class RowView extends BsView{
    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;

        this.set('columnClass');


        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'col',
                    bind.to('columnClass'),
                    bind.to('class')

                ],
                id : bind.to('id')
            },
            children : this.children
        })
    }

}
