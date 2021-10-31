
import AccordionView from "../../../../ui/bs-view/accordion/accordion-view";
import { uid } from 'ckeditor5/src/utils';
import SizingStyleView from "./style-element/sizing-style-view";
import BorderStyleView from "./style-element/border-style-view";
import StyleCommand from "../command/style-command";
import BackgroundStyleView from "./style-element/background-style-view";


export default class StyleView extends AccordionView {
    constructor(locale, editor, {defaultColors}) {
        super(locale);
        this.editor = editor;


        const bind = this.bindTemplate;
        const _this = this;

        this.set('_undoStepBatch', null);

        let styleViews = [];
        /**
         * An additional CSS class added to the {@link #element}.
         *
         * @observable
         * @member {String} #class
         */
        this.set( 'id', uid() );

        styleViews.push(new SizingStyleView(locale, editor));
        styleViews.push(new BorderStyleView(locale, editor, {defaultColors}));
        styleViews.push(new BackgroundStyleView(locale, editor, {defaultColors}));

        this.styleViews = styleViews;

        this.styleViews.forEach( (view)=>{
            this.addAccordionItem(view);
        } );

        this.extendTemplate({
            attributes : {
                class : [
                    bind.to('class')
                ],
                id : bind.to('id')
            }
        });

        _this.on( 'change:show', (evt, propertyName, newValue) =>{
            if(newValue === true){
                const styleCommand = this.editor.commands.get(StyleCommand.commandName);
                _this._undoStepBatch = _this.editor.model.createBatch();
                this.styleViews.forEach( (view)=>{
                    view.bind('_styles').to(styleCommand, 'value');
                    view.bind('_undoStepBatch').to(_this, '_undoStepBatch');
                } );
            }else {
                this.styleViews.forEach( (view)=>{
                    _this._undoStepBatch = null;
                    view.unbind('_styles');
                    view.unbind('_undoStepBatch');
                } );
            }
        });
    }
}
