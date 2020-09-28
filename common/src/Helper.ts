import FileSystem from "./FileSystem";

export default class Helper {
  public fileSystem: FileSystem;

  constructor (fileSystem: FileSystem) {
    this.fileSystem = fileSystem;
  }

  public fallback(object: any, item: string, fallback: any): any {
    
    // Check if item exists if not use the fallback.
    if (item in object) {
      return object[item];
    }
    return fallback;
  }
}