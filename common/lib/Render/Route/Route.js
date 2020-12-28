import Console from "../../Console";
import RegionManager from "../Region/Manager";
import Region from "../Region/Region";
export default class Route extends Console {
    constructor(module, id, data) {
        super(module.fileSystem);
        this.id = '';
        this.path = '';
        this.title = '';
        this.description = '';
        this.icon = '';
        this.hide = true;
        this.params = {};
        this.module = module;
        this.routeManager = module.routeManager;
        this.routeManager.routes.push(this);
        this.regionManager = new RegionManager(this.fileSystem);
        const regions = this.fallback(data, 'regions', []);
        for (let i = 0; i < regions.length; i++) {
            const region = regions[i];
            new Region(this, region);
        }
        this.id = id;
        this.path = this.fallback(data, 'path', `/${id}/${Date.now()}`);
        this.title = this.fallback(data, 'title', 'No title');
        this.description = this.fallback(data, 'description', 'No description.');
        this.icon = this.fallback(data, 'icon', '');
        this.hide = this.fallback(data, 'hide', true);
        this.params = this.fallback(data, 'params', {});
    }
}
