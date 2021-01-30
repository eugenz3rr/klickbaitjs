import Module from "./Module";
import Console from "../Console";
export default class ModuleManager extends Console {
    constructor(fileSystem, root, manager) {
        super(fileSystem);
        this.modules = [];
        this.path = '';
        this.manager = manager;
        this.fileSystem = fileSystem;
        this.path = root;
    }
    async discover() {
        // List all directories in the module directory.
        let directories = [];
        try {
            directories = await this.manager.configuration.applicationSystem.list(this.path, 'd');
        }
        catch (e) {
            console.error('Could not list directories.', this.path, e);
        }
        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];
            this.log('Directory found!', directory);
            let id = directory;
            id = id.split('/');
            id = id[id.length - 2];
            try {
                const module = new Module(this, directory, id);
                await module.initialize();
                await this.manager.summary(module);
            }
            catch (e) {
                console.error('Could not initialize or summarize module.', directory, id, e);
            }
        }
    }
    cordovaExists() {
        return this.fallback(window, 'cordovaExists', false);
    }
}
