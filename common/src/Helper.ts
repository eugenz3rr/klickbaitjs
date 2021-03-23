import FileSystem from "./FileSystem";

/**
 * A class that is used by all classes.
 *
 * It contains helper functions that need to be anywhere.
 */
export default class Helper {

  /**
   * Current file system.
   */
  public fileSystem: FileSystem;

  /**
   * Helper constructor.
   *
   * @param fileSystem
   *   Expects the current file system.
   */
  constructor (fileSystem: FileSystem) {
    this.fileSystem = fileSystem;
  }

  /**
   * A function to get an value or fallback without errors.
   *
   * @param object
   *   Expects an object.
   * @param key
   *   Expects a key to check in the object.
   * @param fallback
   *   Expects an fallback value.
   *
   * @returns
   *  Returns the key value if it exists or the fallback if the key does not exist.
   */
  public fallback(object: any, key: string, fallback: any): any {
    
    // Check if item exists if not use the fallback.
    if (key in object) {
      return object[key];
    }
    return fallback;
  }
}