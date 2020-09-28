import CordovaPromiseFS from 'cordova-promise-fs';
import promiscuous from "promiscuous";
import * as Common from "./../../common/lib/Library";

let cordovaExists = false;
window.cordovaExists = cordovaExists;
window.CordovaPromiseFS = CordovaPromiseFS;

console.debug("Starting app.");

try {
    if (typeof cordova !== 'undefined' && cordova.file.cacheDirectory) {
        cordovaExists = true;
    }
}
catch (error) {
    console.log(error);
}

let fileSystem;
if (cordovaExists) {
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
            const keys = Object.keys(window.localStorage);
            let values = [];

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (!key.includes(path)) {
                    continue;
                }

                // Continue if extension is detected.
                if (optionString === 'd') {
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

                    continue;
                }

                values.push(key);
            }

            return values;
        },
    };

    window.localSystem = {};
}

const Manager = new Common.Manager(fileSystem);
window['Manager'] = Manager;
console.log(Manager)

window.fileSystem = fileSystem;

