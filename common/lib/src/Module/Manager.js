import Console from "../../../src/Helper/Console";
export default class Manager extends Console {
    constructor(fileSystem, root) {
        super();
        this.modules = [];
        this.path = '';
        this.fileSystem = fileSystem;
        this.path = `${root}/modules`;
    }
    async discover() {
        // List all directories in the module directory.
        const directories = await this.fileSystem.list(this.path, 'd');
    }
    ;
    moduleReady(module) {
        this.log();
    }
}
