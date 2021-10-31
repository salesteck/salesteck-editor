
import './theme/widget-block.css';
import {Model, ButtonView} from 'ckeditor5/src/ui';
import DropDownGridView from "../ui/view/drop-down-grid-view";
import TileView from "../ui/view/tile-view";
/**
 * CSS class added to each widget element.
 *
 * @const {String}
 */
export const WIDGET_BLOCK_CLASS_NAME = 'ck-widget-block';

export function _addListToDropdown(dropdownView, items, columns = 4) {
    const locale = dropdownView.locale;
    const listView = dropdownView.listView = new DropDownGridView(locale, {columns});
    // console.log("_addListToDropdown", {dropdownView, items, listView});

    listView.items.bindTo(items).using(({type, model}) => {

        const tileView = new TileView(locale);
        let buttonView = new ButtonView(locale);

        buttonView.set({
            icon : model.icon
        });


        // Bind all model properties to the button _view.
        buttonView.bind(...Object.keys(model)).to(model);
        buttonView.delegate('execute').to(tileView);

        tileView.children.add(buttonView);
        // console.log("panelView.items.bindTo( items )", {type, model, dropdownView, items, listView, tileView, buttonView});

        return tileView;
    });

    dropdownView.panelView.children.add(listView);

    listView.items.delegate('execute').to(dropdownView);
}


export function addListOption(option, editor, commands, itemDefinitions) {
    const model = option.model = new Model(option.model);
    const {commandName, bindIsOn} = option.model;

    if (option.type === 'button' || option.type === 'switchbutton') {
        const command = editor.commands.get(commandName);

        commands.push(command);

        model.set({commandName});

        model.bind('isEnabled').to(command);

        if (bindIsOn) {
            model.bind('isOn').to(command, 'value');
        }
    }

    model.set({
        icon: model.icon
    });

    itemDefinitions.add(option);
}
