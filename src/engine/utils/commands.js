
export function _addCommand(editor, commandName, command){
    const commandFromCollection = _getCommand(editor, commandName);
    if(commandFromCollection){
        if(editor.config.get('debug')){
            console.warn(`Editor contains '${commandName}' already!`, {command});

        }
        return  commandFromCollection
    }
    editor.commands.add(commandName, command);
    return _getCommand(editor, commandName);
}
export function _getCommand(editor, commandName){
    return editor.commands.get(commandName);
}
