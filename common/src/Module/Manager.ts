import Module from "./Module";
import Console from "../Console";
import FileSystem from "../FileSystem";
import Manager from "../Manager";

interface Installed {
  version: string,
}

export default class ModuleManager extends Console {

  /**
   *
   */
  public manager: Manager;

  /**
   *
   */
  public modules: Module[] = [];

  /**
   *
   */
  public path: string = '';

  /**
   *
   * @param fileSystem
   * @param root
   * @param manager
   */
  constructor(fileSystem: FileSystem, root: string, manager: Manager) {
    super(fileSystem);

    this.manager = manager;
    this.fileSystem = fileSystem;
    this.path = root;
  }

  /**
   *
   * @param directories
   */
  public async sortByDependencies(directories: string[]): Promise<object[]> {

    let sort: any = {};
    let sorted_keys: any = [];

    // Load every module by id.
    for (let i = 0; i < directories.length; i++) {
      let directory = directories[i];

      let id: string = directory;
      let id_length: number = id.split('/').length;
      id = id.split('/')[id_length - 2];

      let info: any = undefined;

      try {
        info = await this.manager.configuration.applicationSystem.readJSON(`${directory}${id}.info.json`);
      } catch (e) {
      }

      if (info === undefined) {
        continue;
      }

      if ("dependencies" in info) {
        for (let j = 0; j < info.dependencies.length; j++) {
          sorted_keys.push([
            id,
            info.dependencies[j]
          ]);
        }
      }

      sort[id] = directory;
    }

    // @ts-ignore-start
    sorted_keys = window.topSort(sorted_keys).reverse();
    // @ts-ignore-end

    let sorted: any = [];
    for (let i = 0; i < sorted_keys.length; i++) {
      const sorted_key = sorted_keys[i];

      sorted.push({
        id: sorted_key,
        directory: sort[sorted_key]
      });
    }

    return sorted;
  }

  /**
   *
   */
  public async discover(): Promise<any> {

    let directories: any = [];
    try {
      directories = await this.manager.configuration.applicationSystem.list(this.path, 'd');

    } catch (e) {
      console.error('Could not list directories.', this.path, e);
    }

    directories = await this.sortByDependencies(directories);

    // List all directories in the module directory.
    for (let i = 0; i < directories.length; i++) {
      let module_data = directories[i];

      this.log('Directory found!', module_data.directory);

      try {
        const module = new Module(this, module_data.directory, module_data.id);
        await module.initialize();
        await this.manager.summary(module);
      } catch (e) {
        console.error('Could not initialize or summarize module.', module_data.directory, module_data.id, e);
      }
    }

    this.manager.eventManager.fire('modules.init', {
      modules: this.modules,
    }).then();
  }
}