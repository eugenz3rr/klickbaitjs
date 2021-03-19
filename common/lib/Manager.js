import Console from "./Console";
import ModuleManager from "./Module/Manager";
import RouteManager from "./Render/Route/Manager";
import ComponentManager from "./Render/Component/Manager";
import EventManager from "./Event/Manager";
export default class Manager extends Console {
    /**
     *
     * @param configuration
     */
    constructor(configuration) {
        super(configuration.fileSystem);
        this.configuration = configuration;
        // Contains all routes.
        this.routeManager = new RouteManager(this.fileSystem);
        this.componentManager = new ComponentManager(this.fileSystem);
        this.eventManager = new EventManager(this.fileSystem);
    }
    /**
     *
     */
    async initialize() {
        this.moduleManager = new ModuleManager(this.fileSystem, '/modules/', this);
        try {
            await this.moduleManager.discover();
        }
        catch (e) {
            console.error('Could not discover modules.', e);
        }
    }
    /**
     * Collect all data from the modules and sum them together.
     */
    summary(module) {
        if (this.moduleManager === undefined ||
            this.routeManager === undefined ||
            this.componentManager === undefined ||
            this.eventManager === undefined) {
            console.error('Manager is down.', this.moduleManager, this.routeManager, this.componentManager);
            return;
        }
        // Merge routes.
        this.routeManager.routes = [
            ...this.routeManager.routes,
            ...module.routeManager.routes
        ];
        this.componentManager.regions = [
            ...this.componentManager.regions,
            ...module.componentManager.regions
        ];
        this.componentManager.containers = [
            ...this.componentManager.containers,
            ...module.componentManager.containers
        ];
        this.componentManager.elements = [
            ...this.componentManager.elements,
            ...module.componentManager.elements
        ];
        this.eventManager.events = [
            ...this.eventManager.events,
            ...module.eventManager.events
        ];
    }
}
