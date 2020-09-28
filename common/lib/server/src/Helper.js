import fs from "fs";
export default class Helper {
    constructor() { }
    fallback(object, item, fallback) {
        // Check if item exists if not use the fallback.
        if (item in object) {
            return object[item];
        }
        return fallback;
    }
    async readFileSync(path) {
        let contents = undefined;
        try {
            contents = fs.readFileSync(path, 'utf8');
        }
        catch (error) {
            return undefined;
        }
        return contents;
    }
    async writeFileSync(path, content) {
        await fs.writeFileSync(path, content);
    }
}
