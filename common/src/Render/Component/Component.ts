import Console from "../../Console";
import Module from "../../Module/Module";
import {ComponentOptions} from "vue";
import {VueConfiguration} from "vue/types/vue";

export default class Component extends Console {

    public id: string = '';
    public title: string = '';
    public description: string = '';
    public path: string = '';
    public module: Module;

    public type: any = '';

    public raw: Function = () => {};

    public component: ComponentOptions<any> = {};

    constructor(module: Module, id: string, component: any) {
        super(module.fileSystem);

        // Set access;
        this.module = module;

        // Set default value.
        this.id = id;
        this.title = this.fallback(component, 'title', 'No title set');
        this.description = this.fallback(component, 'description', 'No description set');
        this.path = this.fallback(component, 'path', 'No path set');
        this.type = this.fallback(component, 'type', 'elements');

        // Start loading.
        this.load().then(() => {
            console.log(this.title, "Component loaded.")

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

        }).catch((err) => {
            console.error(this.path, 'Could not be loaded as it does not exist.')
        })
    }

    /**
     * A function to load the component.
     */
    public load = async () => {
        const component = await this.fileSystem.read(this.module.path + this.path);

        // Execute order 66.
        this.raw = eval(component);
        this.component = this.raw(this.module);
    }

    public getComponent(): any {
        this.component = this.raw(this.module);
        return this.component;
    }
}