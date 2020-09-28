import Module from "./Module";
import FileSystem from '../../../src/FileSystem';
import Console from "../../../src/Helper/Console";

export default class Manager extends Console {
  public modules: Module[] = [];
  public path: string = '';
  public fileSystem: FileSystem;

  constructor (fileSystem: any, root: string) {
    super();

    this.fileSystem = fileSystem;
    this.path = `${root}/modules`;
  }

  public async discover(): Promise<any> {

    // List all directories in the module directory.
    const directories: string[] = await this.fileSystem.list(this.path, 'd');
  };

  public moduleReady(module: Module): void {
    this.log();
  }
}