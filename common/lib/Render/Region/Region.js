import Console from "../../Console";
export default class Region extends Console {
    constructor(route, data) {
        super(route.fileSystemManager);
        this.type = "";
        this.title = "";
        this.description = "";
        this.path = "";
        this.regionRaw = {};
        this.renderArray = [];
        this.regionManager = route.regionManager;
        this.module = route.module;
        this.regionManager = route.regionManager;
        // Map values.
        this.type = this.fallback(data, 'type', 'content');
        this.title = this.fallback(data, 'title', 'No title.');
        this.description = this.fallback(data, 'description', 'No description.');
        this.path = this.fallback(data, 'path', '404');
        this.regionManager.regions.push(this);
    }
    async load(force = false, fileSystem = undefined) {
        if (Object.keys(this.regionRaw).length !== 0 && !force) {
            return;
        }
        let region = undefined;
        try {
            region = await this.fileSystemManager.read(`${this.module.path}${this.path}`);
        }
        catch (e) {
            console.warn(`${this.module.path}${this.path} - Was not found in the public fs. Defaulting to private.`, e);
        }
        if (region !== undefined) {
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
        if ("build" in this.regionRaw) {
            this.renderArray = this.regionRaw.build(this.module);
        }
    }
}
