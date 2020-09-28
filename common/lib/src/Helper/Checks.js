export default class Checks {
    constructor() { }
    fallback(object, item, fallback) {
        // Check if item exists if not use the fallback.
        if (item in object) {
            return object[item];
        }
        return fallback;
    }
}
