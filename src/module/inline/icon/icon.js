import {Plugin} from 'ckeditor5/src/core';
import IconEditing from './icon-editing';
import InsertIconUi from "./insert-icon-ui";


export default class Icon extends Plugin {
    static get requires() {
        return [IconEditing, InsertIconUi];
    }
}
