import Checks from "./Checks";
export default class Console extends Checks {
    constructor() {
        super();
    }
    log(...data) {
        console.debug(data);
    }
}
