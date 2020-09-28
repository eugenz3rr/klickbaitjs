import Module from "./Module";
import Console from "./Console";
export default class Manager extends Console {
    constructor(fileSystem, root) {
        super();
        this.modules = [];
        this.path = '';
        this.fileSystem = fileSystem;
        this.path = `${root}/modules`;
        this.discover();
    }
    async discover() {
        // List all directories in the module directory.
        const directories = await this.fileSystem.list(this.path, 'd');
        //const directories: string[] = fs.readdirSync(this.path);
        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];
            new Module(this, `${this.path}/${directory}`, directory);
        }
    }
    ;
    moduleReady(module) {
        this.log(this.modules.length);
    }
}
new Manager(fs, '/..');
