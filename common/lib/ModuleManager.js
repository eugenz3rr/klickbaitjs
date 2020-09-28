import Module from "./Module";
import Console from "./Console";
export default class Manager extends Console {
    constructor(fileSystem, root) {
        super(fileSystem);
        this.modules = [];
        this.path = '';
        this.fileSystem = fileSystem;
        this.path = root;
        this.discover().then();
    }
    async discover() {
        this.log(this.path);
        // Create custom module for testing.
        await this.fileSystem.write(`${this.path}mymodule/mymodule.info.json`, JSON.stringify({
            name: 'Klickbait - Mymodule',
            description: 'This module is supposed to be an example module.',
            group: 'klickbait',
            type: 'module',
            version: '1.0.0',
            dependencies: [],
        }));
        // Create custom module for testing.
        await this.fileSystem.write(`${this.path}mymodule/mymodule.components.json`, JSON.stringify({
            "forms": [
                "src/Regions/MyExampleForm.js"
            ]
        }));
        // Create custom module for testing.
        await this.fileSystem.write(`${this.path}mymodule/src/Forms/MyExampleForm.js`, "(Core, Module) => {\n    let form = {\n\n        /**\n         * @type {Object}\n         * @description This holds information about the form.\n         */\n        info: {\n            title: \"Tile Settings\",\n            description: \"Confiure your settings here.\",\n            id: \"example_form\",\n            tab: \"misc\",\n            location: \"settings\",\n        },\n\n        /**\n         * @type {Function}\n         * @description Is executed when the form gets build.\n         */\n        build: null,\n\n        /**\n         * @type {Function}\n         * @description Is executed before submit and before values are saved.\n         */\n        validate: null,\n\n        /**\n         * @type {Function}\n         * @description Is executed when validate is successful saves returned values.\n         */\n        submit: null\n    };\n\n    form.build = values => {\n        let build = {};\n\n        build['tile_name'] = {\n            '#type': 'textfield',\n            '#title': 'Default Tile name',\n            '#description': 'This name will be used as default for each tile.',\n            '#value': Core.fallback(values, 'tile_name', 'Rüdiger'),\n        };\n\n        build['tile_description'] = {\n            '#type': 'textarea',\n            '#title': 'Default Tile description',\n            '#description': 'This description will be used for describing ur tile.',\n            '#value': Core.fallback(values, 'tile_description', 'NICHT SO TIEF RÜDIGER!'),\n            '#autoGrow': true,\n            '#clearable': true,\n        };\n\n        build['tile_enabled'] = {\n            '#type': 'switch',\n            '#title': 'Enable this module',\n            '#description': 'This enables the module.',\n            '#value': Core.fallback(values, 'tile_enabled', false),\n        };\n\n        build['my_accordion'] = {\n            '#type': 'accordion',\n            '#panels': [{\n                '#title': 'My first tab lol',\n                '#content': {\n                    'my_accordion_switch': {\n                        '#type': 'switch',\n                        '#title': 'Enable this module',\n                        '#description': 'This enables the module.',\n                        '#value': Core.fallback(values, 'my_accordion_switch', false),\n                    },\n                    'my_accordion_description': {\n                        '#type': 'textarea',\n                        '#title': 'Default Tile description',\n                        '#description': 'This description will be used for describing ur tile.',\n                        '#value': Core.fallback(values, 'my_accordion_description', 'NICHT SO TIEF RÜDIGER!'),\n                        '#autoGrow': true,\n                        '#clearable': true,\n                    }\n                }\n            }, {\n                '#title': 'My second tab lol',\n                '#content': {\n                    'my_second_accordion_switch': {\n                        '#type': 'switch',\n                        '#title': 'Enable this module',\n                        '#description': 'This enables the module.',\n                        '#value': Core.fallback(values, 'my_second_accordion_switch', false),\n                    },\n                    'my_second_accordion_description': {\n                        '#type': 'textarea',\n                        '#title': 'Default Tile description',\n                        '#description': 'This description will be used for describing ur tile.',\n                        '#value': Core.fallback(values, 'my_second_accordion_description', 'NICHT SO TIEF RÜDIGER!'),\n                        '#autoGrow': true,\n                        '#clearable': true,\n                    }\n                }\n            },\n            ],\n        };\n\n        return build;\n    };\n\n    form.validate = values => {\n\n        /**\n         * Return key: value for error messages.\n         *\n         * key => Resembling the field id.\n         * value => Resembling the the error message.\n         */\n        return true;\n    };\n\n    form.submit = values => {\n        // The submitted values of the user.\n        return values;\n    };\n\n    return form;\n};\n");
        // List all directories in the module directory.
        const directories = await this.fileSystem.list(this.path, 'd');
        for (let i = 0; i < directories.length; i++) {
            const directory = directories[i];
            this.log('Directory found!', directory);
            let id = directory;
            id = id.split('/');
            id = id[id.length - 2];
            new Module(this, directory, id);
        }
    }
    ;
    /**
     *
     * @param module
     */
    moduleReady(module) {
        this.log(this.modules.length);
    }
}
