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
     * Constructor.
     *
     * @param moduleManager
     * @param path
     * @param id
     */
    constructor(moduleManager, path, id) {
        super(moduleManager.fileSystemManager);
        /**
         *
         */
        this.routeManager = new RouteManager(this.fileSystemManager);
        /**
         *
         */
        this.componentManager = new ComponentManager(this.fileSystemManager);
        /**
         *
         */
        this.eventManager = new EventManager(this.fileSystemManager);
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
    }
    /**
     * A helper to fetch config files.
     *
     * @param path
     * @param file
     * @private
     */
    async readConfigFile(file, path = this.path) {
        this.log(`Reading > ${path}${file}`);
        let file_contents = undefined;
        try {
            file_contents = await this.fileSystemManager.readJSON(`${path}${file}`);
        }
        catch (e) {
            console.warn(`${this.path}${file} - Could not be found.`, e);
        }
        return file_contents;
    }
    /**
     *
     * @private
     */
    async loadInfo() {
        let info = await this.readConfigFile(`${this.id}.info.json`);
        if (info !== undefined) {
            this.info = new Info(this, info);
        }
    }
    /**
     *
     * @private
     */
    async loadRoutes() {
        let routes = await this.readConfigFile(`${this.id}.routing.json`);
        if (routes !== undefined) {
            const ids = Object.keys(routes);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const route = routes[id];
                new Route(this, id, route);
            }
        }
    }
    /**
     *
     * @private
     */
    async loadComponents() {
        let components = await this.readConfigFile(`${this.id}.components.json`);
        // Sanity check.
        if (components !== undefined) {
            const types = ['elements', 'containers', 'regions'];
            console.groupCollapsed("Component Loading");
            for (let i = 0; i < types.length; i++) {
                let type = this.fallback(components, types[i], {});
                const ids = Object.keys(type);
                console.debug('Loading component ->', type);
                for (let j = 0; j < ids.length; j++) {
                    const id = ids[j];
                    let component = type[id];
                    type[id]['type'] = types[i];
                    component = new Component(this, id, component);
                    // Start loading.
                    try {
                        await component.load();
                        console.log(component.title, "Component loaded.");
                    }
                    catch (e) {
                        console.error(component.path, 'Could not be loaded as it does not exist.');
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
    async loadEvents() {
        this.log(`Reading > ${this.path}${this.id}.events.js`);
        let events = undefined;
        try {
            events = await this.fileSystemManager.read(`${this.path}${this.id}.events.js`);
        }
        catch (e) {
            console.warn(`${this.path}${this.id}.events.js - Could not be found. Using default.`, e);
        }
        if (events !== undefined) {
            // @ts-ignore
            events = eval(events);
            let ids = Object.keys(events);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const event = events[id];
                new Event(this, id, event);
            }
        }
    }
    /**
     * The initialize part is loading all needed config files.
     */
    async initialize() {
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
    appendStyle(path, id) {
        // If the source was already appended just ignore the rest.
        if (document.querySelector(`style[data-source-id="${id}"]`))
            return;
        this.fileSystemManager.read(`${this.path}${path}`).then(value => {
            const style = document.createElement('style');
            style.textContent = value;
            style.setAttribute('data-source-id', id);
            document.head.append(style);
        }).catch(() => {
        });
    }
}
