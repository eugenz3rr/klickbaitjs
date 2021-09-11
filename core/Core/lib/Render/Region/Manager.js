import Console from "../../Console";
export default class RegionManager extends Console {
    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager) {
        super(fileSystemManager);
        /**
         * A list of registered regions.
         */
        this.regions = [];
    }
}
