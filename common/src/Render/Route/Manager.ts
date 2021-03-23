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
    }
}