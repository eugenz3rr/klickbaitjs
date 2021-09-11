import Event from "./Event";
import Console from "../Console";
import FileSystemManager from "../FileSystem/Manager";

export default class EventManager extends Console {

  /**
   * A list of registered events.
   */
  public events: Event[] = [];

  /**
   * Constructor.
   *
   * @param fileSystemManager
   *   Expects the file system manager.
   */
  constructor(fileSystemManager: FileSystemManager) {
    super(fileSystemManager);
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
  public async fire(id: string, context: object = {}): Promise<any> {
    let events: Event[] | false = this.find(id);

    // Check if any events exist.
    if (events === false) {
      return;
    }

    let result;

    // Execute each event that was registered.
    for (let i = 0; i < events.length; i++) {
      try {
        result = await events[i].execute(context);
      } catch (e) {

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
  private find(id: string): Event[] | false {
    let events: Event[] = [];

    // Find the id that matches the parameter id.
    events = this.events.filter(event => {
      return event.id === id;
    });

    return events;
  }
}