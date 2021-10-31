
import BsView from "./form/bs-view";

export default class RowView extends BsView{
    constructor(locale) {
        super(locale);

        const bind = this.bindTemplate;

        this.set('rowClass');

        this.setTemplate({
            tag : 'div',
            attributes : {
                class : [
                    'row',
                    bind.to('rowClass'),
                    bind.to('class')
                ],
                id : bind.to('id')
            },
            children : this.children
        })
    }

}
