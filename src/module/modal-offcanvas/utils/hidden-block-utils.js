export function _setUnRemovableAttr(schema, modelName){

    schema.extend(modelName, {
        allowAttributes : ['unRemovable']
    });
}
