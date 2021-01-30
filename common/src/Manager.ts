import Console from "./Console";
import ModuleManager from "./Module/Manager";
import RouteManager from "./Render/Route/Manager";
import ComponentManager from "./Render/Component/Manager";
import FileSystem from "./FileSystem";
import Module from "./Module/Module";

interface Configuration {
    fileSystem: FileSystem,
    privateSystem: FileSystem,
    applicationSystem: FileSystem
}

export default class Manager extends Console {
    public moduleManager: ModuleManager | undefined;
    public routeManager: RouteManager | undefined;
    public componentManager: ComponentManager | undefined;
    public configuration: Configuration;

    constructor(configuration: Configuration) {
        super(configuration.fileSystem);
        this.configuration = configuration;
        this.fileSystem = configuration.fileSystem;

        // Contains all routes.
        this.routeManager = new RouteManager(this.fileSystem);
        this.componentManager = new ComponentManager(this.fileSystem);
    }

    public async initialize() {
        this.moduleManager = new ModuleManager(this.fileSystem, '/www/modules/', this);

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
    public summary(module: Module): void {
        if (
            this.moduleManager === undefined ||
            this.routeManager === undefined ||
            this.componentManager === undefined
        ) {
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

    }

}