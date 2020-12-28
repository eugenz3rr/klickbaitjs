const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Tile Settings",
        "description": "Configure your settings here.",
        "id": "tile",
        "tab": "tile.settings",
        "location": "settings",
        "save": false,
    },

    "build": (Module, values, data) => {
        let build = {};
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
            '#value': Module.fallback(values, 'tile_style', Module.fallback(data, 'tile_style', ['default'])),
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
        }

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
                    '#title': 'Sound',
                    '#content': {
                        paragraph: {
                            '#type': 'paragraph',
                            '#flat': true,
                            '#title': 'Description',
                            '#description': 'This is very cool',
                            '#value': 'Add your sound file, so we can start to edit :D'
                        },
                        sound_upload: {
                            '#type': 'upload',
                            '#title': 'Sound File',
                            '#description': 'Select your sound file.',
                            '#value': Module.fallback(values, 'sound_upload', Module.fallback(data, 'sound_upload', [])),
                        },
                        sound_upload_edit: {
                            '#type': 'redirect_button',
                            '#title': 'Edit audio file',
                            '#appendIcon': 'audiotrack',
                            '#vif': '~sound_upload',
                            '#to': {
                                name: 'core.sound'
                            },
                            '#block': true,
                            '#color': 'info',
                            '#outlined': true
                        }
                    }
                },
                {
                    '#title': 'Image',
                    '#content': {
                        image_upload: {
                            '#type': 'upload',
                            '#title': 'Image File',
                            '#description': 'Select your sound file.',
                            '#persistentHint': true,
                            '#value': Module.fallback(values, 'image_upload', Module.fallback(data, 'image_upload', [])),
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

        build.back = {
            '#type': 'button',
            '#title': 'Cancel',
            '#outlined': true,
            '#block': true,
            '#classes': ['mb-2'],
            '#color': '#FF0000',
            '#to': {
                name: 'core.board',
                params: {
                    values: Module.fallback(values, 'path', ''),
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

        // @fixme Remove all images before setting new images.

        /** @var images {Array<File>} */
        const images = Module.fallback(values, 'image_upload', false);

        if (images !== false) {
            for (let i = 0; i < images.length; i++) {

                /** @var image {File} */
                const image = images[i];

                if (!image) continue;

                const blob = new Blob([image], {
                    type: image.mimeType
                });

                await Module.fileSystem.write(`${path_directory}files/${file_name}_${image.name}`, blob);
                values.image_upload[i] = image.name;
            }
        }

        await Module.fileSystem.write(path, JSON.stringify(values))

        Router.push({
            name: "core.board",
            params: values,
        });

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();