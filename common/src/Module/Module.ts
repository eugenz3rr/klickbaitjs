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

  public routeManager: RouteManager = new RouteManager(this.fileSystem);
  public componentManager: ComponentManager = new ComponentManager(this.fileSystem);
  public eventManager: EventManager = new EventManager(this.fileSystem);

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
   * 
   * @param moduleManager 
   * @param path 
   * @param id 
   */
  constructor(moduleManager: ModuleManager, path: string, id: string) {
    super(moduleManager.fileSystem);
    
    this.moduleManager = moduleManager;
    this.moduleManager.modules.push(this);

    this.id = id;
    this.path = path;
  }

  /**
   * 
   */
  public async initialize(): Promise<void> {

    // this.log(`Reading > ${this.path}${this.id}.info.json`);
    // let info: Object | undefined = undefined;
    // try {
    //   info = await this.moduleManager.manager.configuration.applicationSystem.readJSON(`${this.path}${this.id}.info.json`);
    // } catch (e) {
    //   console.warn(`${this.path}${this.id}.info.json - Could not be found. Using default.`, e);
    // }
    //
    // if (info !== undefined) {
    //   this.info = new Info(this, info);
    // }

    this.log(`Reading > ${this.path}${this.id}.routing.json`);
    let routes: any = undefined;
    try {
      routes = await this.moduleManager.manager.configuration.applicationSystem.readJSON(`${this.path}${this.id}.routing.json`);
    } catch (e) {
      console.warn(`${this.path}${this.id}.routing.json - Could not be found. Using default.`, e);
    }

    if (routes !== undefined) {
      const ids: string[] = Object.keys(routes);

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const route: Object = routes[id];

        new Route(this, id, route);
      }
    }

    this.log(`Reading > ${this.path}${this.id}.components.json`);
    let components: any = undefined;
    try {
      components = await this.moduleManager.manager.configuration.applicationSystem.readJSON(`${this.path}${this.id}.components.json`);
    } catch (e) {
      console.warn(`${this.path}${this.id}.components.json - Could not be found. Using default.`, e);
    }

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

    this.log(`Reading > ${this.path}${this.id}.events.js`);
    let events: string | any = undefined;
    try {
      events = await this.moduleManager.manager.configuration.applicationSystem.read(`${this.path}${this.id}.events.js`);
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

    this.eventManager.fire('module.post.init');
  }

  public appendStyle(path: string, id: string) {

    // If the source was already appended just ignore the rest.
    if (document.querySelector(`style[data-source-id="${id}"]`)) return;

    this.moduleManager.manager.configuration.applicationSystem.read(`${this.path}${path}`).then(value => {

      const style: HTMLElement = document.createElement('style');
      style.textContent = value;
      style.setAttribute('data-source-id', id);
      document.head.append(style);

    }).catch(() => {})
  }
} 