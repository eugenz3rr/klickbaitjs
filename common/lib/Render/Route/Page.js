import Console from "../../Console";
export default class Page extends Console {
    constructor(fileSystem, containerManager) {
        super(fileSystem);
        this.id = '';
        this.fileSystem = fileSystem;
        this.containerManager = containerManager;
    }
}
