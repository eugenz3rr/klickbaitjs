import Console from "../Console";
import Module from "../Module/Module";
import EventManager from "./Manager";

export default class Event extends Console {

  /**
   * The id of the event.
   */
  public id: string;

  /**
   * The event code that is executed when the event is fired.
   */
  public eventCode: Function;

  /**
   * The module the event belongs to.
   */
  public module: Module;

  /**
   * The event manager that fires the right events.
   */
  public eventManager: EventManager;

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
  constructor(module: Module, id: string, event_code: Function) {
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
  public async execute(context: object): Promise<any> {
    return await this.eventCode(context);
  }
}