import Module from "./Module";
import Console from "./Console";
export default class Manager extends Console {
    constructor(fileSystem, root) {
        super(fileSystem);
        this.modules = [];
        this.path = '';
        this.fileSystem = fileSystem;
        this.path = root;
        this.discover();
    }
    async discover() {
        this.log(this.path);
        // Create custom module for testing.
        await this.fileSystem.write(`${this.path}/mymodule/mymodule.info.json`, JSON.stringify({
            name: 'Klickbait - Mymodule',
            description: 'This module is supposed to be an example module.',
            group: 'klickbait',
            type: 'module',
            version: '1.0.0',
            dependencies: [],
        }));
        // List all directories in the module directory.
        const directories = await this.fileSystem.list(this.path, 'd');
        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];
            this.log('Directory found!', directory);
            new Module(this, directory, directory);
        }
    }
    ;
    moduleReady(module) {
        this.log(this.modules.length);
    }
}
