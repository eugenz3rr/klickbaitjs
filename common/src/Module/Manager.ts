import Module from "./Module";
import Console from "../Console";
import FileSystem from "../FileSystem";
import Manager from "../Manager";
import Installer from "../Installer";

export default class ModuleManager extends Console {
    public manager: Manager;
    public modules: Module[] = [];
    public path: string = '';

    constructor(fileSystem: FileSystem, root: string, manager: Manager) {
        super(fileSystem);

        this.manager = manager;
        this.fileSystem = fileSystem;
        this.path = root;

        this.discover().then();
    }

    public async discover(): Promise<any> {

        await new Installer(this.fileSystem).install()

        // List all directories in the module directory.
        const directories: string[] = await this.fileSystem.list(this.path, 'd');

        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];

            this.log('Directory found!', directory);

            let id: any = directory;
            id = id.split('/');
            id = id[id.length - 2];

            new Module(this, directory, id);
        }
    };

    /**
     *
     * @param module
     */
    public async moduleReady(module: Module): Promise<any> {

        // A specific module is ready.
        this.emit(`manager.module.${module.id}.ready`, module);

        // A module is ready.
        this.emit('manager.module.module.ready', module);

        // Check if all modules were discovered.
        const directories: string[] = await this.fileSystem.list(this.path, 'd');
        if (directories.length === this.modules.length) {

            // Module manager is ready.
            this.emit('manager.module.ready', module);
        }
    }
}