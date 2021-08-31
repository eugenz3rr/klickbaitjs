// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";
import CacheFileSystem from "./CacheFileSystem";
export default class PermanentFileSystem {
    constructor() {
        this.id = 'permanent';
        this.weight = 100;
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
                    storageSize: 1024 * 1024 * 1024,
                    concurrency: 3,
                    Promise: promiscuous,
                    fileSystem: cordova.file.dataDirectory
                });
                resolve();
            });
            resolve();
        });
    }
    async copy(options = {}) {
        return await this.fileSystem.copy(options.source, options.destination);
    }
    async create(options = {}) {
        return await this.fileSystem.create(options.filename);
    }
    async dir(options = {}) {
        return await this.fileSystem.dir(options.path);
    }
    async ensure(options = {}) {
        return await this.fileSystem.ensure(options.path);
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
        return await this.fileSystem.move(options.source, options.destination);
    }
    async moveDir(options = {}) {
        return await this.fileSystem.moveDir(options.source, options.destination);
    }
    async read(options = {}) {
        return await this.fileSystem.read(options.filename);
    }
    async readJSON(options = {}) {
        return await this.fileSystem.readJSON(options.filename);
    }
    async remove(options = {}) {
        return await this.fileSystem.remove(options.filename);
    }
    async removeDir(options = {}) {
        return await this.fileSystem.removeDir(options.path);
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
        return await this.fileSystem.write(options.filename, options.data);
    }
}
