import ReadOnlyCacheFileSystem from "./FileSystems/ReadOnlyCacheFileSystem";
import PermanentFileSystem from "./FileSystems/PermanentFileSystem";
import CacheFileSystem from "./FileSystems/CacheFileSystem";
import Installer from "./Installer";
import Manager from "../../Core/lib/Manager";
import Configuration from "../../Configuration/configuration.json";

import topSort from 'toposort';
import mime from 'mime-types';

window.file_systems = [];
window.topSort = topSort;
window.mime = mime;

// Instantiate filesystems and execute the manager.
(async () => {

    /*
     * Cache should always work
     * and should not fail on construct.
     */
    let cache = new CacheFileSystem();
    file_systems.push(cache);

    // Install all stuff in the cache.
    let installer = new Installer(cache);
    await installer.install();

    try {
        let cache_read_only = new ReadOnlyCacheFileSystem();
        await cache_read_only.initialize();
        file_systems.push(cache_read_only);
    }
    catch (e) {}

    try {
        let permanent = new PermanentFileSystem();
        await permanent.initialize();
        file_systems.push(permanent);
    }
    catch (e) {}

    window.Manager = new Manager(file_systems, Configuration.fileSystem);

    dispatchEvent(new CustomEvent('klickbait-ready'));
})().then(() => {}).catch(e => {
    console.error('Cordova core could not be defined.', e);
});
