import Console from "../../Console";
export default class ContainerManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.containers = [];
        this.fileSystem = fileSystem;
    }
}
