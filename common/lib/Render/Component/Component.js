import Console from "../../Console";
export default class Component extends Console {
    constructor(module, id, component) {
        super(module.fileSystemManager);
        /**
         * Component id.
         */
        this.id = '';
        /**
         * Component title.
         */
        this.title = '';
        /**
         * Component description.
         */
        this.description = '';
        /**
         * Component path.
         */
        this.path = '';
        /**
         * Component type.
         */
        this.type = '';
        /**
         * Component code.
         */
        this.raw = () => { };
        this.component = {};
        /**
         * A function to load the component.
         */
        this.load = async () => {
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
        };
        // Set access;
        this.module = module;
        // Set default value.
        this.id = id;
        this.title = this.fallback(component, 'title', 'No title set');
        this.description = this.fallback(component, 'description', 'No description set');
        this.path = this.fallback(component, 'path', 'No path set');
        this.type = this.fallback(component, 'type', 'elements');
    }
    getComponent() {
        this.component = this.raw(this.module);
        return this.component;
    }
}
