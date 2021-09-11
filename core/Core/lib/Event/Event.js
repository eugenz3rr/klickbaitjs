import Console from "../Console";
export default class Event extends Console {
    /**
     * Constructor.
     *
     * @param module
     *   Expects the module.
     * @param id
     *   Expects the event id.
     * @param event_code
     *   Expects the event code.
     */
    constructor(module, id, event_code) {
        super(module.fileSystemManager);
        this.module = module;
        this.eventManager = module.eventManager;
        this.eventManager.events.push(this);
        this.id = id;
        this.eventCode = event_code;
    }
    /**
     * Executes the event code.
     *
     * @param context
     */
    async execute(context) {
        return await this.eventCode(context);
    }
}
