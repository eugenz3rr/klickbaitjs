import Console from "../Console";
export default class EventManager extends Console {
    /**
     *
     * @param fileSystem
     */
    constructor(fileSystemManager) {
        super(fileSystemManager);
        /**
         *
         */
        this.events = [];
        this.fileSystemManager = fileSystemManager;
    }
    /**
     *
     * @param id
     * @param context
     */
    async fire(id, context = {}) {
        let events = this.find(id);
        if (events === false) {
            return;
        }
        let result;
        for (let i = 0; i < events.length; i++) {
            try {
                result = await events[i].execute(context);
            }
            catch (e) {
                console.error(`There was an error executing the event "${id}". \n Please review.`, e);
            }
        }
        return result;
    }
    /**
     *
     * @param id
     * @private
     */
    find(id) {
        let events = [];
        // Find the id that matches the parameter id.
        for (let i = 0; i < this.events.length; i++) {
            let current_event = this.events[i];
            if (current_event.id === id) {
                events.push(current_event);
            }
        }
        return events;
    }
}
