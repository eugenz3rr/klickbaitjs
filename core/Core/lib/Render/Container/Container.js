import Console from "../../Console";
export default class Container extends Console {
    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     * @param containerManager
     *   Expects the container manager.
     */
    constructor(fileSystemManager, containerManager) {
        super(fileSystemManager);
        this.containerManager = containerManager;
    }
}
