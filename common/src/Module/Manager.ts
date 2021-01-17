import Module from "./Module";
import Console from "../Console";
import FileSystem from "../FileSystem";
import Manager from "../Manager";
import Installer from "../Installer";

interface Installed {
    version: string,
}

export default class ModuleManager extends Console {
    public manager: Manager;
    public modules: Module[] = [];
    public path: string = '';

    constructor(fileSystem: FileSystem, root: string, manager: Manager) {
        super(fileSystem);

        this.manager = manager;
        this.fileSystem = fileSystem;
        this.path = root;
    }

    public async discover(): Promise<any> {

        let cordovaExists = this.cordovaExists();

        if (cordovaExists) {
            let cordova = this.fallback(window, 'cordova', false);
            let installed: Installed;

            if (!await this.fileSystem.exists('installed.json')) {

                // Set the data for the installed file.
                installed = {
                    version: await cordova.getAppVersion.getVersionNumber(),
                };

                // Install all modules.
                await new Installer(this.fileSystem).install();

                // Create the file to write into.
                await this.fileSystem.create('installed.json');

                // Write the generated data into the installer.
                await this.fileSystem.write('installed.json', JSON.stringify(installed));
            }
            else {

                // First fetch installed file.
                installed = await this.fileSystem.readJSON('installed.json');

                // Get the old version which is written in the file.
                let old_version = this.fallback(installed, 'version', '0.0.0');

                // Get the current version from our application.
                let new_version = await cordova.getAppVersion.getVersionNumber();

                // If version is not the same install the new version.
                if (old_version !== new_version) {

                    // Update version.
                    installed.version = new_version;

                    // Install all files in the generated installer.
                    await new Installer(this.fileSystem).install();

                    // Update the installed file after update.
                    await this.fileSystem.write('installed.json', JSON.stringify(installed));
                }
            }
        }
        else {

            // If nothing is present just install.
            await new Installer(this.fileSystem).install();
        }

        // List all directories in the module directory.
        const directories: string[] = await this.fileSystem.list(this.path, 'd');

        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];

            this.log('Directory found!', directory);

            let id: any = directory;
            id = id.split('/');
            id = id[id.length - 2];

            const module = new Module(this, directory, id);
            await module.initialize();
            await this.manager.summary();
        }
    }

    private cordovaExists(): boolean {
        return this.fallback(window, 'cordovaExists', false);
    }
}