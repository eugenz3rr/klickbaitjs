import Console from "../../../src/Helper/Console";
export default class Module extends Console {
    constructor(moduleManager, path) {
        super();
        this.moduleManager = moduleManager;
        this.moduleManager.modules.push(this);
    }
    async initialize() {
    }
    ready() {
        this.moduleManager.moduleReady(this);
    }
}
