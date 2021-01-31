import KlickbaitConfiguration from "./KlickbaitConfiguration";
// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";

export default class CordovaConfiguration extends KlickbaitConfiguration {

    /**
     * @inheritDoc
     */
    public name: string = 'cordova';

    /**
     * @inheritDoc
     */
    public async initialize() {
        document.addEventListener('deviceready', async () => {
            this.publicFileSystem = CordovaPromiseFS({
                persistent: false, // or false
                storageSize: 20 * 1024 * 1024, // storage size in bytes, default 20MB
                concurrency: 3, // how many concurrent uploads/downloads?
                Promise: promiscuous,
                fileSystem: cordova.file.cacheDirectory
            });

            this.privateFileSystem = CordovaPromiseFS({
                persistent: true, // or false
                storageSize: 20 * 1024 * 1024, // storage size in bytes, default 20MB
                concurrency: 3, // how many concurrent uploads/downloads?
                Promise: promiscuous,
                fileSystem: cordova.file.cacheDirectory
            });

            this.applicationFileSystem = CordovaPromiseFS({
                persistent: true, // or false
                storageSize: 20 * 1024 * 1024, // storage size in bytes, default 20MB
                concurrency: 3, // how many concurrent uploads/downloads?
                Promise: promiscuous,
                fileSystem: cordova.file.applicationDirectory
            });
        });
    }
}