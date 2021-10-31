import {Plugin} from 'ckeditor5/src/core';
import TextBlockClassUi from "./text-block-class-ui";
import TextBlock from "./text-block";
export default class TextBlockClass extends Plugin{
    static get pluginName(){
        return 'TextBlockClass';
    }
    static get requires(){
        return [TextBlockClassUi, TextBlock];
    }
}
