import Console from "../Console";
export default class Region extends Console {
    constructor(fileSystem, containerManager) {
        super(fileSystem);
        this.fileSystem = fileSystem;
        this.containerManager = containerManager;
    }
}
