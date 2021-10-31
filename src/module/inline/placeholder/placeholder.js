import {Plugin} from 'ckeditor5/src/core';
import PlaceholderEditing from './placeholderediting';
import PlaceholderUI from './placeholderui';


export default class Placeholder extends Plugin {
    static get pluginName(){
        return 'Placeholder';
    }
    static get requires() {
        return [PlaceholderEditing, PlaceholderUI];
    }
}
