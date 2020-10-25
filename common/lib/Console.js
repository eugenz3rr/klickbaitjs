import Helper from "./Helper";
export default class Console extends Helper {
    constructor(fileSystem) {
        super(fileSystem);
    }
    log(...data) {
        console.debug(data.join('\n'));
    }
    emit(event, detail) {
        // @ts-ignore
        window.EventBus.$emit(event, detail);
    }
    off(event, detail) {
        // @ts-ignore
        window.EventBus.$off(event, detail);
    }
    alterEvent(event, detail) {
        dispatchEvent(new CustomEvent(`${event}.alter`, {
            detail,
        }));
    }
    on(event, callback) {
        // @ts-ignore
        window.EventBus.$on(event, callback);
    }
}
