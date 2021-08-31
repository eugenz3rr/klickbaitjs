import Console from "../../Console";
import ContainerManager from "./Manager";
import FileSystemManager from "../../FileSystem/Manager";

export default class Container extends Console {

    /**
     * A reference to the container manager.
     */
    public containerManager: ContainerManager;

    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     * @param containerManager
     *   Expects the container manager.
     */
    constructor(fileSystemManager: FileSystemManager, containerManager: ContainerManager) {
        super(fileSystemManager);
        this.containerManager = containerManager;
    }
}