import ModuleInterface from "./ModuleInterface";

interface InfoInterface {
    title: string,
    description: string,
    id: string,
    tab: string,
    location: string,
    submit: string
}

export default class Form {

    public info: InfoInterface;
    private render_object = {};

    constructor(info: InfoInterface) {
        this.info = info;
    }

    public async build (Module: ModuleInterface, data: object): Promise<any> {
        this.render_object = [];

    }

    public async validate (Module: ModuleInterface, data: object): Promise<boolean> {

        return true;
    }

    public async submit (Module: ModuleInterface, data: object): Promise<boolean> {

        return true;
    }

    public addComponent(id: string, type: string, options: object) {
        let weight = Object.keys(this.render_object);

        this.render_object[id] = {
            '#type': type,
            '#weight': weight,
            ...options
        }
    }
}