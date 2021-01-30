const fs = require("fs-extra");
const write = require("write");
const watch = require('watch');
const glob = require("glob");
const path = require("path");
const {stringify} = require("javascript-stringify");
let dirs = [];

const compile_installer = async () => {

    let code = "";
    code += `import Console from "./../../common/src/Console";\n`;
    code += `import FileSystem from "./../../common/src/FileSystem";\n\n`;
    code += `export default class Installer extends Console {\n\n`;
    code += `     constructor(fileSystem: FileSystem) {\n        super(fileSystem);\n     }\n`;
    code += `     // @ts-ignore\n`;
    code += `     public async install(): Promise<any> {\n`;

    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        if (dir.split('.').length <= 1) {

            continue;
        }
        const file = dir;

        const file_name = file.replaceAll(__dirname.split("\\").join('/'), '');
        let isFile = file_name.replaceAll('..', '').split('.');

        if (isFile.length <= 1) {
            continue;
        }

        const file_contents = await fs.readFile(file, 'utf8');
        code += `\n         await this.fileSystem.write('${file_name}', ${stringify(file_contents)})`;
    }
    code += '\n     }\n}';

    await write(`${__dirname}/Installer.ts`, code);
};

const getDirectories = (src, callback) => {
    glob(src + '/**/*', callback);
};

getDirectories(`${__dirname}/../../modules`, async (err, res) => {
    if (err) {
        return;
    }
    else {
        dirs = res;
    }

    let configuration;

    try {
        configuration = await fs.readJson(`${__dirname}/../configuration.json`);
    } catch (e) {
        configuration = undefined;
    }

    if (!configuration) {
        console.log('NO CONFIGURATION', 'Please copy the example.configuration.json for a minimal run.');
        return;
    }

    if (
        !('installer' in configuration) ||
        !('type' in configuration.installer)
    ) {
        console.log('NO INSTALLER CONFIGURED', 'Please copy the example.configuration.json for a minimal run or set an installer.');
        return;
    }

    if (
        configuration.installer.type !== 'installer'
    ) {
        console.log('Installer disabled.');
        console.log('Removing Installer.ts file.');
        try {
            await fs.remove(`${__dirname}/Installer.ts`);
            console.log('Installer removed. Bye');

        } catch (e) {}
        console.log('Installer uninstalled if installed.');

        return;
    }

    await compile_installer().then().catch(console.log);
    watch.createMonitor(`${__dirname}/../../modules`, function (monitor) {
        monitor.on("created", function (f, stat) {
            compile_installer().then(console.log).catch(console.log);
        });
        monitor.on("changed", function (f, curr, prev) {
            compile_installer().then(console.log).catch(console.log);
        });
        monitor.on("removed", function (f, stat) {
            compile_installer().then(console.log).catch(console.log);
        });
        // monitor.stop(); // Stop watching
    });
});