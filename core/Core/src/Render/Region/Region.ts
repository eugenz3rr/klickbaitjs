import Console from "../../Console";
import FileSystem from "../../FileSystem";
import RegionManager from "./Manager";
import Route from "../Route/Route";
import Module from "../../Module/Module";

interface RegionRaw {
    build: Function,
}

export default class Region extends Console {
    public module: Module;
    public regionManager: RegionManager;

    public type: string = "";
    public title: string = "";
    public description: string = "";
    public path: string = "";

    public regionRaw: RegionRaw | Object = {};
    public renderArray: Object[] = [];

    constructor(route: Route, data: any) {
        super(route.fileSystemManager);
        this.regionManager = route.regionManager;

        this.module = route.module;
        this.regionManager = route.regionManager;

        // Map values.
        this.type = this.fallback(data, 'type', 'content');
        this.title = this.fallback(data, 'title', 'No title.');
        this.description = this.fallback(data, 'description', 'No description.');
        this.path = this.fallback(data, 'path', '404');

        this.regionManager.regions.push(this);
    }

    public async load(force: boolean = false, fileSystem: FileSystem | undefined = undefined): Promise<any> {
        if (Object.keys(this.regionRaw).length !== 0 && !force) {
            return;
        }

        let region = undefined;
        try {
            region = await this.fileSystemManager.read(`${this.module.path}${this.path}`);
        } catch (e) {
            console.warn(`${this.module.path}${this.path} - Was not found in the public fs. Defaulting to private.`, e);
        }

        if (region !== undefined) {

            // Interpret code and execute it.
            this.regionRaw = eval(region);
        }
        else {
            return;
        }
    }

    public async build(): Promise<any> {
        if (this.path === '404') {
            return {};
        }

        await this.load();

        if ("build" in this.regionRaw) {
            this.renderArray = this.regionRaw.build(this.module);
        }
    }
}