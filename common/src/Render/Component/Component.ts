import Console from "../../Console";
import Module from "../../Module/Module";

export default class Component extends Console {

    /**
     * Component id.
     */
    public id: string = '';

    /**
     * Component title.
     */
    public title: string = '';

    /**
     * Component description.
     */
    public description: string = '';

    /**
     * Component path.
     */
    public path: string = '';

    /**
     * Component module.
     */
    public module: Module;

    /**
     * Component type.
     */
    public type: any = '';

    /**
     * Component code.
     */
    public raw: Function = () => {};

    public component: any = {};

    constructor(module: Module, id: string, component: any) {
        super(module.fileSystemManager);

        // Set access;
        this.module = module;

        // Set default value.
        this.id = id;
        this.title = this.fallback(component, 'title', 'No title set');
        this.description = this.fallback(component, 'description', 'No description set');
        this.path = this.fallback(component, 'path', 'No path set');
        this.type = this.fallback(component, 'type', 'elements');
    }

    /**
     * A function to load the component.
     */
    public load = async () => {
        const component = await this.fileSystemManager.read(this.module.path + this.path);

        // Execute order 66.
        this.raw = eval(component);
        this.component = this.raw(this.module);

        switch (this.type) {
            case 'regions':
                this.module.componentManager.regions.push(this);
                break;
            case 'containers':
                this.module.componentManager.containers.push(this);
                break;
            case 'elements':
                this.module.componentManager.elements.push(this);
                break;
        }
    }

    public getComponent(): any {
        this.component = this.raw(this.module);
        return this.component;
    }
}