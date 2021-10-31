import {Plugin} from 'ckeditor5/src/core';
import OffcanvasEditing from "./offcanvas-editing";
import HiddenComponents from "../hidden-components";
import OffcanvasToolbar from "./offcanvas-toolbar";
export default class OffCanvas extends Plugin{
    static get pluginName(){
        return 'Offcanvas';
    }
    static get requires(){
        return [HiddenComponents, OffcanvasEditing, OffcanvasToolbar ];
    }
}
