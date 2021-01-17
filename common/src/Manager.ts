import Console from "./Console";
import ModuleManager from "./Module/Manager";
import RouteManager from "./Render/Route/Manager";
import ComponentManager from "./Render/Component/Manager";

export default class Manager extends Console {
    public moduleManager: ModuleManager | undefined;
    public routeManager: RouteManager | undefined;
    public componentManager: ComponentManager | undefined;

    constructor(fileSystem: any) {
        super(fileSystem);

        this.fileSystem = fileSystem;

        // Contains all routes.
        this.routeManager = new RouteManager(this.fileSystem);
        this.componentManager = new ComponentManager(this.fileSystem);
    }

    public async initialize() {
        this.moduleManager = new ModuleManager(this.fileSystem, '/modules/', this);
        await this.moduleManager.discover();
    }

    /**
     * Collect all data from the modules and sum them together.
     */
    public summary(): void {
        if (
            this.moduleManager === undefined ||
            this.routeManager === undefined ||
            this.componentManager === undefined
        ) {
            console.error('Manager is down.', this.moduleManager, this.routeManager, this.componentManager);
            return;
        }

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