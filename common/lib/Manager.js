import Console from "./Console";
import ModuleManager from "./Module/Manager";
import RouteManager from "./Render/Route/Manager";
import ComponentManager from "./Render/Component/Manager";
export default class Manager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.fileSystem = fileSystem;
        this.moduleManager = new ModuleManager(fileSystem, '/modules/', this);
        // Contains all routes.
        this.routeManager = new RouteManager(fileSystem);
        this.componentManager = new ComponentManager(fileSystem);
        this.on('manager.module.ready', () => {
            this.summary();
        });
    }
    /**
     * Collect all data from the modules and sum them together.
     */
    summary() {
        for (let i = 0; i < this.moduleManager.modules.length; i++) {
            const module = this.moduleManager.modules[i];
            // Merge routes.
            this.routeManager.routes = [...this.routeManager.routes, ...module.routeManager.routes];
            this.componentManager.regions = [...this.componentManager.regions, ...module.componentManager.regions];
            this.componentManager.containers = [...this.componentManager.containers, ...module.componentManager.containers];
            this.componentManager.elements = [...this.componentManager.elements, ...module.componentManager.elements];
        }
    }
}
