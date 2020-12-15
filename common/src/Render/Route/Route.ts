import Console from "../../Console";
import RouteManager from "./Manager";
import RegionManager from "../Region/Manager";
import Module from "../../Module/Module";
import Region from "../Region/Region";

export default class Route extends Console {
    public module: Module;
    public routeManager: RouteManager;

    public id: string = '';

    public path: string = '';
    public title: string = '';
    public description: string = '';
    public icon: string = '';
    public hide: boolean = true;

    public regionManager: RegionManager;

    constructor(module: Module, id: string, data: Object) {
        super(module.fileSystem);

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
    }
}