import Components from "./Components";
import Console from "./Console";
import Info from "./Info";
export default class Module extends Console {
    /**
     *
     * @param moduleManager
     * @param path
     * @param id
     */
    constructor(moduleManager, path, id) {
        super(moduleManager.fileSystem);
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
        this.log(`Reading > ${this.path}${this.id}.components.json`);
        try {
            const components = await this.fileSystem.readJSON(`${this.path}${this.id}.components.json`);
            if (components !== undefined) {
                this.components = new Components(this, components);
            }
        }
        catch (error) {
            this.log(error);
        }
    }
    /**
     *
     */
    ready() {
        this.moduleManager.moduleReady(this);
    }
}
