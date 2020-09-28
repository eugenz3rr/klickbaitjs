const fs = require("fs-extra");
const write = require("write");
const watch = require('watch');
const glob = require("glob");
const path = require("path");
const {stringify} = require("javascript-stringify");
let dirs = [];

const compile_installer = async () => {

    let code = "";
    code += `import Console from "./Console";\n`;
    code += `import FileSystem from "./FileSystem";\n\n`;
    code += `export default class Installer extends Console {\n\n`;
    code += `     constructor(fileSystem: FileSystem) {\n        super(fileSystem);\n     }\n`;
    code += `     public async install(): Promise<any> {\n`;

    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        if (dir.split('.').length <= 1) {

            continue;
        }
        const file = dir;

        const file_name = file.replace(__dirname.split("\\").join('/'), '');

        const file_contents = await fs.readFile(file, 'utf8');

        code += `\n         await this.fileSystem.write('${file_name}', ${stringify(file_contents)})`;
    }

    code += '\n     }\n}';
    await write(`${__dirname}/common/src/Installer.ts`, code);
};

const getDirectories = (src, callback) => {
    glob(src + '/**/*', callback);
};

getDirectories(`${__dirname}/modules`, (err, res) => {
    if (err) {
        return;
    } else {
        dirs = res;
    }
    compile_installer().then(console.log).catch(console.log)
});

watch.createMonitor(`${__dirname}/modules`, function (monitor) {

    monitor.on("created", function (f, stat) {
        compile_installer().then(console.log).catch(console.log)
    })
    monitor.on("changed", function (f, curr, prev) {
        compile_installer().then(console.log).catch(console.log)
    })
    monitor.on("removed", function (f, stat) {
        compile_installer().then(console.log).catch(console.log)
    })
   // monitor.stop(); // Stop watching
});
