export default class ModelDefinition {


    constructor(modelName, viewName, configSelector, classes = "", styles = {}, attributes = {}) {
        this.modelName = modelName;
        this.name = viewName;
        this.classes = classes;
        this.styles = styles;
        this.attributes = attributes;
        this.configSelector = configSelector;
    }
}
