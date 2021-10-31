
import AccordionView from "../../../../ui/bs-view/accordion/accordion-view";
import { uid } from 'ckeditor5/src/utils';
import GridContainerView from "./grid-container-view";
export default class ElementsView extends AccordionView{

    constructor(locale, editor) {
        super(locale);
        this.editor = editor;


        const bind = this.bindTemplate;
        this.set('_undoStepBatch', null);



        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'id', uid() );


        this.extendTemplate({
            attributes : {
                class : [
                    bind.to('class')
                ],
                id : bind.to('id')
            }
        });
    }

    render() {
        return new Promise( resolve => {
            this.on( 'loaded', resolve );
            super.render();
        } );
    }
    /**
     * A utility that expands the plain toolbar configuration into
     *
     * @param {Array.<String>|Object} items The toolbar items or the entire toolbar configuration object.
     */
    _fillFromConfig( items ) {
        const _this = this;
        // console.log(items);
        items.forEach( (item)=>{

            // console.log({item})
            const gridView = new GridContainerView(_this.locale, _this.editor);
            gridView.set('title', item.title);
            gridView.delegate('dragstart').to(_this);
            gridView.delegate('dragend').to(_this);
            gridView.render();
            gridView._fillFromConfig(item.elements);
            _this.addAccordionItem(gridView);
        } )
    }
}
