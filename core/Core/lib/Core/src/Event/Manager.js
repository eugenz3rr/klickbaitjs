import Console from "../Console";
export default class EventManager extends Console {
    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager) {
        super(fileSystemManager);
        /**
         * A list of registered events.
         */
        this.events = [];
        this.fileSystemManager = fileSystemManager;
    }
    /**
     * Executes the events.
     *
     * @param id
     *   Expects the id of the event.
     * @param context
     *   Expects the context of the event.
     *   This context is defined by the module that fires that event.
     */
    async fire(id, context = {}) {
        let events = this.find(id);
        // Check if any events exist.
        if (events === false) {
            return;
        }
        let result;
        // Execute each event that was registered.
        for (let i = 0; i < events.length; i++) {
            try {
                result = await events[i].execute(context);
            }
            catch (e) {
                // Throw error.
                // @todo: Add a debug option to hide errors.
                console.error(`There was an error executing the event "${id}". \n Please review.`, e);
            }
        }
        return result;
    }
    /**
     * Filter events by id.
     *
     * @param id
     *   Expects the id of the event.
     *
     * @returns
     *   Returns an array of events or false if nothing found.
     *
     * @private
     */
    find(id) {
        let events = [];
        // Find the id that matches the parameter id.
        events = this.events.filter(event => {
            return event.id === id;
        });
        return events;
    }
}
