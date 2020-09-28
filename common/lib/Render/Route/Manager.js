import Console from "../../Console";
export default class RouteManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.routes = [];
        this.fileSystem = fileSystem;
        this.defaultPage = '';
        // Alter the default page.
        this.alterEvent('manager.page.defaultPage', this.defaultPage);
        this.alterEvent('manager.page', this);
    }
}
