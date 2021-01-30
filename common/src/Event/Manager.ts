import Event from "./Event";
import FileSystem from "../FileSystem";
import Console from "../Console";

export default class EventManager extends Console {
    public events: Event[] = [];
    public path: string = '';

    constructor(fileSystem: FileSystem) {
        super(fileSystem);
        this.fileSystem = fileSystem;
    }

    public fire(id: string): void {
        let event: Event | false = this.find(id);

        if (event === false) {
            return;
        }

        event.execute().then(() => {}).catch(e => {
            console.error(`There was an error executing the event "${id}". \n Please review.`, e);
        });
    }

    private find(id: string): Event | false  {
        let event: Event | boolean = false;

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