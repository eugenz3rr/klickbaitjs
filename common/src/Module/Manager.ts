import Module from "./Module";
import Console from "../Console";
import FileSystem from "../FileSystem";
import Manager from "../Manager";

interface Installed {
    version: string,
}

export default class ModuleManager extends Console {
    public manager: Manager;
    public modules: Module[] = [];
    public path: string = '';

    constructor(fileSystem: FileSystem, root: string, manager: Manager) {
        super(fileSystem);

        this.manager = manager;
        this.fileSystem = fileSystem;
        this.path = root;
    }

    public async discover(): Promise<any> {

        // List all directories in the module directory.
        let directories: string[] = [];
        try {
            directories = await this.manager.configuration.applicationSystem.list(this.path, 'd');

        } catch (e) {
            console.error('Could not list directories.', this.path, e);
        }

        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];

            this.log('Directory found!', directory);

            let id: any = directory;
            id = id.split('/');
            id = id[id.length - 2];

            try {
                const module = new Module(this, directory, id);
                await module.initialize();
                await this.manager.summary(module);
            } catch (e) {
                console.error('Could not initialize or summarize module.', directory, id, e);
            }
        }
    }

    private cordovaExists(): boolean {
        return this.fallback(window, 'cordovaExists', false);
    }
}