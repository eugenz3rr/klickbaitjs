import Components from "./Components";
import Console from "./Console";
import Info from "./Info";
export default class Module extends Console {
    constructor(moduleManager, path, id) {
        super();
        this.components = new Components(this, {});
        this.info = new Info({});
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
    async initialize() {
        let info = await this.readFileSync(`${this.path}/${this.id}.info.json`);
        if (info !== undefined) {
            info = JSON.parse(info);
            this.info = new Info(info);
        }
        let components = await this.readFileSync(`${this.path}/${this.id}.components.json`);
        if (components !== undefined) {
            components = JSON.parse(components);
            this.components = new Components(this, components);
        }
    }
    ready() {
        this.moduleManager.moduleReady(this);
    }
}
