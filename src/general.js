//STRING
export function _isStr(value){
    return typeof value === typeof "";
}
export function _isStrNotEmpty(value){
    return _isStr(value) && value !=="";
}

//NUMBER
export function _isNumber(value){
    return !isNaN(value);
}

//FUNCTION
export function _isFunction(test){
    return test && typeof test === "function";
}

//ARRAY
export function _isArray(value){
    return typeof value === typeof [];
}

export function _arrayContainsArray(longArray, shortArray) {
    if (_isArray(longArray) && _isArray(shortArray)) {
        /*const contains = shortArray.every((currentValue, index)=>{
            return longArray.length >= index && longArray[index] === currentValue;
        });
        console.log(`_arrayContainsArray`, {longArray, shortArray, contains});
        return contains;*/

        return shortArray.every((currentValue, index) => {
            return longArray.length >= index && longArray[index] === currentValue;
        });
    }
    return false;
}

//OBJET
export function _isObject(value){
    return typeof value === typeof {};
}
export function _isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//JSON
export function _isJsonString(value){
    try{
        JSON.parse(value)
    }catch (err){
        return false;
    }
    return true;
}

//JQUERY
export function _isJqueryLoaded(){
    return !!window.jQuery;
}

export function  _isMagnificPopupLoad() {
    return !!$.magnificPopup;
}

export function  _isMagnificPopupValid(){
    return _isJqueryLoaded() && _isMagnificPopupLoad();
}
