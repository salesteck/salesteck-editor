
export default class PlaceholderItem{

    static _inst(title, value){
        return new PlaceholderItem(title, value)
    }

    constructor(title, value) {
        this._title = title;
        this._value = value;
    }

    get title(){
        return this._title;
    }

    get value(){
        return this._value;
    }

    set title(value) {
        this._title = value;
    }

    set value(value) {
        this._value = value;
    }
}