import Console from "./Console";
import Module from "./Module/Module";

export default class Info extends Console {

  /**
   * Contains the module name.
   */
  public name: string = '';

  /**
   * Contains the module description.
   */
  public description: string = '';

  /**
   * Defines in what group the module belongs. (core, theme)
   */
  public group: string = '';

  /**
   * Defines what the module implements on a very basic level.
   */
  public type: string = '';

  /**
   * Defines the current version of the module.
   */
  public version: string = '';

  /**
   * Defines the module dependencies.
   */
  public dependencies: string[] = [];

  /**
   * Constructor.
   *
   * @param module {Module}
   * @param info {Object}
   */
  constructor(module: Module, info: any) {
    super(module.fileSystem);
    
    // Match all items.
    this.name = this.fallback(info, 'name', 'undefined');
    this.description = this.fallback(info, 'description', 'undefined');
    this.group = this.fallback(info, 'group', 'undefined');
    this.type = this.fallback(info, 'type', 'undefined');
    this.version = this.fallback(info, 'version', 'undefined');
    this.dependencies = this.fallback(info, 'dependencies', []);
  }
}