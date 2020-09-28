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
     * @param moduleManager
     * @param path
     * @param id
     */
    constructor(moduleManager, path, id) {
        super(moduleManager.fileSystem);
        this.routeManager = new RouteManager(this.fileSystem);
        this.componentManager = new ComponentManager(this.fileSystem);
        /**
         *
         */
        this.components = new Components(this, {});
        /**
         *
         */
        this.info = new Info(this, {});
        this.moduleManager = moduleManager;
        this.moduleManager.modules.push(this);
        this.id = id;
        this.path = path;
        this.initialize().then(() => {
            this.ready();
        }).catch(err => {
            console.log(err);
        });
    }
    /**
     *
     */
    async initialize() {
        this.log(`Reading > ${this.path}${this.id}.info.json`);
        const info = await this.fileSystem.readJSON(`${this.path}${this.id}.info.json`);
        if (info !== undefined) {
            this.info = new Info(this, info);
        }
        this.log(`Reading > ${this.path}${this.id}.routing.json`);
        const routes = await this.fileSystem.readJSON(`${this.path}${this.id}.routing.json`);
        if (routes !== undefined) {
            const ids = Object.keys(routes);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const route = routes[id];
                new Route(this, id, route);
            }
        }
        // Get all registered components.
        const components = await this.fileSystem.readJSON(`${this.path}${this.id}.components.json`);
        // Sanity check.
        if (components !== undefined) {
            const types = ['elements', 'containers', 'regions'];
            for (let i = 0; i < types.length; i++) {
                let type = this.fallback(components, types[i], {});
                const ids = Object.keys(type);
                console.debug('Loading component ->', type);
                for (let j = 0; j < ids.length; j++) {
                    const id = ids[j];
                    let component = type[id];
                    type[id]['type'] = types[i];
                    new Component(this, id, component);
                }
            }
        }
    }
    /**
     *
     */
    ready() {
        this.moduleManager.moduleReady(this);
    }
}
