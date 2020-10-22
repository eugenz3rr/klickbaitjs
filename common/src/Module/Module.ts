import ModuleManager from "./Manager";
import Components from "../Components";
import Console from "../Console";
import Info from "../Info";
import RouteManager from "../Render/Route/Manager";
import Route from "../Render/Route/Route";
import ComponentManager from "../Render/Component/Manager";
import Component from "../Render/Component/Component";

export default class Module extends Console {

  /**
   * 
   */
  public moduleManager: ModuleManager;

  public routeManager: RouteManager = new RouteManager(this.fileSystem);
  public componentManager: ComponentManager = new ComponentManager(this.fileSystem);

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

    this.initialize().then(() => {
      this.ready();
    }).catch(err => {
      console.log(err)
    });
  }

  /**
   * 
   */
  private async initialize(): Promise<any> {

    this.log(`Reading > ${this.path}${this.id}.info.json`);

    const info: Object = await this.fileSystem.readJSON(`${this.path}${this.id}.info.json`);
    if (info !== undefined) {
      this.info = new Info(this, info);
    }

    this.log(`Reading > ${this.path}${this.id}.routing.json`);
    const routes: any = await this.fileSystem.readJSON(`${this.path}${this.id}.routing.json`);
    if (routes !== undefined) {
      const ids: string[] = Object.keys(routes);

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const route: Object = routes[id];

        new Route(this, id, route);
      }
    }

    // Get all registered components.
    const components: any = await this.fileSystem.readJSON(`${this.path}${this.id}.components.json`);

    // Sanity check.
    if (components !== undefined) {

      const types: string[] = ['elements', 'containers', 'regions'];

      for (let i = 0; i < types.length; i++) {
        let type: any = this.fallback(components, types[i], {});
        const ids: string[] = Object.keys(type);

        console.debug('Loading component ->', type);

        for (let j = 0; j < ids.length; j++) {

          const id = ids[j];
          let component: any = type[id];
          type[id]['type'] = types[i];

          new Component(this, id, component);
        }
      }
    }

  }

  public appendStyle(path: string, id: string) {

    // If the source was already appended just ignore the rest.
    if (document.querySelector(`style[data-source-id="${id}"]`)) return;

    this.fileSystem.read(`${this.path}${path}`).then(value => {

      const style: HTMLElement = document.createElement('style');
      style.textContent = value;
      style.setAttribute('data-source-id', id);
      document.head.append(style);

    }).catch(() => {})
  }

  /**
   *
   */
  private ready(): void {
    this.moduleManager.moduleReady(this);
  }
} 