/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module table/tablecellproperties/tablecellpropertiesediting
 */

import {Plugin} from 'ckeditor5/src/core';
import {Collection} from 'ckeditor5/src/utils';
import {ButtonView, LabelView, IconView, createDropdown} from 'ckeditor5/src/ui';
import BlocksEditing, { BLOCK_ELEMENT, COLUMN_ELEMENT } from "../blocks-editing";

export const BLOCK_LABEL = 'Label';


import moveVertical from "../../../theme/icon/operation/move/vertical/move-vertical.svg";
import moveHorizontal from "../../../theme/icon/operation/move/horizontal/move-horizontal.svg";

import moveLeftStart from "../../../theme/icon/operation/move/horizontal/start.svg";
import moveLeft from "../../../theme/icon/operation/move/horizontal/left.svg";
import moveRight from "../../../theme/icon/operation/move/horizontal/right.svg";
import moveRightEnd from "../../../theme/icon/operation/move/horizontal/end.svg";

import moveUpStart from "../../../theme/icon/operation/move/vertical/start.svg";
import moveUp from "../../../theme/icon/operation/move/vertical/up.svg";
import moveDown from "../../../theme/icon/operation/move/vertical/down.svg";
import moveDownEnd from "../../../theme/icon/operation/move/vertical/end.svg";



import selectParentIcon from "../../../theme/icon/operation/select-parent.svg";
import cloneIcon from "../../../theme/icon/operation/clone.svg";
import deleteIcon from "../../../theme/icon/operation/delete.svg";

import {_addListToDropdown, addListOption} from "../../utils";
import uid from "@ckeditor/ckeditor5-utils/src/uid";
import {_isStrNotEmpty} from "../../../general";
import {DATA_CHILD_COUNT} from "../../../const";
import BlockCloneCommand from "./commands/block-clone-command";
import BlockDeleteCommand from "./commands/block-delete-command";
import BlockSelectParentCommand from "./commands/block-select-parent-command";
import BlockMoveCommand, {MOVE_COMMAND} from "./commands/block-move-command";
function _getFirstElement(element){
    if(element){
        if(element.is('element')){
            return element;
        }
        let parent = element.parent;
        while (parent){
            if(parent.is('element')){
                return parent;
            }
            parent = parent.parent;
        }
    }
    return null;
}

/**
 * The table cell properties editing feature.
 *
 * Introduces table cell model attributes and their conversion:
 *
 * - border: `borderStyle`, `borderColor` and `borderWidth`
 * - background color: `backgroundColor`
 * - cell padding: `padding`
 * - horizontal and vertical alignment: `horizontalAlignment`, `verticalAlignment`
 * - cell width and height: `width`, `height`
 *
 * It also registers commands used to manipulate the above attributes:
 *
 * - border: the `'tableCellBorderStyle'`, `'tableCellBorderColor'` and `'tableCellBorderWidth'` commands
 * - background color: the `'tableCellBackgroundColor'` command
 * - cell padding: the `'tableCellPadding'` command
 * - horizontal and vertical alignment: the `'tableCellHorizontalAlignment'` and `'tableCellVerticalAlignment'` commands
 * - width and height: the `'tableCellWidth'` and `'tableCellHeight'` commands
 *
 */

export default class BlockOperationUi extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SalesteckBlockOperationUi';
    }

    constructor(editor) {
        super(editor);
        // const contentLanguageDirection = editor.locale.contentLanguageDirection;
        // const isContentLtr = contentLanguageDirection === 'ltr';
        // console.log("BlockOperationUi#constructor", {editor, contentLanguageDirection, isContentLtr})

    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        // console.log("BlockOperationUi#init", {editor});

        this._initAllCommand();


        this.listenTo( editor.editing.view.document, 'delete', ( evt, data ) => this._handleDeleteView(evt, data, editor), {priority: 'highest'} );
        this.listenTo( editor.model, 'insertContent', ( evt, args ) => {
            // console.log(`${evt.name}`, {evt, args});
            const elem = args[0];

            const firstElement = _getFirstElement(elem);
            if(firstElement){
                const parent = firstElement.parent;
                // console.log('model.insertContent', {evt, args, firstElement, parent})
                if(parent){
                    editor.model.change(writer =>{
                        writer.setAttribute(DATA_CHILD_COUNT, firstElement.childCount, firstElement.parent);
                    })
                }

            }
        } );
    }
    afterInit(){
        // const undo = this.editor.commands.get('undo');
        // if(undo){
        //     undo.on('execute', (evt, args)=>{
        //         console.log('undo.execute', {evt, args})
        //     })
        // }
    }

    _initAllCommand(){
        const _this = this;
        const editor = _this.editor;

        const t = editor.t;
        this._addComponentFactorySingleButton(editor, BlockCloneCommand.commandName, t( 'Clone element'), cloneIcon);
        this._addComponentFactorySingleButton(editor, BlockDeleteCommand.commandName, t( 'Delete element'), deleteIcon);
        this._addComponentFactorySingleButton(editor, BlockSelectParentCommand.commandName, t( 'Select first parent'), selectParentIcon);

        const contentModelName = BlocksEditing.contentModelName;
        this._addComponentFactorySingleButton(editor, contentModelName+BlockCloneCommand.commandName, t( 'Clone element'), cloneIcon);
        this._addComponentFactorySingleButton(editor, contentModelName+BlockDeleteCommand.commandName, t( 'Delete element'), deleteIcon);
        this._addComponentFactorySingleButton(editor, contentModelName+BlockSelectParentCommand.commandName, t( 'Select first parent'), selectParentIcon);

        BLOCK_ELEMENT.forEach((blockElement) => {
            _this._labelView(blockElement, editor, blockElement.icon);
            if(blockElement.move){
                _this._moveCommand(blockElement, editor, moveVertical, moveUpStart, moveUp, moveDown, moveDownEnd);
            }
        });
        if (COLUMN_ELEMENT) {

            _this._labelView(COLUMN_ELEMENT, editor, COLUMN_ELEMENT.icon);
            if(COLUMN_ELEMENT.move){
                _this._moveCommand(COLUMN_ELEMENT, editor, moveHorizontal, moveLeftStart, moveLeft, moveRight, moveRightEnd);
            }


        }
    }
    _addComponentFactorySingleButton(editor, commandName, label, icon){
        editor.ui.componentFactory.add( commandName, locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( commandName);

            // The button will be an instance of BsButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                icon : icon,
                label: label,
                withText: false,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( commandName) );

            return buttonView;
        } );
    }

    _addComponentFactoryWithDropdown(editor, commandName, label, icon, options){
        editor.ui.componentFactory.add(commandName, locale => {
            return this._prepareDropdown(label, icon, options, locale);
        });
    }

    _labelView(blockElement, editor, icon){
        const t = editor.t;
        const name = blockElement.name;
        const pluginName = blockElement.plugin;
        const labelViewName = pluginName + BLOCK_LABEL;
        editor.ui.componentFactory.add( labelViewName, locale => {

            // The button will be an instance of BsButtonView.
            const labelView = new LabelView( locale );
            const iconView = new IconView(locale);

            iconView.content = icon;

            labelView.setTemplate( {
                tag: 'label',
                attributes: {
                    class: [
                        'ck',
                        'ck-label'
                    ],
                    id: `ck-editor__label_${ uid() }`
                },
                children: [
                    iconView,
                    {
                        text: " "+t(name)
                    }
                ]
            } );

            labelView.render();

            return labelView;
        } );

    }

    _moveCommand(blockElement, editor, moveIcon, startIcon, beforeIcon, afterIcon, endIcon){
        const t = editor.t;
        const name = blockElement.name;
        const pluginName = blockElement.plugin;
        const moveCommand = pluginName + BlockMoveCommand.commandName;
        let options = [
            _createModelOption(pluginName + MOVE_COMMAND.start, startIcon, t('Move ' + name + ' start')),
            _createModelOption(pluginName + MOVE_COMMAND.before, beforeIcon, t('Move ' + name + ' before')),
            _createModelOption(pluginName + MOVE_COMMAND.after, afterIcon, t('Move ' + name + ' after')),
            _createModelOption(pluginName + MOVE_COMMAND.end, endIcon, t('Move ' + name + ' end'))
        ];
        this._addComponentFactoryWithDropdown(editor, moveCommand, t('Move ' + name), moveIcon, options);
    }



    _handleDeleteView( evt, data, editor ){

        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();
        // console.log("_handleDeleteView, 'delete'", {evt, data, selection, selectedElement});
        if( !selectedElement || !BlocksEditing._isModelNameBlock(selectedElement.name)){
            return;
        }
        evt.stop();
        editor.model.change(writer => {
            // const firstPosition = selection.getFirstPosition();
            // const lastPosition = selection.getLastPosition();
            const parent = selectedElement.parent;
            // const limitElement = writer.model.schema.getLimitElement( selection );
            // console.log('_handleDeleteView#model.change', {writer, firstPosition, lastPosition, selectedElement, parent});
            //

            editor.model.deleteContent(editor.model.createSelection(writer.createRangeOn( selectedElement)), {doNotAutoparagraph: true});

            // writer.remove( selectedElement );
            if(parent.name === '$root' && parent.childCount === 0){
                // writer.insertElement('section', {'data-block-type' : 'section', 'view-name' : 'section'}, parent, 0);
                return;
            }
            if(parent && _isStrNotEmpty(parent.name)){
                writer.setAttribute(DATA_CHILD_COUNT, parent.childCount, parent);
            }
        });
    }

    /**
     * Creates a dropdown _view from a set of options.
     *
     * @private-attribute
     * @param {String} label The dropdown button label.
     * @param {String} icon An icon for the dropdown button.
     * @param {Array.<@ckEditor5/ui/dropdown/utils~ListDropdownItemDefinition>} options The list of options for the dropdown.
     * @param {@ckEditor5/utils/locale~Locale} locale
     * @returns {@ckEditor5/ui/dropdown/dropdownview~DropdownView}
     */
    _prepareDropdown(label, icon, options, locale) {
        const editor = this.editor;
        const dropdownView = createDropdown(locale);
        dropdownView.extendTemplate({
            attributes : {
                class : 'ck-element-operation-dropdown'
            }
        });
        // console.log("_prepareDropdown", {dropdownView});
        const commands = this._fillDropdownWithListOptions(dropdownView, options);
        // Decorate dropDown's button.
        dropdownView.buttonView.set({
            label,
            icon,
            tooltip: true
        });

        // Make dropdown button disabled when all options are disabled.
        dropdownView.bind('isEnabled').toMany(commands, 'isEnabled', (...areEnabled) => {
            return areEnabled.some(isEnabled => isEnabled);
        });

        this.listenTo(dropdownView, 'execute', evt => {
            editor.execute(evt.source.commandName);
            editor.editing.view.focus();
        });

        return dropdownView;
    }

    /**
     * Injects a {@link @ckEditor5/ui/list/listview~ListView} into the passed dropdown with buttons
     * which execute editor commands as configured in passed options.
     *
     * @private-attribute
     * @param {@ckEditor5/ui/dropdown/dropdownview~DropdownView} dropdownView
     * @param {Array.<@ckEditor5/ui/dropdown/utils~ListDropdownItemDefinition>} options The list of options for the dropdown.
     * @returns {Array.<@ckEditor5/core/command~Command>} Commands the list options are interacting with.
     */
    _fillDropdownWithListOptions(dropdownView, options) {
        const editor = this.editor;
        const commands = [];
        const itemDefinitions = new Collection();

        for (const option of options) {
            addListOption(option, editor, commands, itemDefinitions);
        }
        _addListToDropdown(dropdownView, itemDefinitions, 4)

        return commands;
    }
}

function _createModelOption(commandName, icon, label) {
    return {
        type: 'button',
        model: {
            commandName: commandName,
            icon: icon,
            label: label,
            tooltip: true
        }
    }
}
