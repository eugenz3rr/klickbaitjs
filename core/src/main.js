import CordovaPromiseFS from 'cordova-promise-fs';
import promiscuous from "promiscuous";
import mime from 'mime-types';

window.cordovaExists = false;
window.CordovaPromiseFS = CordovaPromiseFS;
window.mime = mime;

document.addEventListener('deviceready', async () => {

    // ca-app-pub-4637983949499079~2000555188
    admob.setOptions({
        publisherId:           "ca-app-pub-3940256099942544/6300978111",  // Required
        autoShowBanner:        true,                                      // Optional
        autoShowRInterstitial: false,                                     // Optional
        autoShowRewarded:      false,                                     // Optional
    });

    admob.createBannerView();

    try {
        if (typeof cordova !== 'undefined' && cordova.file.cacheDirectory) {
            window.cordovaExists = true;
        }
        else {
            console.warn('Cordova', cordova, cordova.file.cacheDirectory);
        }
    }
    catch (error) {
        console.log(error);
    }

    let fileSystem;
    if (window.cordovaExists) {
        console.debug("Cordova was appended and fileSystem initialized.");
        fileSystem = CordovaPromiseFS({
            persistent: true, // or false
            storageSize: 20 * 1024 * 1024, // storage size in bytes, default 20MB
            concurrency: 3, // how many concurrent uploads/downloads?
            Promise: promiscuous,
            fileSystem: cordova.file.cacheDirectory
        });
    }
    else {
        console.debug("Cordova was not appended.");
        fileSystem = {
            ensure: async () => {
                return false;
            },
            toUrl: async () => {
                return false;
            },
            exists: async () => {
                return false;
            },
            create: async () => {
                return false;
            },
            read: async (path) => {
                if (!window.localStorage.hasOwnProperty(path)) {
                    return undefined;
                }

                return window.localStorage.getItem(path);
            },
            readJSON: async (path) => {
                if (!window.localStorage.hasOwnProperty(path)) {
                    return undefined;
                }

                return JSON.parse(window.localStorage.getItem(path));
            },
            write: async (path, content) => {
                window.localStorage.setItem(path, content);
            },
            list: async (path, optionString = '') => {
                let keys = Object.keys(window.localStorage);
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
                            source = '/' + source.splice(0, target.length + 1).join('/') + '/';
                            if (!isFile && !values.includes(source)) values.push(source);
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
                            source = '/' + source.splice(0, target.length + 1).join('/');
                            if (isFile && !values.includes(source)) values.push(source);
                        }
                    }
                }

                return values;
            },
        };

        window.localSystem = {};
    }

    window.fileSystem = fileSystem;
    dispatchEvent(new CustomEvent('klickbait-ready'));
});