import Event from "./Event";
import FileSystem from "../FileSystem";
import Console from "../Console";

export default class EventManager extends Console {

  /**
   *
   */
  public events: Event[] = [];

  /**
   *
   * @param fileSystem
   */
  constructor(fileSystem: FileSystem) {
    super(fileSystem);
    this.fileSystem = fileSystem;
  }

  /**
   *
   * @param id
   * @param context
   */
  public async fire(id: string, context: object = {}): Promise<any> {
    let events: Event[] | false = this.find(id);

    if (events === false) {
      return;
    }

    let result;
    for (let i = 0; i < events.length; i++) {
      try {
        result = await events[i].execute(context);
      } catch (e) {
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
  private find(id: string): Event[] | false {
    let events: Event[] = [];

    // Find the id that matches the parameter id.
    for (let i = 0; i < this.events.length; i++) {
      let current_event = this.events[i];
      if (current_event.id === id) {
        events.push(current_event);
        break;
      }
    }

    return events;
  }
}