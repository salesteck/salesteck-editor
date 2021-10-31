import {Plugin} from 'ckeditor5/src/core';
import {WidgetToolbarRepository} from "ckeditor5/src/widget";
import {findViewForWidgetToolbar} from "../../../engine/utils/position/widget-toolbar-utils";
import { HIDDEN_COMP_UI_NAME} from "../hidden-components";
import {TOOLBAR_SEPARATOR} from "../../../const";
import {BLOCK_STYLES} from "../../side-bar/style/style-editing";
import {BLOCK_CLASS_ATTRIBUTES} from "../../side-bar/class/class-attributes-editing";
import {BLOCK_ATTRIBUTES} from "../../side-bar/attribute/attributes-editing";
import {_addCommand} from "../../../engine/utils/commands";
import ModelAttrCommand from "../commands/model-attr-command";
import {_isArray} from "../../../general";
import {addListToDropdown, createDropdown, DropdownButtonView, Model} from "ckeditor5/src/ui";
import {Collection} from "ckeditor5/src/utils";
export default class OffcanvasToolbar extends Plugin{
    /**
     * @inheritDoc
     */
    static get requires() {
        return [
            WidgetToolbarRepository
        ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'OffcanvasToolbar';
    }
    constructor(editor) {
        super(editor);
    }
    init(){
        this._setUpOffCanvasPlacementDropdown();
    }
    _setUpOffCanvasPlacementDropdown(){
        const editor = this.editor;
        const options = editor.config.get( 'offcanvas.placement.options' );
        const commandName = `offcanvasAttr`;
        const command = _addCommand(editor, commandName, new ModelAttrCommand(editor, {modelName : 'offcanvas'}));

        this.bind( 'isEnabled' ).to( command );
        if(_isArray(options) && options.length){
            for ( const option of options ) {
                // this._registerSizeButton( option, commandName );
            }

            this._registerPlacementDropdown( options, command, commandName, 'placement' );
        }

    }
    /**
     * A helper function that creates a dropdown component for the plugin containing all the resize options defined in
     * the editor configuration.
     *
     * @private-attribute
     * @param {Array.<@ckeditor5/image/imageresize/imageresizebuttons~ImageResizeOption>} options An array of configured options.
     * @param command
     * @param {String} commandName
     * @param {String} attrName
     */
    _registerPlacementDropdown( options, command, commandName, attrName ) {
        const editor = this.editor;
        const t = editor.t;
        // const originalSizeOption = options.find( option => !option.value );

        // Register dropdown.
        editor.ui.componentFactory.add( 'offcanvasPlacement', locale => {
            const dropdownView = createDropdown( locale, DropdownButtonView );
            const dropdownButton = dropdownView.buttonView;

            dropdownButton.set( {
                tooltip: t( 'Size' ),
                // commandValue: originalSizeOption.value,
                label: t('choose'),
                withText: true,
                class: 'ck-resize-image-button'
            } );

            //TODO
            dropdownButton.bind( 'label' ).to( command, 'value', commandValue => {
                if ( commandValue && commandValue[attrName] ) {
                    const attrValue = commandValue[attrName];
                    const selectedOption = options.find( option => option.value === attrValue);
                    // console.log('execute', {attrValue, commandValue, selectedOption})
                    return selectedOption ? selectedOption.label :  '';
                } else {
                    // return this._getOptionLabelValue( originalSizeOption );
                }
                return ''
            } );
            //TODO
            // dropdownView.bind( 'isOn' ).to( command );
            dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled' );

            addListToDropdown( dropdownView, this._getResizeDropdownListItemDefinitions( options, command, commandName, attrName ) );

            dropdownView.listView.ariaLabel = t( 'Placement list' );

            // Execute command when an item from the dropdown is selected.
            this.listenTo( dropdownView, 'execute', evt => {
                // console.log('execute', {evt})
                editor.execute( evt.source._command.name, { attrName : evt.source._command.attrName, value: evt.source._command.value } );
                editor.editing.view.focus();
            } );

            return dropdownView;
        } );
    }
    /**
     * A helper function that parses the resize options and returns list item definitions ready for use in the dropdown.
     *
     * @private-attribute
     * @param {Array.<@ckeditor5/image/imageresize/imageresizebuttons~ImageResizeOption>} options The resize options.
     * @param {@ckEditor5/image/imageresize/imageresizecommand~ImageResizeCommand} command The resize image command.
     * @param {String} commandName
     * @param {String} attrName
     * @returns {Iterable.<@ckeditor5/ui/dropdown/utils~ListDropdownItemDefinition>} Dropdown item definitions.
     */
    _getResizeDropdownListItemDefinitions( options, command, commandName, attrName ) {
        const itemDefinitions = new Collection();

        options.map( option => {
            const definition = {
                type: 'button',
                model: new Model( {
                    _command : {
                        name : commandName,
                        attrName : attrName,
                        value : option.value
                    },
                    label: this._getOptionLabelValue( option ),
                    withText: true,
                    icon: null
                } )
            };

            definition.model.bind( 'isOn' ).to( command, 'value', getIsOnButtonCallback( option.value, attrName ) );

            itemDefinitions.add( definition );
        } );

        return itemDefinitions;
    }
    /**
     * A helper function for creating an option label value string.
     *
     * @private-attribute
     * @param {@ckEditor5/image/imageresize/imageresizebuttons~ImageResizeOption} option A resize option object.
     * @param {Boolean} [forTooltip] An optional flag for creating a tooltip label.
     * @returns {String} A user-defined label combined from the numeric value and the resize unit or the default label
     * for reset options (`Original`).
     */
    _getOptionLabelValue( option, forTooltip ) {
        const t = this.editor.t;

        if ( option.label ) {
            return option.label;
        } else if ( forTooltip ) {
            if ( option.value ) {
                return option.value;
                // return t( 'Resize media to %0', option.value );
            } else {
                return t( 'Default size' );
            }
        } else {
            if ( option.value ) {
                return option.value;
            } else {
                return t( 'Original' );
            }
        }
    }
    /**
     * @inheritDoc
     */
    afterInit() {

        const editor = this.editor;

        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);


        this._registerToolbar(widgetToolbarRepository, editor, 'offcanvas-header', 'offcanvas toolbar');
        this._registerToolbar(widgetToolbarRepository, editor, 'offcanvas-body', 'offcanvas toolbar');
        this._registerToolbar(widgetToolbarRepository, editor, 'offcanvas-footer', 'offcanvas toolbar');
        // this._registerToolbar(widgetToolbarRepository, editor, 'offcanvas', 'offcanvas toolbar');

    }
    _registerToolbar(widgetToolbarRepository, editor, modelName, label) {
        const mainModelName = 'offcanvas';
        let items = [
            mainModelName + HIDDEN_COMP_UI_NAME.hide,
            `id-${mainModelName}Attr`,
            `auto-toggle-${mainModelName}Attr`,
            mainModelName + HIDDEN_COMP_UI_NAME.children,
            `${mainModelName}SwitchAttr`,
            'offcanvasPlacement',
            TOOLBAR_SEPARATOR,
            `${modelName}${BLOCK_STYLES}`,
            `${modelName}${BLOCK_ATTRIBUTES}`,
            `${modelName}${BLOCK_CLASS_ATTRIBUTES}`
        ];
        const t = editor.t;
        widgetToolbarRepository.register(modelName, {
            ariaLabel: t(label),
            items: items,
            getRelatedElement: function (viewSelection) {
                return findViewForWidgetToolbar(editor, viewSelection, modelName);
            }
        });
    }

}


// A helper function for setting the `isOn` state of buttons in value bindings.
function getIsOnButtonCallback( optionValue, attrName ) {
    return commandValue => {
        if ( optionValue === null && commandValue[attrName] === optionValue ) {
            return true;
        }

        return commandValue && commandValue[attrName] === optionValue;
    };
}
