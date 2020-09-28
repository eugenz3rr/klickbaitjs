import Console from "../../Console";
import Route from "./Route";
import FileSystem from "../../FileSystem";

export default class RouteManager extends Console {
    public routes: Route[] = [];
    public defaultPage: string;
    public fileSystem: FileSystem;

    constructor(fileSystem: FileSystem) {
        super(fileSystem);
        this.fileSystem = fileSystem;

        this.defaultPage = '';

        // Alter the default page.
        this.alterEvent('manager.page.defaultPage', this.defaultPage);

        this.alterEvent('manager.page', this);
    }
}