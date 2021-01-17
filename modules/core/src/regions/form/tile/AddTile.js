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

    "build": (Module, data) => {
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

        build.help_tile_style = {
            '#type': 'information',
            '#title': 'A style for my tile?',
            '#description': 'A style defines how your tile will look. The default one displays no image. The image background only shows the image.',
            '#value': 'What is a tile style?'
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
                    '#title': 'Sound',
                    '#content': {
                        help_sound_upload: {
                            '#type': 'information',
                            '#title': 'Why do I need to append a sound?',
                            '#description': 'Well this is a soundboard overall. Why not wtf?! \nLoad a sound and crop it! (Only if it\'s not perfect)',
                            '#value': 'Why sound?'
                        },
                        sound_upload: {
                            '#type': 'upload',
                            '#title': 'Sound File',
                            '#mime': 'audio/*',
                            '#description': 'Select your sound file.',
                            '#value': Module.fallback(data, 'sound_upload', []),
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
                        help_image_upload: {
                            '#type': 'information',
                            '#title': 'Why do I need to append an image?',
                            '#description': 'Well some people just want to show how cool their board looks. \n You can go with the flow or live like a caveman. What do you choose? \nLoad a sound and crop it! (Only if it\'s not perfect)',
                            '#value': 'An image?'
                        },
                        image_upload: {
                            '#type': 'upload',
                            '#title': 'Image File',
                            '#description': 'Select your sound file.',
                            '#persistentHint': true,
                            '#mime': 'image/*',
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
        const path = values.pathMatch;
        const file_name = Date.now();
        const path_directory = path.replace(file_name, "");

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

        /** @var images {Array<File>} */
        const sounds = Module.fallback(values, 'sound_upload', []);
        values.sound_upload = [];

        for (let i = 0; i < sounds.length; i++) {

            /** @var image {File} */
            let sound = sounds[i];
            if (!sound) continue;
            await Module.fileSystem.write(`${path_directory}files/${file_name}_${sound.name}`, sound);
            values.sound_upload[i] = sound.name;
        }

        const file_path = `${path_directory}/${file_name}.json`.replaceAll('//', '/');
        await Module.fileSystem.write(file_path, JSON.stringify(values));

        Router.push({
            name: "core.board",
            params: {
                pathMatch: values.pathMatch
            },
        });

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();