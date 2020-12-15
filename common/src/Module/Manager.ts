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

        await new Installer(this.fileSystem).install();

        // List all directories in the module directory.
        const directories: string[] = await this.fileSystem.list(this.path, 'd');

        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];

            this.log('Directory found!', directory);

            let id: any = directory;
            id = id.split('/');
            id = id[id.length - 2];

            const module = new Module(this, directory, id);
            await module.initialize();
            this.manager.summary();
        }
    };
}