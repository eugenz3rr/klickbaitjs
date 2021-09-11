import Console from "../../Console";
export default class RouteManager extends Console {
    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager) {
        super(fileSystemManager);
        /**
         * A list of registered routes.
         */
        this.routes = [];
        this.defaultPage = '';
    }
}
