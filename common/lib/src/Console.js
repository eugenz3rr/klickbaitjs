import Helper from "./Helper";
export default class Console extends Helper {
    constructor(fileSystem) {
        super(fileSystem);
    }
    log(...data) {
        console.debug(data);
    }
}
