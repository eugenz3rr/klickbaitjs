// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";
export default class CordovaConfiguration {
    constructor() {
        /**
         * @inheritDoc
         */
        this.name = 'cordova';
    }
    /**
     * @inheritDoc
     */
    async initialize() {
        document.addEventListener('deviceready', async () => {
            this.publicFileSystem = CordovaPromiseFS({
                persistent: false,
                storageSize: 20 * 1024 * 1024,
                concurrency: 3,
                Promise: promiscuous,
                fileSystem: cordova.file.cacheDirectory
            });
            this.privateFileSystem = CordovaPromiseFS({
                persistent: true,
                storageSize: 20 * 1024 * 1024,
                concurrency: 3,
                Promise: promiscuous,
                fileSystem: cordova.file.cacheDirectory
            });
            this.applicationFileSystem = CordovaPromiseFS({
                persistent: true,
                storageSize: 20 * 1024 * 1024,
                concurrency: 3,
                Promise: promiscuous,
                fileSystem: cordova.file.applicationDirectory
            });
        });
    }
}
