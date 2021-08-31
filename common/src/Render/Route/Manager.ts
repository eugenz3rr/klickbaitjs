import Console from "../../Console";
import Route from "./Route";
import FileSystem from "../../FileSystem";
import FileSystemManager from "../../FileSystem/Manager";

export default class RouteManager extends Console {
    public routes: Route[] = [];
    public defaultPage: string;

    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);

        this.defaultPage = '';
    }
}