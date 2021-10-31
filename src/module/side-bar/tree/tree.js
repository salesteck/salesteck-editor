import { Plugin } from 'ckeditor5/src/core';
import TreeEditing from "./tree-editing";
import TreeSideBar from "./tree-side-bar";
export default class Tree extends Plugin{

    static get requires() {
        return [TreeEditing, TreeSideBar];
    }
    static get pluginName() {
        return 'Tree';
    }
}
