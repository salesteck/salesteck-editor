import {Plugin} from 'ckeditor5/src/core';
import {Collection} from 'ckeditor5/src/utils';
import { Model, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import PlaceholderCommand from "./placeholdercommand";



export default class PlaceholderUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;
        const placeholderNames = editor.config.get( 'placeholderConfig.types' );
        const placeholderItems = editor.config.get( 'placeholderConfig.items' );

        // The "placeholder" dropdown must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( PlaceholderCommand.commandName, locale => {
            const dropdownView = createDropdown( locale );

            // Populate the list in the dropdown with items.
            addListToDropdown( dropdownView, getDropdownItemsDefinitions2( placeholderItems ) );

            dropdownView.buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Placeholder' ),
                tooltip: true,
                withText: true
            } );

            // Disable the placeholder button when the command is disabled.
            const command = editor.commands.get( 'placeholder' );
            dropdownView.bind( 'isEnabled' ).to( command );

            // Execute the command when the dropdown item is clicked (executed).
            this.listenTo( dropdownView, 'execute', evt => {
                editor.execute( 'placeholder', { value: evt.source.commandParam } );
                editor.editing.view.focus();
            } );

            return dropdownView;
        } );
    }


}

function getDropdownItemsDefinitions2(placeholderItems) {
    const itemDefinitions = new Collection();

    for (const placeholder of placeholderItems) {
        const definition = {
            type: 'button',
            model: new Model({
                commandParam: placeholder.value,
                label: placeholder.title,
                withText: true
            })
        };

        // Add the item definition to the collection.
        itemDefinitions.add(definition);
    }

    return itemDefinitions;
}

function getDropdownItemsDefinitions(placeholderNames) {
    const itemDefinitions = new Collection();

    for (const name of placeholderNames) {
        const definition = {
            type: 'button',
            model: new Model({
                commandParam: name,
                label: name,
                withText: true
            })
        };

        // Add the item definition to the collection.
        itemDefinitions.add(definition);
    }

    return itemDefinitions;
}
