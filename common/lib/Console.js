import Helper from "./Helper";
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
    constructor(fileSystemManager) {
        super(fileSystemManager);
    }
    /**
     * Console debug wrapper.
     *
     * @param data
     *   Expects any data.
     */
    log(...data) {
        console.debug(data.join('\n'));
    }
}
