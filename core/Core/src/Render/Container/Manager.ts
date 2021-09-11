import Console from "../../Console";
import Container from "./Container";
import FileSystemManager from "../../FileSystem/Manager";

export default class ContainerManager extends Console {

    /**
     * A list of registered containers.
     */
    public containers: Container[] = [];

    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);
    }
}