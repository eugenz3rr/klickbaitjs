import Console from "../../../src/Helper/Console";
import ModuleManager from "./Manager";

export default class  Module extends Console {
  public moduleManager: ModuleManager;

  constructor(moduleManager: ModuleManager, path: "") {
    super();

    this.moduleManager = moduleManager;
    this.moduleManager.modules.push(this);
  }

  private async initialize(): Promise<any> {

  }

  private ready(): void {
    this.moduleManager.moduleReady(this);
  }
} 