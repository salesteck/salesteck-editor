import {Plugin} from 'ckeditor5/src/core';
import {
    addListToDropdown,
    ButtonView,
    createDropdown,
    DropdownButtonView,
    Model,
    SwitchButtonView
} from "ckeditor5/src/ui";
import eyeSlashIcon from './theme/icon/eye-slash.svg';
import eyePlusIcon from './theme/icon/eye-plus.svg';
import cogsIcon from "../../theme/icon/cogs.svg";
import toolsIcon from "../../theme/icon/tools.svg";
import {Collection} from "ckeditor5/src/utils";
import {_addCommand, _getCommand} from "../../engine/utils/commands";
import ToggleVisibilityCommand from "./commands/toggle-visibility-command";
import ToggleComponentCommand from "./commands/toggle-component-command";
import ToggleAttrModelElementCommand from "./commands/toggle-attr-model-element-command";
import {BS_ATTR} from "../attr-converter/_bs/_attr/bs-attr-converter";
import SingleAttrFormView from "../../ui/view/single-attr-form-view";
import shieldLockIcon from "../../theme/icon/attribute/shield-lock.svg";
import startClock from "../../theme/icon/attribute/start-clock.svg";
import ModelAttrCommand from "./commands/model-attr-command";
import {_isStrNotEmpty} from "../../general";
import InsertHiddenElementAtRootCommand from "./commands/insert-hidden-element-at-root-command";
import InsertHiddenElementAtRootCommandAjax from "./commands/insert-hidden-element-at-root-command-ajax";

export const HIDDEN_COMP_UI_NAME = {
    show : 'show',
    hide : 'hide',
    active : 'active',
    children : 'children',
};

export default class HiddenComponents extends Plugin{
    static get pluginName(){
        return 'HiddenComponents'
    }
    constructor(editor) {
        super(editor);

    }

    init(){
        this._setUpModal();
        this._setUpOffCanvas();
        this._setUpAddHiddenComponent();

    }

    _setUpAddHiddenComponent(){
        const editor = this.editor;
        if(HiddenComponents._hiddenElementsAdd.length && _isStrNotEmpty(editor.config.get('componentUrl'))){
            const commandName = `addHiddenComponents`;
            const componentFactoryName = `addHiddenComponents`;
            const childElementsDefinition = new Collection();
            _addCommand(editor, commandName, new InsertHiddenElementAtRootCommandAjax(editor));
            HiddenComponents._hiddenElementsAdd.forEach( ({ modelName, htmlDefinition, icon, selector}) =>{
                const templateUrl = editor.config.get(`${modelName}.templateUrl`);
                if(_isStrNotEmpty(templateUrl)){

                    const definition = {
                        type: 'button',
                        model: new Model( {
                            _command: {
                                modelName,
                                commandName,
                                htmlDefinition,
                                url : templateUrl,
                                selector
                            },
                            label: editor.t(`Add ${modelName}`),
                            withText: true,
                            icon: icon,
                        } )
                    };
                    childElementsDefinition.add( definition );
                }
            } );
            if(childElementsDefinition.length){
                editor.ui.componentFactory.add(componentFactoryName, locale => {
                    const command = _getCommand(editor, commandName);
                    const dropdownView = createDropdown( locale, DropdownButtonView );
                    const dropdownButton = dropdownView.buttonView;
                    dropdownButton.set( {
                        icon: eyePlusIcon,
                        label: editor.t('Add hidden components'),
                        withText: false,
                        tooltip: true,
                    } );

                    addListToDropdown( dropdownView, childElementsDefinition );
                    dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled' );
                    // dropdownView.isEnabled = false;
                    this.listenTo( dropdownView, 'execute', evt => {
                        const {modelName, htmlDefinition, url, selector} = evt.source._command;
                        // console.log(`_setUpAddHiddenComponent:dropdownView:execute`, {evt, modelName , htmlDefinition, url, selector, commandName});
                        // editor.execute( commandName, {modelName , htmlDefinition} );
                        editor.execute( evt.source._command.commandName, {modelName , htmlDefinition, url, selector} );
                        // editor.editing.view.document.isFocused = false;
                    } );

                    return dropdownView;
                });
            }

        }

    }
    _setUpModal(){
        this._addVisibilityToggleComponentFactory('modal', HIDDEN_COMP_UI_NAME.hide, eyeSlashIcon );

        this._addChildElementsComponentFactory('modal', HIDDEN_COMP_UI_NAME.children, [
            {childComponentName :'modal-header', position : 0, label : 'header'},
            {childComponentName :'modal-footer', position : 'end', label : 'footer'}
        ] );

        this._addSwitchAttrComponentFactory('modal', 'SwitchAttr', [
            {
                modelElementName : 'modal',
                attrs : [
                    {label : 'keyboard', attrName : BS_ATTR.keyboard},
                    {label : 'focus', attrName : BS_ATTR.focus},
                    {label : 'backdrop', attrName : BS_ATTR.backdrop},
                ]
            },

            {
                modelElementName : 'modal-dialog',
                attrs : [
                    {label : 'center vertical', attrName : 'dialog-centered'},
                    {label : 'scrollable', attrName : 'dialog-scrollable'},
                ]
            }
        ] );

        this._addIdAttrComponentFactory('modal', 'id');
        this._addAutoToggleAttrComponentFactory('modal', 'auto-toggle');

    }
    _setUpOffCanvas(){

        this._addVisibilityToggleComponentFactory('offcanvas', HIDDEN_COMP_UI_NAME.hide, eyeSlashIcon );

        this._addChildElementsComponentFactory('offcanvas', HIDDEN_COMP_UI_NAME.children, [
            {childComponentName :'offcanvas-header', position : 0, label : 'header'},
            // {childComponentName :'offcanvas-footer', position : 'end', label : 'footer'}
        ] );
        this._addSwitchAttrComponentFactory('offcanvas', 'SwitchAttr', [
            {
                modelElementName : 'offcanvas',
                attrs : [
                    {label : 'backdrop', attrName : BS_ATTR.backdrop},
                    {label : 'scroll', attrName : BS_ATTR.scroll},
                ]
            }
        ] );
        this._addIdAttrComponentFactory('offcanvas', 'id');

        this._addAutoToggleAttrComponentFactory('offcanvas', 'auto-toggle');

    }

    _addVisibilityToggleComponentFactory(modelName, componentName, icon){
        const editor = this.editor;
        const commandName = `toggleVisibility${modelName}`;
        const toggleVisibilityCmd = _addCommand(editor, commandName, new ToggleVisibilityCommand(editor, {modelName}));

        editor.ui.componentFactory.add(modelName + componentName, locale => {
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: editor.t(componentName),
                icon: icon,
                tooltip: true
            });
            // Bind the state of the button to the command.
            buttonView.bind( 'isOn' ).to( toggleVisibilityCmd, 'value', value => value === true );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => {
                toggleVisibilityCmd.execute();
                // editor.editing.view.focus();
            } );
            return buttonView;
        });
    }

    _addChildElementsComponentFactory(modelName, componentName, childRemoveComponents){
        const editor = this.editor;
        Object.values(childRemoveComponents).map(({childComponentName, position, label}) =>{

            _addCommand(editor, `toggleComponent-${childComponentName}`, new ToggleComponentCommand(editor, {modelName, childComponentName, position }));

        });
        editor.ui.componentFactory.add(modelName + componentName, locale => {

            //
            const dropdownView = createDropdown( locale, DropdownButtonView );
            const dropdownButton = dropdownView.buttonView;

            dropdownButton.set( {
                icon: toolsIcon,
                label: editor.t(componentName),
                withText: false,
                tooltip: true,
            } );
            const childElementsDefinition = new Collection();

            Object.values(childRemoveComponents).map(({childComponentName, position, label}) =>{
                const commandName = `toggleComponent-${childComponentName}`;
                const command = _getCommand(editor, commandName);
                const definition = {
                    type: 'switchbutton',
                    model: new Model( {
                        _command: {
                            childComponentName : childComponentName,
                            commandName
                        },
                        label: editor.t(label),
                        withText: true
                    } )
                };
                // definition.model.bind('isEnabled').to(command, 'isValid');
                definition.model.bind('isOn').to(command, 'value');

                childElementsDefinition.add( definition );
            })

            addListToDropdown( dropdownView, childElementsDefinition );

            // const previewCommand = _getCommand(editor, previewCommandName);
            // if(previewCommand){
            //     dropdownView.bind('isEnabled').to(previewCommand, 'isEnabled');
            // }
            this.listenTo( dropdownView, 'execute', evt => {
                editor.execute( evt.source._command.commandName, {} );
                editor.editing.view.isFocus = false;
            } );

            return dropdownView;
        });

    }

    _addSwitchAttrComponentFactory(mainModelName, componentName, switchableAttrComponent = []){
        const editor = this.editor;
        // console.log(`_addSwitchAttrComponentFactory:${mainModelName}`, {mainModelName, componentName, switchableAttrComponent})

        const childElementsDefinition = new Collection();
        switchableAttrComponent.forEach( ({modelElementName, attrs = []})=>{
            if(attrs.length){
                const commandName = `get-${modelElementName}`;
                const command = _addCommand(editor, commandName, new ToggleAttrModelElementCommand(editor, {modelName: modelElementName}));
                const contains = editor.commands.get(commandName);
                // console.log(`_addSwitchAttrComponentFactory:${modelElementName}`, {commandName, command, contains})
                attrs.forEach( ({label, attrName}) =>{
                    const definition = {
                        type: 'switchbutton',
                        model: new Model( {
                            _command: {
                                attrName,
                                commandName
                            },
                            label: editor.t(label),
                            withText: true
                        } )
                    };
                    definition.model.bind('isEnabled').to(command, 'isEnabled');
                    definition.model.bind('isOn').to(command, 'value', (value)=>{
                        if(value){
                            let attrVal =false;
                            let founded = false;
                            value.forEach( ([key, val])=>{
                                if(!founded && key ===  attrName){
                                    attrVal =  val;
                                    founded = true;
                                }
                            } );
                            // console.log({value, attrName, attrVal});
                            return attrVal;
                        }
                        return false;
                    });

                    childElementsDefinition.add( definition );
                })

            }
        })
        // const commandName = `get-${mainModelName}`;
        // _addCommand(editor, commandName, new ToggleAttrModelElementCommand(editor, {modelName: mainModelName}));
        // const command = _getCommand(editor, commandName);
        editor.ui.componentFactory.add(mainModelName + componentName, locale => {

            //
            const dropdownView = createDropdown( locale, DropdownButtonView );
            const dropdownButton = dropdownView.buttonView;

            dropdownButton.set( {
                icon: cogsIcon,
                label: editor.t(componentName),
                withText: false,
                tooltip: true,
            } );

            addListToDropdown( dropdownView, childElementsDefinition );

            this.listenTo( dropdownView, 'execute', evt => {
                editor.execute( evt.source._command.commandName, {attrName : evt.source._command.attrName} );
                editor.editing.view.focus();
            } );

            return dropdownView;
        });

    }
    _addIdAttrComponentFactory(modelName, attrName){
        const editor = this.editor;

        const commandName = `${modelName}Attr`;
        const componentFactoryName = `${attrName}-${modelName}Attr`;
        const command = _addCommand(editor, commandName, new ModelAttrCommand(editor, {modelName : modelName}));
        editor.ui.componentFactory.add( componentFactoryName, locale => {
            const dropdown = createDropdown( locale );
            const attrFormView = new SingleAttrFormView(getIdFormValidators(editor.t), editor.locale);
            dropdown.bind( 'isEnabled' ).to( command );
            dropdown.panelView.children.add( attrFormView );
            const button = dropdown.buttonView;
            button.set( {
                label: editor.t( attrName ),
                icon: shieldLockIcon,
                tooltip: true
            } );
            button.on( 'open', () => {
                attrFormView.disableCssTransitions();
                // console.log(command)

                // Make sure that each time the panel shows up, the URL field remains in sync with the value of
                // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
                // unaltered) and re-opened it without changing the value of the media command (e.g. because they
                // didn't change the selection), they would see the old value instead of the actual value of the
                // command.
                attrFormView.inputValue = command.value[attrName] || '';
                attrFormView.inputView.fieldView.select();
                attrFormView.focus();
                attrFormView.enableCssTransitions();
            }, { priority: 'low' } );

            dropdown.on( 'submit', (evt, data) => {
                // console.log('idForm:submit', {evt, data, attrFormView});
                if ( attrFormView.isValid() ) {
                    editor.execute( commandName, {attrName, value : attrFormView.value} );
                    closeUI();
                }
            } );
            dropdown.on( 'change:isOpen', () => attrFormView.resetFormStatus() );
            dropdown.on( 'cancel', () => closeUI() );
            attrFormView.delegate( 'submit', 'cancel' ).to( dropdown );
            attrFormView.inputView.bind( 'value' ).to( command, 'value', commandValue =>  commandValue ? commandValue[attrName] || '' : "" );

            // clickOutsideHandler({
            //     emitter: attrFormView,
            //     activator: () => this._isViewInBalloon,
            //     contextElements: [this._balloon.view.element],
            //     callback: () => this._hideView()
            // });
            function closeUI() {
                editor.editing.view.focus();
                dropdown.isOpen = false;
            }

            return dropdown;
        } );
    }
    _addAutoToggleAttrComponentFactory(modelName, attrName){
        const editor = this.editor;

        const commandName = `${modelName}Attr`;
        const componentFactoryName = `${attrName}-${modelName}Attr`;
        const command = _addCommand(editor, commandName, new ModelAttrCommand(editor, {modelName : modelName}));
        editor.ui.componentFactory.add( componentFactoryName, locale => {
            const dropdown = createDropdown( locale );
            const attrFormView = new SingleAttrFormView(getTimeFormValidators(editor.t), editor.locale);
            dropdown.bind( 'isEnabled' ).to( command );
            dropdown.panelView.children.add( attrFormView );
            const button = dropdown.buttonView;
            button.set( {
                label: editor.t( attrName ),
                icon: startClock,
                tooltip: true
            } );
            button.on( 'open', () => {
                attrFormView.disableCssTransitions();
                console.log(command)

                // Make sure that each time the panel shows up, the URL field remains in sync with the value of
                // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
                // unaltered) and re-opened it without changing the value of the media command (e.g. because they
                // didn't change the selection), they would see the old value instead of the actual value of the
                // command.
                attrFormView.inputValue = command.value[attrName] || '';
                attrFormView.inputView.fieldView.select();
                attrFormView.focus();
                attrFormView.enableCssTransitions();
            }, { priority: 'low' } );

            dropdown.on( 'submit', (evt, data) => {
                console.log('idForm:submit', {evt, data, attrFormView});
                if ( attrFormView.isValid() ) {
                    editor.execute( commandName, {attrName, value : attrFormView.value} );
                    closeUI();
                }
            } );
            dropdown.on( 'change:isOpen', () => attrFormView.resetFormStatus() );
            dropdown.on( 'cancel', () => closeUI() );
            attrFormView.delegate( 'submit', 'cancel' ).to( dropdown );
            attrFormView.inputView.bind( 'value' ).to( command, 'value', commandValue =>  commandValue ? commandValue[attrName] || '' : "" );

            function closeUI() {
                editor.editing.view.focus();
                dropdown.isOpen = false;
            }

            return dropdown;
        } );
    }



    _addSwitchComponentFactory(modelName, componentName, icon, commandName, commandData){
        const _this = this;
        const editor = this.editor;

        editor.ui.componentFactory.add(modelName + componentName, locale => {
            const buttonView = new SwitchButtonView(locale);

            buttonView.set({
                label: editor.t(componentName),
                withText: true,
                tooltip: true
            });

            // _this.listenTo(buttonView, 'execute', () => {
            //     _this.sideBar.show(modelName);
            // });
            return buttonView;
        });

    }
}

HiddenComponents._hiddenElementsAdd = [];

function getIdFormValidators(t) {
    return [
        form => {
            if (form.inputValue !== form.originalValue && _isStrNotEmpty(form.inputValue)) {
                console.log("BlockIdAttrUi#getIdFormValidators", {form});
                const isValid = !document.getElementById(form.value);
                if (!isValid) {
                    return t('The id already exist.');
                }
            }
        }
    ]
}

function getTimeFormValidators(t) {
    return [
        form => {
            if (form.inputValue !== form.originalValue && isNaN(form.inputValue)) {
                return t('This must be a numeric value.');
            }
        }
    ]
}
