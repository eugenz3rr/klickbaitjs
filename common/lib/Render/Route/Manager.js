import Console from "../../Console";
export default class RouteManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.routes = [];
        this.fileSystem = fileSystem;
        this.defaultPage = '';
    }
}
