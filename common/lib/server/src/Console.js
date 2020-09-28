import Helper from "./Helper";
export default class Console extends Helper {
    constructor() {
        super();
    }
    log(...data) {
        console.debug(data);
    }
}
