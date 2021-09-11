import Console from "../../Console";
import Route from "./Route";
import FileSystemManager from "../../FileSystem/Manager";

export default class RouteManager extends Console {

    /**
     * A list of registered routes.
     */
    public routes: Route[] = [];

    /**
     * The default page.
     */
    public defaultPage: string;

    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);

        this.defaultPage = '';
    }
}