import Console from "../../Console";
import FileSystem from "../../FileSystem";
import ContainerManager from "./Manager";

export default class Container extends Console {
    public containerManager: ContainerManager;
    public fileSystem: FileSystem;

    constructor(fileSystem: FileSystem, containerManager: ContainerManager) {
        super(fileSystem);
        this.fileSystem = fileSystem;
        this.containerManager = containerManager;
    }
}