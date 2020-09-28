import Console from "../../Console";
import FileSystem from "../../FileSystem";
import RegionManager from "./Manager";
import Route from "../Route/Route";
import RouteManager from "../Route/Manager";
import Module from "../../Module/Module";

interface RegionRaw {
    build: Function,
}

export default class Region extends Console {
    public module: Module;
    public regionManager: RegionManager;
    public fileSystem: FileSystem;

    public type: string = "";
    public title: string = "";
    public description: string = "";
    public path: string = "";

    public regionRaw: RegionRaw = {};
    public renderArray: Object[] = [];

    constructor(route: Route, data: any) {
        super(route.fileSystem);
        this.regionManager = route.regionManager;

        this.module = route.module;
        this.fileSystem = route.module.fileSystem;
        this.regionManager = route.regionManager;

        // Map values.
        this.type = this.fallback(data, 'type', 'content');
        this.title = this.fallback(data, 'title', 'No title.');
        this.description = this.fallback(data, 'description', 'No description.');
        this.path = this.fallback(data, 'path', '404');

        this.regionManager.regions.push(this);
    }

    public async load(force: boolean = false): Promise<any> {
        if (Object.keys(this.regionRaw).length !== 0 && !force) {
            return;
        }

        let region = await this.fileSystem.read(`${this.module.path}${this.path}`);
        console.debug(`${this.module.path}${this.path}`)
        if (typeof region !== 'undefined') {

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

        this.renderArray = this.regionRaw.build(this.module);
    }
}