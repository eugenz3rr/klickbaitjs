const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Board Settings",
        "description": "Configure your settings here.",
        "id": "tile.settings",
        "tab": "misc",
        "location": "settings",
        "save": false,
    },

    "build": async (Module, data) => {
        let build = {};

        let path = window.router.currentRoute.params.path;
        let file_name = path.split('/')[path.split('/').length - 1];
        const path_directory = path.replace(file_name, "");
        file_name = file_name.split('.')[0];
        let content_images = Module.fallback(data, 'image_upload', []);
        let images = [];

        for (let j = 0; j < content_images.length; j++) {
            let image_name = content_images[j];
            let image;
            let url;
            let error = false;

            if (
                image_name instanceof Blob ||
                image_name instanceof File
            ) {
                images.push(image_name);
                continue;
            }

            try {
                url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${image_name}`);
                let response = await fetch(url);
                let data = await response.blob();

                data.name = image_name;
                data.lastModifiedDate = new Date();
                image = data;
            } catch (e) {
                console.log("Could not read image.", image_name);
                error = true;
            }

            if (error) {
                try {
                    url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${image_name}`);
                } catch (e) {
                    console.log("Could not read image.", image_name);
                    continue;
                }
            }

            images.push(image);
        }

        window.router.currentRoute.params.image_upload = images;

        build.two_column = {
            '#type': 'two_column',
            '#first': {
                tile: {
                    '#type': 'tile',
                    '#title': '~tile_title',
                    '#images': '~image_upload',
                    '#sounds': '~sound_upload',
                    '#classes': '~tile_style',
                    '#backgroundColor': '~tile_color',
                    '#textColor': Module.fallback(data, 'text_color', '#000000'),
                },
            },
            '#second': {
                tile_color: {
                    '#type': 'colorpicker',
                    '#title': 'Color',
                    '#hideModeSwitch': true,
                    '#description': 'This color will be the default color of the tile.',
                    '#value': Module.fallback(data, 'tile_color', '#32a852'),
                }
            },
        };

        build.tile_title = {
            '#type': 'textfield',
            '#title': 'Title',
            '#description': 'This is shown in the center of the tile.',
            '#value': Module.fallback(data, 'tile_title', 'My sound!'),
        };

        build.tile_style = {
            '#type': 'dropdown',
            '#title': 'Tile Style',
            '#description': 'The style is used to make your tile look nice.',
            '#value': Module.fallback(data, 'tile_style', ['default']),
            '#items': [
                {
                    'text': 'Default',
                    'value': ['default']
                },
                {
                    'text': 'Image Background',
                    'value': ['image']
                },
                {
                    'text': 'Horizontal 50/50',
                    'value': ['horizontal-50-50']
                },
                {
                    'text': 'Vertical 50/50',
                    'value': ['vertical-50-50']
                },
            ]
        };

        build.alter_text = {
            '#type': 'redirect_button',
            '#title': 'Customize Text',
            '#appendIcon': 'text_format',
            '#to': {
                name: 'add.tile.text'
            },
            '#block': true,
            '#color': 'info',
            '#outlined': true
        };

        build.advanced_settings = {
            '#type': 'accordion',
            '#panels': [
                {
                    '#title': 'Image',
                    '#content': {
                        image_upload: {
                            '#type': 'upload',
                            '#title': 'Image File',
                            '#description': 'Select your sound file.',
                            '#persistentHint': true,
                            '#value': Module.fallback(data, 'image_upload', []),
                        },

                        image_upload_edit: {
                            '#type': 'redirect_button',
                            '#title': 'Edit image file',
                            '#appendIcon': 'crop_original',
                            '#vif': '~image_upload',
                            '#to': {
                                name: 'add.tile.image'
                            },
                            '#show': false,
                            '#block': true,
                            '#color': 'info',
                            '#outlined': true
                        },
                    }
                },
            ],
        };

        build.delete = {
            '#type': 'button',
            '#title': 'Delete',
            '#outlined': true,
            '#block': true,
            '#classes': ['mb-2'],
            '#color': '#FF0000',
            '#to': {
                name: 'delete.board',
                params: {
                    ...data
                }
            }
        };

        build.back = {
            '#type': 'button',
            '#title': 'Cancel',
            '#outlined': true,
            '#block': true,
            '#classes': ['mb-2'],
            '#color': '#ff7f00',
            '#to': {
                name: 'core.board',
                params: {
                    pathMatch: data.pathMatch,
                }
            }
        };

        return build;
    },
    validate: (Module, values) => {

        /**
         * Return key: value for error messages.
         *
         * key => Resembling the field id.
         * value => Resembling the the error message.
         */
        return true;
    },

    submit: async (Module, values, Router) => {
        const path = values.path;
        let file_name = path.split('/')[path.split('/').length - 1];
        const path_directory = path.replace(file_name, "");
        file_name = file_name.split('.')[0];

        // Remove old content start.
        let old_content;
        try {
            old_content = await Module.fileSystem.readJSON(path);
        }
        catch (e) {
            console.error("Could not read tile.", path);
        }

        let old_images = Module.fallback(values, 'image_upload', []);
        for (let j = 0; j < old_images.length; j++) {
            let image_name = old_images[j];
            try {
                await Module.fileSystem.remove(`${path_directory}files/${file_name}_${image_name}`);
            } catch (e) {
                console.warn("Could not delete image.", `${path_directory}files/${file_name}_${image_name}`, e);
            }
        }
        // Remove old content end.
        // @fixme Remove all images before setting new images.

        /** @var images {Array<File>} */
        const images = Module.fallback(values, 'image_upload', []);
        values.image_upload = [];

        for (let i = 0; i < images.length; i++) {

            /** @var image {File} */
            let image = images[i];
            if (!image) continue;
            await Module.fileSystem.write(`${path_directory}files/${file_name}_${image.name}`, image);
            values.image_upload[i] = image.name;
        }

        await Module.fileSystem.write(`${path}board.json`, JSON.stringify(values));

        Router.push({
            name: "core.board",
            params: {
                pathMatch: data.pathMatch,
            },
        });

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();