import Console from "../../Console";
import RegionManager from "../Region/Manager";
import Region from "../Region/Region";
export default class Route extends Console {
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
    constructor(module, id, data) {
        super(module.fileSystemManager);
        /**
         * Unique route id.
         */
        this.id = '';
        /**
         * Unique path of the route.
         */
        this.path = '';
        /**
         * Route title.
         */
        this.title = '';
        /**
         * Route description.
         */
        this.description = '';
        /**
         * Route icon (google).
         */
        this.icon = '';
        /**
         * Hide route on public lists.
         */
        this.hide = true;
        /**
         * Extra route parameters that will be set as default when the user visits the page.
         */
        this.params = {};
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
