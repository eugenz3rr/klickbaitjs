import Helper from "./Helper";
export default class Console extends Helper {
    constructor(fileSystem) {
        super(fileSystem);
    }
    log(...data) {
        console.debug(data.join('\n'));
    }
    emit(event, detail) {
        dispatchEvent(new CustomEvent(event, {
            detail,
        }));
    }
    alterEvent(event, detail) {
        dispatchEvent(new CustomEvent(`${event}.alter`, {
            detail,
        }));
    }
    on(event, callback) {
        // @ts-ignore
        window.addEventListener(event, callback);
    }
}
