import FileSystemInterface from "./FileSystemInterface";

export default class FileSystemManager {

    /**
     *
     */
    public fileSystems: Array<FileSystemInterface> = [];

    /**
     * Constructor.
     *
     * @param fileSystems
     */
    constructor(fileSystems: Array<FileSystemInterface>) {
        this.fileSystems = fileSystems;

        // Sort elements by weight.
        this.fileSystems.sort(function (a, b) {
            return a.weight - b.weight;
        });
    }

    /**
     * Calls the appropriate function of the file systems.
     *
     * @param method
     *   Expects the method name to call.
     * @param write
     *   Expects a decision whether the information should be written.
     * @param options
     *   Expects the options to redirect to the function.
     */
    public async redirectMethod(method: string = '', write: boolean = false, options: {}  = {}): Promise<any> {
        let file_systems = this.fileSystems;

        if (write) {
            file_systems.reverse();
        }

        let result: any = undefined;

        for (let i = 0; i < file_systems.length; i++) {
            let file_system: any = file_systems[i];

            try {

                // We only want to set the result if we need to read data.
                if (!write) {
                    result = await file_system[method](options);
                }
                else {
                    await file_system[method](options);
                }
            }
            catch (e) {

                // @todo: Add debug option.
                console.debug(`Could not ${write ? 'write into' : 'read from'} ${file_system.id}`)
            }

            // If we read stuff we want the first entry. (Cache)
            if (!write && result) {
                break;
            }
        }

        return result;
    }

    async copy(source: string, destination: string): Promise<any> {
        return await this.redirectMethod('copy', true, {
            source,
            destination,
        });
    }

    async create(filename: string): Promise<any> {
        return await this.redirectMethod('create', true, {
            filename,
        });
    }

    async dir(path: string): Promise<any> {
        return await this.redirectMethod('dir', true, {
            path,
        });
    }

    async ensure(path: string): Promise<any> {
        return await this.redirectMethod('ensure', true, {
            path,
        });
    }

    async exists(filename: string): Promise<any> {
        return await this.redirectMethod('exists', false, {
            filename,
        });
    }

    async file(filename: string): Promise<any> {
        return await this.redirectMethod('file', false, {
            filename,
        });
    }

    async list(path: string, optionString: string): Promise<any> {
        return await this.redirectMethod('list', false, {
            path,
            optionString,
        });
    }

    async move(source: string, destination: string): Promise<any> {
        return await this.redirectMethod('move', true, {
            source,
            destination,
        });
    }

    async moveDir(source: string, destination: string): Promise<any> {
        return await this.redirectMethod('moveDir', false, {
            source,
            destination,
        });
    }

    async read(filename: string): Promise<any> {
        return await this.redirectMethod('read', false, {
            filename,
        });
    }

    async readJSON(filename: string): Promise<any> {
        return await this.redirectMethod('readJSON', false, {
            filename,
        });
    }

    async remove(source: string, resolve: boolean): Promise<any> {
        return await this.redirectMethod('remove', true, {
            source,
            resolve,
        });
    }

    async removeDir(path: string): Promise<any> {
        return await this.redirectMethod('removeDir', true, {
            path,
        });
    }

    async toDataURL(filename: string): Promise<any> {
        return await this.redirectMethod('toDataURL', true, {
            filename,
        });
    }

    async toInternalURL(filename: string): Promise<any> {
        return await this.redirectMethod('toInternalURL', true, {
            filename,
        });
    }

    async toUrl(filename: string): Promise<any> {
        return await this.redirectMethod('toUrl', true, {
            filename,
        });
    }

    async write(filename: string, data: Blob | string | JSON): Promise<any> {
        return await this.redirectMethod('write', true, {
            filename,
            data,
        });
    }
}