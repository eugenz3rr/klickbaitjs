export default class DefaultFileSystem {
    async ensure() {
        return false;
    }
    async toUrl() {
        return false;
    }
    async exists() {
        return false;
    }
    async create() {
        return false;
    }
    async remove(path) {
        if (!window.localStorage.hasOwnProperty(path)) {
            return;
        }
        window.localStorage.removeItem(path);
    }
    async read(path) {
        if (!window.localStorage.hasOwnProperty(path)) {
            return undefined;
        }
        return window.localStorage.getItem(path);
    }
    async readJSON(path) {
        if (!window.localStorage.hasOwnProperty(path)) {
            return undefined;
        }
        // @ts-ignore
        return JSON.parse(window.localStorage.getItem(path));
    }
    async write(path, content) {
        window.localStorage.setItem(path, content);
    }
    async list(path, optionString = '') {
        let keys = Object.keys(window.localStorage);
        // @ts-ignore
        let values = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (!key.includes(path)) {
                continue;
            }
            // Continue if extension is detected.
            if (optionString.includes('d')) {
                let source = key.split('/');
                // Filter array from empty entries.
                source = source.filter(item => item);
                let target = path.split('/');
                // Filter array from empty entries.
                target = target.filter(item => item);
                if (source.length > target.length) {
                    let isFile = source[target.length].split('.').length > 1;
                    // @ts-ignore
                    source = '/' + source.splice(0, target.length + 1).join('/') + '/';
                    // @ts-ignore
                    if (!isFile && !values.includes(source))
                        values.push(source);
                }
            }
            // Continue if extension is detected.
            if (optionString.includes('f')) {
                let source = key.split('/');
                // Filter array from empty entries.
                source = source.filter(item => item);
                let target = path.split('/');
                // Filter array from empty entries.
                target = target.filter(item => item);
                if (source.length === (target.length + 1)) {
                    let isFile = source[target.length].split('.').length > 1;
                    // @ts-ignore
                    source = '/' + source.splice(0, target.length + 1).join('/');
                    if (isFile && !values.includes(source))
                        values.push(source);
                }
            }
        }
        return values;
    }
}
