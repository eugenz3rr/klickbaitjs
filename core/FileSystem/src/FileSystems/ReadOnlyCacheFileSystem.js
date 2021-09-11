// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";
import CacheFileSystem from "./CacheFileSystem";
export default class ReadOnlyCacheFileSystem {
    constructor() {
        this.id = 'readonly';
        this.weight = 50;
        this.fileSystem = new CacheFileSystem();
    }
    /**
     * @inheritDoc
     */
    async initialize() {
        await new Promise(resolve => {
            document.addEventListener('deviceready', async () => {
                this.fileSystem = CordovaPromiseFS({
                    persistent: true,
                    storageSize: 20 * 1024 * 1024,
                    concurrency: 3,
                    Promise: promiscuous,
                    fileSystem: cordova.file.applicationDirectory
                });
                resolve();
            });
            resolve();
        });
    }
    async copy(options = {}) {
        return 'ignore';
    }
    async create(options = {}) {
        return 'ignore';
    }
    async dir(options = {}) {
        return await this.fileSystem.dir(options.path);
    }
    async ensure(options = {}) {
        return 'ignore';
    }
    async exists(options = {}) {
        return await this.fileSystem.exists(options.filename);
    }
    async file(options = {}) {
        return await this.fileSystem.file(options.filename);
    }
    async list(options = {}) {
        return await this.fileSystem.list(options.path, options.optionString);
    }
    async move(options = {}) {
        return 'ignore';
    }
    async moveDir(options = {}) {
        return 'ignore';
    }
    async read(options = {}) {
        return await this.fileSystem.read(options.filename);
    }
    async readJSON(options = {}) {
        return await this.fileSystem.readJSON(options.filename);
    }
    async remove(options = {}) {
        return 'ignore';
    }
    async removeDir(options = {}) {
        return 'ignore';
    }
    async toDataURL(options = {}) {
        return await this.fileSystem.toDataURL(options.filename);
    }
    async toInternalURL(options = {}) {
        return await this.fileSystem.toInternalURL(options.filename);
    }
    async toUrl(options = {}) {
        return await this.fileSystem.toUrl(options.filename);
    }
    async write(options = {}) {
        return 'ignore';
    }
}
