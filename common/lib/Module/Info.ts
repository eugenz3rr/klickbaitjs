import Console from "../../../src/Helper/Console";

export default class Info extends Console {

  public name: string = '';
  public description: string = '';
  public group: string = '';
  public type: string = '';
  public version: string = '';
  public dependencies: string[] = [];

  constructor(info: any) {
    super();
    
    // Match all items.
    this.name = this.fallback(info, 'name', 'undefined');
    this.description = this.fallback(info, 'description', 'undefined');
    this.group = this.fallback(info, 'group', 'undefined');
    this.type = this.fallback(info, 'type', 'undefined');
    this.version = this.fallback(info, 'version', 'undefined');
    this.dependencies = this.fallback(info, 'dependencies', []);
  }
}