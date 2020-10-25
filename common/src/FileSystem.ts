export default interface FileSystem {

  /**
   * @description Checks if file exists.
   * @param {string} filename 
   * @returns Returns fileEntry or false.
   */
  exists(filename: string): Boolean | FileEntry,

  /**
   * @param {string} filename 
   * @returns Returns fileEntry.
   */
  file(filename: string): FileEntry,

  /**
   * @param {string} path
   * @returns Returns dirEntry.
   */
  dir(path: string): DirectoryEntry,

  /**
   * @param {string} path
   * @param {string} optionString
   * @returns Return array with filenames (including path).
   */
  list(path: string, optionString: string): string[],

  /**
   * @param {string} filename
   * @returns Returns text-content of a file.
   */
  read(filename: string): Promise<string>,

  /**
   * @param {string} filename
   * @returns Returns JSON-parsed contents of a file.
   */
  readJSON(filename: string): any,

  /**
   * @param {string} filename
   * @returns Returns URL to be used in js/html/css (file://....).
   */
  toUrl(filename: string): string,

  /**
   * @param {string} filename
   * @returns Returns cordova internal URL (cdvfile://....).
   */
  toInternalURL(filename: string): string,

  /**
   * @param {string} filename
   * @returns Returns Base64 encoded Data URI.
   */
  toDataURL(filename: string): string,

  /**
   * @description Writes a Blob, a String, or data (as JSON). Ensures directory exists.
   * @param {string} filename 
   * @param {Blob | string | JSON} data 
   */
  write(filename: string, data: Blob | string | JSON): void,

  /**
   * @description Creates a file.
   * @param {string} filename
   */
  create(filename: string): void,

  /**
   * @description Ensures directory exists.
   * @param {string} path
   */
  ensure(path: string): void,

  /**
   * @description Move from source to destination. Ensures dest directory exists.
   * @param {string} source 
   * @param {string} destination 
   */
  move(source: string, destination: string): void,

  /**
   * @description Move from source to destination. Ensures destination directory exists.
   * @param {string} source 
   * @param {string} destination 
   */
  moveDir(source: string, destination: string): void,

  /**
   * @description Copy from source to destination. Ensures destination directory exists.
   * @param {string} source 
   * @param {string} destination 
   */
  copy(source: string, destination: string): void,

  /**
   * @description Removes file. Resolves even if file was already removed.
   * @param {string} source 
   * @param {string} destination 
   */
  remove(source: string): void,

  /**
   * @description Removes file. Rejects when file does not exist.
   * @param {string} source 
   * @param {string} destination 
   */
  remove(source: string, resolve: boolean): void,

  /**
   * @description Removes directory. Resolves even if directory was already removed.
   * @param {string} source 
   * @param {string} destination 
   */
  removeDir(path: string): void,
}