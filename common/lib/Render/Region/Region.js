import Console from "../../Console";
export default class Region extends Console {
    constructor(route, data) {
        super(route.fileSystem);
        this.type = "";
        this.title = "";
        this.description = "";
        this.path = "";
        this.regionRaw = {};
        this.renderArray = [];
        this.regionManager = route.regionManager;
        this.module = route.module;
        this.fileSystem = route.module.fileSystem;
        this.regionManager = route.regionManager;
        // Map values.
        this.type = this.fallback(data, 'type', 'content');
        this.title = this.fallback(data, 'title', 'No title.');
        this.description = this.fallback(data, 'description', 'No description.');
        this.path = this.fallback(data, 'path', '404');
        this.regionManager.regions.push(this);
    }
    async load(force = false) {
        if (Object.keys(this.regionRaw).length !== 0 && !force) {
            return;
        }
        let region = await this.fileSystem.read(`${this.module.path}${this.path}`);
        console.debug(`${this.module.path}${this.path}`);
        if (typeof region !== 'undefined') {
            // Interpret code and execute it.
            this.regionRaw = eval(region);
        }
        else {
            return;
        }
    }
    async build() {
        if (this.path === '404') {
            return {};
        }
        await this.load();
        this.renderArray = this.regionRaw.build(this.module);
    }
}
