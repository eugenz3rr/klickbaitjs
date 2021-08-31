const fs = require("fs-extra");

(async () => {
    let file_systems_list;
    let file_systems = {};

    await fs.ensureDir('./src/FileSystems')
    file_systems_list = await fs.readdir('./src/FileSystems');
    await fs.createFileSync('./src/FileSystems/FileSystems.json');

    for (let i = 0; i < file_systems_list.length; i++) {
        let file_system = file_systems_list[i];

        if (file_system === 'FileSystems.json') {
            continue;
        }

        file_systems[file_system.replace('.js', '')] = file_system;
    }

    await fs.writeJsonSync('./src/FileSystems/FileSystems.json', file_systems);
})()