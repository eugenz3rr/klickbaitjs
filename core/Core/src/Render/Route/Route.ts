import Console from "../../Console";
import RouteManager from "./Manager";
import RegionManager from "../Region/Manager";
import Module from "../../Module/Module";
import Region from "../Region/Region";

export default class Route extends Console {

    /**
     * The module this route belongs to.
     */
    public module: Module;

    /**
     * A reference to the route manager.
     */
    public routeManager: RouteManager;

    /**
     * Unique route id.
     */
    public id: string = '';

    /**
     * Unique path of the route.
     */
    public path: string = '';

    /**
     * Route title.
     */
    public title: string = '';

    /**
     * Route description.
     */
    public description: string = '';

    /**
     * Route icon (google).
     */
    public icon: string = '';

    /**
     * Hide route on public lists.
     */
    public hide: boolean = true;

    /**
     * Extra route parameters that will be set as default when the user visits the page.
     */
    public params: object = {};

    /**
     * A reference to the region manager.
     */
    public regionManager: RegionManager;

    /**
     * Constructor.
     *
     * @param module
     *   Expects the module the route belongs to.
     * @param id
     *   Expects the route unique id.
     * @param data
     *   Expects the data that is mapped to the class.
     */
    constructor(module: Module, id: string, data: Object) {
        super(module.fileSystemManager);

        this.module = module;
        this.routeManager = module.routeManager;
        this.routeManager.routes.push(this);

        this.regionManager = new RegionManager(this.fileSystemManager);
        const regions = this.fallback(data, 'regions', []);

        for (let i = 0; i < regions.length; i++) {
            const region = regions[i];
            new Region(this, region);
        }

        // Map all to the class.
        this.id = id;
        this.path = this.fallback(data, 'path', `/${id}/${Date.now()}`);
        this.title = this.fallback(data, 'title', 'No title');
        this.description = this.fallback(data, 'description', 'No description.');
        this.icon = this.fallback(data, 'icon', '');
        this.hide = this.fallback(data, 'hide', true);
        this.params = this.fallback(data, 'params', {});
    }
}