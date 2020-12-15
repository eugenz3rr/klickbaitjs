import Helper from "./Helper";
import FileSystem from "./FileSystem";

export default class Console extends Helper {
    constructor(fileSystem: FileSystem) {
        super(fileSystem);
    }

    public log(...data: any): void {

        console.debug(data.join('\n'));
    }

    public emit(event: string, detail: any): void {
        // @ts-ignore
        //window.EventBus.$emit(event, detail);
    }

    public off(event: string, detail: any): void {
        // @ts-ignore
        //window.EventBus.$off(event, detail);
    }

    public alterEvent(event: string, detail: any): void {
        dispatchEvent(new CustomEvent(`${event}.alter`, {
            detail,
        }));
    }

    public on(event: string, callback: Function): void {
        // @ts-ignore
        //window.EventBus.$on(event, callback);
    }
}