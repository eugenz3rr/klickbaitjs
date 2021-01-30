import Console from "../Console";
import Module from "../Module/Module";
import EventManager from "./Manager";

export default class Event extends Console {
    public id: string;
    public event_code: Function;
    public module: Module;
    public eventManager: EventManager;

    constructor(module: Module, id: string, event_code: Function) {
        super(module.fileSystem);

        this.module = module;
        this.eventManager = module.eventManager;
        this.eventManager.events.push(this);

        this.id = id;
        this.event_code = event_code;
    }

    public async execute(): Promise<void> {
        await this.event_code();
    }
}