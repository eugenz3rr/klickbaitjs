import Console from "../../Console";
export default class ContainerManager extends Console {
    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager) {
        super(fileSystemManager);
        /**
         * A list of registered containers.
         */
        this.containers = [];
    }
}
