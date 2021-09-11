import Console from "./Console";
import ModuleManager from "./Module/Manager";
import RouteManager from "./Render/Route/Manager";
import ComponentManager from "./Render/Component/Manager";
import Module from "./Module/Module";
import EventManager from "./Event/Manager";
import FileSystemManager from "./FileSystem/Manager";
import FileSystemInterface from "./FileSystem/FileSystemInterface";

interface Configuration {
  fileSystems: Array<FileSystemInterface>,
}

export default class Manager extends Console {

  /**
   *
   */
  public moduleManager: ModuleManager | undefined;

  /**
   *
   */
  public routeManager: RouteManager;

  /**
   *
   */
  public componentManager: ComponentManager;

  /**
   *
   */
  public eventManager: EventManager;
  public root: string = '/modules/';

  /**
   *
   * @param fileSystems
   */
  constructor(fileSystems: Array<FileSystemInterface>) {
    super(new FileSystemManager(fileSystems));

    // Contains all routes.
    this.routeManager = new RouteManager(this.fileSystemManager);
    this.componentManager = new ComponentManager(this.fileSystemManager);
    this.eventManager = new EventManager(this.fileSystemManager);
  }

  /**
   *
   */
  public async initialize() {
    this.moduleManager = new ModuleManager(this.fileSystemManager, this.root, this);

    try {
      await this.moduleManager.discover();
    } catch (e) {
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
      this.componentManager === undefined ||
      this.eventManager === undefined
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

    this.eventManager.events = [
      ...this.eventManager.events,
      ...module.eventManager.events
    ];
  }

}