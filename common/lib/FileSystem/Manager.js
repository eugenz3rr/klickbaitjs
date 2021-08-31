export default class FileSystemManager {
    constructor(fileSystems) {
        this.fileSystems = [];
        this.fileSystems = fileSystems;
        // Sort elements by weight.
        this.fileSystems.sort(function (a, b) {
            return a.weight - b.weight;
        });
    }
    async redirectMethod(method = '', write = false, options = {}) {
        if (write) {
            this.fileSystems.reverse();
        }
        let result = undefined;
        for (let i = 0; i < this.fileSystems.length; i++) {
            let file_system = this.fileSystems[i];
            try {
                if (i === 0) {
                    result = await file_system[method](options);
                }
                else {
                    await file_system[method](options);
                }
            }
            catch (e) {
                console.debug(`Could not ${write ? 'write into' : 'read from'} ${file_system.id}`);
            }
            // If we read stuff we want the first entry. (Cache)
            if (!write && result) {
                break;
            }
        }
        return result;
    }
    async copy(source, destination) {
        return await this.redirectMethod('copy', true, {
            source,
            destination,
        });
    }
    async create(filename) {
        return await this.redirectMethod('create', true, {
            filename,
        });
    }
    async dir(path) {
        return await this.redirectMethod('dir', true, {
            path,
        });
    }
    async ensure(path) {
        return await this.redirectMethod('ensure', true, {
            path,
        });
    }
    async exists(filename) {
        return await this.redirectMethod('exists', false, {
            filename,
        });
    }
    async file(filename) {
        return await this.redirectMethod('file', false, {
            filename,
        });
    }
    async list(path, optionString) {
        return await this.redirectMethod('list', false, {
            path,
            optionString,
        });
    }
    async move(source, destination) {
        return await this.redirectMethod('move', true, {
            source,
            destination,
        });
    }
    async moveDir(source, destination) {
        return await this.redirectMethod('moveDir', false, {
            source,
            destination,
        });
    }
    async read(filename) {
        return await this.redirectMethod('read', false, {
            filename,
        });
    }
    async readJSON(filename) {
        return await this.redirectMethod('readJSON', false, {
            filename,
        });
    }
    async remove(source, resolve) {
        return await this.redirectMethod('remove', true, {
            source,
            resolve,
        });
    }
    async removeDir(path) {
        return await this.redirectMethod('removeDir', true, {
            path,
        });
    }
    async toDataURL(filename) {
        return await this.redirectMethod('toDataURL', true, {
            filename,
        });
    }
    async toInternalURL(filename) {
        return await this.redirectMethod('toInternalURL', true, {
            filename,
        });
    }
    async toUrl(filename) {
        return await this.redirectMethod('toUrl', true, {
            filename,
        });
    }
    async write(filename, data) {
        return await this.redirectMethod('write', true, {
            filename,
            data,
        });
    }
}
