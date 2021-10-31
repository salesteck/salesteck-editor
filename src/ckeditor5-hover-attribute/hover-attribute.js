import {Plugin} from 'ckeditor5/src/core';
import ToggleHoverIcon from '../theme/icon/attribute/toggle-hover.svg';
import ToggleActiveIcon from '../theme/icon/attribute/toggle-active.svg';
import {SwitchButtonView} from "ckeditor5/src/ui";
import {_addCommand} from "../engine/utils/commands";
import AttrStateCommand from "./command/attr-state-command";
export const HOVER_STATE = "hoverState";
export const ACTIVE_STATE = "activeState";
import './theme/style.css';
import BlocksEditing from "../_block/block/blocks-editing";
import IconView from "@ckeditor/ckeditor5-ui/src/icon/iconview";
import InlineElementEditing from "../module/inline/element/inline-element-editing";
export default class HoverAttribute extends Plugin{
    static get pluginName(){
        return 'HoverAttribute';
    }

    constructor(editor) {
        super(editor);
        editor.conversion.for('editingDowncast').add(dispatcher =>{
            dispatcher.on(`attribute:${HOVER_STATE}`, (evt, data, {writer, mapper} ) =>{
                if(!data.item){
                    return;
                }
                let viewElement = mapper.toViewElement(data.item);
                if(!viewElement){
                    return;
                }
                // console.log(`${evt.name}`, {evt, data, viewElement});
                if(data.attributeNewValue){
                    writer.addClass('hover', viewElement);
                    // writer.setAttribute(HOVER_STATE, !!data.attributeNewValue, viewElement);
                }else {
                    writer.removeClass('hover', viewElement)
                    // if(viewElement.hasAttribute(data.attributeKey)){
                    //     // writer.removeAttribute(HOVER_STATE, viewElement)
                    //     writer.removeClass('hover', viewElement)
                    // }
                }
                evt.stop();

            })
        });
        editor.conversion.for('editingDowncast').add(dispatcher =>{
            dispatcher.on(`attribute:${ACTIVE_STATE}`, (evt, data, {writer, mapper} ) =>{
                if(!data.item){
                    return;
                }
                let viewElement = mapper.toViewElement(data.item);
                if(!viewElement){
                    return;
                }
                // console.log(`${evt.name}`, {evt, data, viewElement});
                if(data.attributeNewValue){
                    writer.addClass('active', viewElement);
                    // writer.setAttribute(HOVER_STATE, !!data.attributeNewValue, viewElement);
                }else {
                    writer.removeClass('active', viewElement)
                    // if(viewElement.hasAttribute(data.attributeKey)){
                    //     // writer.removeAttribute(HOVER_STATE, viewElement)
                    //     writer.removeClass('hover', viewElement)
                    // }
                }
                evt.stop();

            })
        });
        this._addToolbarComponent();
        this._addToolbarComponent(BlocksEditing.contentModelName);
        this._addToolbarComponent(InlineElementEditing.modelName);

    }

    _addToolbarComponent(modelName = ''){
        const editor = this.editor;
        const hoverStateCommandName = `${HOVER_STATE}_${modelName}`;
        const hoverStateCommand = _addCommand(editor, hoverStateCommandName, new AttrStateCommand(editor, {modelName, attrName : HOVER_STATE}));
        editor.ui.componentFactory.add( hoverStateCommandName, locale => {
            // The state of the button will be bound to the widget command.
            // const command = editor.commands.get( commandName);

            // The button will be an instance of BsButtonView.
            const buttonView = new SwitchButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                icon : ToggleHoverIcon,
                label: 'toggle hover',
                withText: false,
                tooltip: true,
                _command : {
                    name : hoverStateCommandName
                }
            } );
            buttonView.extendTemplate({
                attributes : {
                    class : ['ct-hover-state-element']
                }
            })

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn' ).to( hoverStateCommand, 'value', value => value === true );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', (evt) => {
                editor.execute( evt.source._command.name)
            } );

            return buttonView;
        } );
        // const activeStateCommandName = `${ACTIVE_STATE}_${modelName}`;
        // const activeStateCommand = _addCommand(editor, activeStateCommandName, new AttrStateCommand(editor, {modelName, attrName : ACTIVE_STATE}));
        // editor.ui.componentFactory.add( activeStateCommandName, locale => {
        //     // The state of the button will be bound to the widget command.
        //     // const command = editor.commands.get( commandName);
        //
        //     // The button will be an instance of BsButtonView.
        //     const buttonView = new SwitchButtonView( locale );
        //
        //     buttonView.set( {
        //         // The t() function helps localize the editor. All strings enclosed in t() can be
        //         // translated and change when the language of the editor changes.
        //         icon : ToggleActiveIcon,
        //         label: 'toggle active',
        //         withText: false,
        //         tooltip: true
        //     } );
        //     buttonView.extendTemplate({
        //         attributes : {
        //             class : ['ct-hover-state-element']
        //         }
        //     })
        //
        //     // Bind the state of the button to the command.
        //     buttonView.bind( 'isOn' ).to( activeStateCommand, 'value', value => value === true );
        //
        //     // Execute the command when the button is clicked (executed).
        //     this.listenTo( buttonView, 'execute', () => {
        //         activeStateCommand.execute();
        //         // editor.execute( commandName)
        //     } );
        //
        //     return buttonView;
        // } );
    }
    afterInit(){
        // const editor = this.editor;
        // this.listenTo(editor, 'ready', (evt)=>{
        //     const domRoots = editor.editing.view.domRoots;
        //     let sections = [];
        //     for(const [rootName, root] of domRoots){
        //         const founded = root.querySelectorAll('.reveal');
        //         sections = [... new Set([...sections, ...founded])];
        //         console.log({rootName, root, founded});
        //     }
        //     console.log({ domRoots, newSet : new Set(sections), sections});
        //     domRoots.forEach( (value, key) =>{
        //         console.log({key, value});
        //
        //     })
        //     Object.entries(domRoots).map( ([ rootName, domRoot])=>{
        //         console.log({rootName, domRoot});
        //     } );
        //     Object.keys(domRoots).map( rootName =>{
        //         console.log({rootName});
        //     } );
        //     Object.values(domRoots).map( domRoot =>{
        //         console.log({domRoot});
        //     } );
        // })
    }

}


export function _addHoverState(viewElement, writer){
    const hoverStateView = writer.createUIElement( 'div', { class: 'ct ct-hover-state-element-view' }, function( domDocument ) {
        const domElement = this.toDomElement( domDocument );

        // Use the IconView from the ui library.
        const icon = new IconView();
        icon.set( 'content', ToggleHoverIcon );

        // Render the icon view right away to append its #element to the selectionHandle DOM element.
        icon.render();

        domElement.appendChild( icon.element );

        return domElement;
    } );

    // Append the selection handle into the widget wrapper.
    writer.insert( writer.createPositionAt( viewElement, 'end' ), hoverStateView );
    writer.addClass( [ 'ct-element-with-hover-state' ], viewElement );
    writer.setCustomProperty( 'hasHoverStateChild', true, viewElement );
}
