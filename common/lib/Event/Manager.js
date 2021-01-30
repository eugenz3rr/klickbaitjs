import Console from "../Console";
export default class EventManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.events = [];
        this.path = '';
        this.fileSystem = fileSystem;
    }
    fire(id) {
        let event = this.find(id);
        if (event === false) {
            return;
        }
        event.execute().then(() => { }).catch(e => {
            console.error(`There was an error executing the event "${id}". \n Please review.`, e);
        });
    }
    find(id) {
        let event = false;
        // Find the id that matches the parameter id.
        for (let i = 0; i < this.events.length; i++) {
            let current_event = this.events[i];
            if (current_event.id === id) {
                event = current_event;
                break;
            }
        }
        return event;
    }
}
