import Helper from "./Helper";
import FileSystem from "./FileSystem";
import FileSystemManager from "./FileSystem/Manager";

/**
 * A class for console stuff.
 */
export default class Console extends Helper {

    /**
     * Console constructor.
     *
     * @param fileSystem
     *   Expects the current file system.
     */
    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);
    }

    /**
     * Console debug wrapper.
     *
     * @param data
     *   Expects any data.
     */
    public log(...data: any): void {
        console.debug(data.join('\n'));
    }
}