import Console from "../Console";
export default class Event extends Console {
    constructor(module, id, event_code) {
        super(module.fileSystem);
        this.module = module;
        this.eventManager = module.eventManager;
        this.eventManager.events.push(this);
        this.id = id;
        this.event_code = event_code;
    }
    async execute() {
        await this.event_code();
    }
}
