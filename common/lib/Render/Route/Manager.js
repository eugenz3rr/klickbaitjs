import Console from "../../Console";
export default class RouteManager extends Console {
    constructor(fileSystemManager) {
        super(fileSystemManager);
        this.routes = [];
        this.defaultPage = '';
    }
}
