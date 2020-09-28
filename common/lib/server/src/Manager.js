import Module from "./Module";
//import FileSystem from './../../src/FileSystem';
import fs from "fs";
import Console from "./Console";
export default class Manager extends Console {
    constructor(fileSystem, root) {
        super();
        this.modules = [];
        this.path = '';
        this.fileSystem = fileSystem;
        this.path = `${__dirname}${root}/modules`;
        this.discover();
    }
    async discover() {
        // List all directories in the module directory.
        //const directories: string[] = await this.fileSystem.list(this.path, 'd');
        const directories = fs.readdirSync(this.path);
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
