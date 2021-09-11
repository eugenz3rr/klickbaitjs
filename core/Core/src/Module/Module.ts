import ModuleManager from "./Manager";
import Components from "../Components";
import Console from "../Console";
import Info from "../Info";
import RouteManager from "../Render/Route/Manager";
import Route from "../Render/Route/Route";
import ComponentManager from "../Render/Component/Manager";
import Component from "../Render/Component/Component";
import EventManager from "../Event/Manager";
import Event from "../Event/Event";

export default class Module extends Console {

  /**
   *
   */
  public moduleManager: ModuleManager;

  /**
   *
   */
  public routeManager: RouteManager = new RouteManager(this.fileSystemManager);

  /**
   *
   */
  public componentManager: ComponentManager = new ComponentManager(this.fileSystemManager);

  /**
   *
   */
  public eventManager: EventManager = new EventManager(this.fileSystemManager);

  /**
   *
   */
  public components: Components = new Components(this, {});

  /**
   *
   */
  public info: Info = new Info(this, {});

  /**
   *
   */
  public path: string;

  /**
   *
   */
  public id: string;

  /**
   * Constructor.
   *
   * @param moduleManager
   * @param path
   * @param id
   */
  constructor(moduleManager: ModuleManager, path: string, id: string) {
    super(moduleManager.fileSystemManager);

    this.moduleManager = moduleManager;
    this.moduleManager.modules.push(this);

    this.id = id;
    this.path = path;
  }

  /**
   * A helper to fetch config files.
   *
   * @param path
   * @param file
   * @private
   */
  private async readConfigFile(file: string, path: string = this.path): Promise<any> {
    this.log(`Reading > ${path}${file}`);
    let file_contents: any = undefined;

    try {
      file_contents = await this.fileSystemManager.readJSON(`${path}${file}`);
    } catch (e) {
      console.warn(`${this.path}${file} - Could not be found.`, e);
    }

    return file_contents;
  }

  /**
   *
   * @private
   */
  private async loadInfo(): Promise<void> {
    let info: any = await this.readConfigFile(`${this.id}.info.json`);
    if (info !== undefined) {
      this.info = new Info(this, info);
    }
  }

  /**
   *
   * @private
   */
  private async loadRoutes(): Promise<void> {
    let routes: any = await this.readConfigFile(`${this.id}.routing.json`);
    if (routes !== undefined) {
      const ids: string[] = Object.keys(routes);

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const route: Object = routes[id];

        new Route(this, id, route);
      }
    }
  }

  /**
   *
   * @private
   */
  private async loadComponents(): Promise<void> {
    let components: any = await this.readConfigFile(`${this.id}.components.json`);

    // Sanity check.
    if (components !== undefined) {

      const types: string[] = ['elements', 'containers', 'regions'];

      console.groupCollapsed("Component Loading");
      for (let i = 0; i < types.length; i++) {
        let type: any = this.fallback(components, types[i], {});
        const ids: string[] = Object.keys(type);

        console.debug('Loading component ->', type);

        for (let j = 0; j < ids.length; j++) {

          const id = ids[j];
          let component: any = type[id];
          type[id]['type'] = types[i];

          component = new Component(this, id, component);

          // Start loading.
          try {
            await component.load();
            console.log(component.title, "Component loaded.")
          } catch (e) {
            console.error(component.path, 'Could not be loaded as it does not exist.')
          }
        }
      }
      console.groupEnd();
    }
  }

  /**
   *
   * @private
   */
  private async loadEvents(): Promise<void> {
    this.log(`Reading > ${this.path}${this.id}.events.js`);
    let events: string | any = undefined;
    try {
      events = await this.fileSystemManager.read(`${this.path}${this.id}.events.js`);
    } catch (e) {
      console.warn(`${this.path}${this.id}.events.js - Could not be found. Using default.`, e);
    }

    if (events !== undefined) {
      // @ts-ignore
      events = eval(events);
      let ids: string[] = Object.keys(events);

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const event: Function = events[id];

        new Event(this, id, event);
      }
    }
  }

  /**
   * The initialize part is loading all needed config files.
   */
  public async initialize(): Promise<void> {

    await this.loadInfo();
    await this.loadRoutes();
    await this.loadComponents();
    await this.loadEvents();

    this.eventManager.fire('module.init', {
      module: this
    }).then();
  }

  /**
   *
   * @param path
   * @param id
   */
  public appendStyle(path: string, id: string) {

    // If the source was already appended just ignore the rest.
    if (document.querySelector(`style[data-source-id="${id}"]`)) return;

    this.fileSystemManager.read(`${this.path}${path}`).then(value => {

      const style: HTMLElement = document.createElement('style');
      style.textContent = value;
      style.setAttribute('data-source-id', id);
      document.head.append(style);

    }).catch(() => {
    })
  }
} 