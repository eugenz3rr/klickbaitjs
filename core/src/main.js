import mime from 'mime-types';
import topSort from 'toposort';
import CacheFileSystem from "./FileSystems/CacheFileSystem";
import ReadOnlyCacheFileSystem from "./FileSystems/ReadOnlyCacheFileSystem";
import PermanentFileSystem from "./FileSystems/PermanentFileSystem";
import Installer from "./Installer";
import Manager from "../../common/lib/Manager";

window.mime = mime;
window.topSort = topSort;

// This import is managed via webpack.
// ca-app-pub-4637983949499079~2000555188
// admob.setOptions({
//     publisherId:           "ca-app-pub-3940256099942544/6300978111",  // Required
//     autoShowBanner:        true,                                      // Optional
//     autoShowRInterstitial: false,                                     // Optional
//     autoShowRewarded:      false,                                     // Optional
// });
//
// admob.createBannerView();
window.file_systems = [];

(async () => {

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

    window.Manager = new Manager(file_systems);

    dispatchEvent(new CustomEvent('klickbait-ready'));
})().then(() => {}).catch(e => {
    console.error('Cordova core could not be defined.', e);
});
