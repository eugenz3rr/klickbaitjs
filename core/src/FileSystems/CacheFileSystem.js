export default class CacheFileSystem {
    constructor() {
        this.id = 'cache';
        this.weight = 0;
        this.localStorage = window.localStorage;
    }
    /**
     * @inheritDoc
     */
    async initialize() { }
    async copy(options = {}) {
        let item = this.localStorage.getItem(options.source);
        if (!item) {
            return 'ignore';
        }
        this.localStorage.setItem(options.destination, item);
        return true;
    }
    async create(options = {}) {
        this.localStorage.setItem(options.path, '');
        return true;
    }
    async dir(options = {}) {
        this.localStorage.setItem(options.path, '');
        return true;
    }
    async ensure(options = {}) {
        this.localStorage.setItem(options.path, '');
        return true;
    }
    async exists(options = {}) {
        return Object.keys(this.localStorage).includes(options.filename);
    }
    async file(options = {}) {
        return this.localStorage.getItem(options.filename);
    }
    async list(options = {}) {
        let { path, optionString } = options;
        let keys = Object.keys(this.localStorage);
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
                target = target.filter((item) => item);
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
                target = target.filter((item) => item);
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
    async move(options = {}) {
        let item = this.localStorage.getItem(options.source);
        this.localStorage.removeItem(options.source);
        if (!item) {
            return 'ignore';
        }
        this.localStorage.setItem(options.destination, item);
        return true;
    }
    async moveDir(options = {}) {
        let items = Object.keys(this.localStorage);
        items.filter((item) => {
            return item.search(options.source) === 0;
        });
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let value = this.localStorage.getItem(item);
            item.replace(options.source, options.destination);
            this.localStorage.setItem(item, value);
        }
        return true;
    }
    async read(options = {}) {
        return this.localStorage.getItem(options.filename);
    }
    async readJSON(options = {}) {
        let value = this.localStorage.getItem(options.filename);
        return JSON.parse(value);
    }
    async remove(options = {}) {
        this.localStorage.removeItem(options.filename);
        return true;
    }
    async removeDir(options = {}) {
        let items = Object.keys(this.localStorage);
        items.filter((item) => {
            return item.search(options.path) === 0;
        });
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            this.localStorage.removeItem(item);
        }
        return true;
    }
    async toDataURL(options = {}) {
        return 'ignore';
    }
    async toInternalURL(options = {}) {
        return 'ignore';
    }
    async toUrl(options = {}) {
        return 'ignore';
    }
    async write(options = {}) {
        this.localStorage.setItem(options.filename, options.data);
        return true;
    }
}
