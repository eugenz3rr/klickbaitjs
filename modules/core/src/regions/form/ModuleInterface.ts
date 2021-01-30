export default interface ModuleInterface {
    moduleManager: object;
    routeManager: object;
    componentManager: object;
    components: object;
    info: object;
    path: string;
    id: string;
    constructor(moduleManager: object, path: string, id: string): void;
    initialize(): Promise<any>,
    appendStyle(path: string, id: string): void,
}