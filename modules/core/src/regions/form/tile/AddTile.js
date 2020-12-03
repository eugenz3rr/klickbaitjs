const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Tile Settings",
        "description": "Configure your settings here.",
        "id": "example_form",
        "tab": "misc",
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

    submit: async (Module, values) => {
        const prefix = '/soundboard';
        const path = `${prefix}${values.path}`;
        const file_name = Date.now();

        /** @var images {Array<File>} */
        const images = Module.fallback(values, 'image_upload', false);
        if (images !== false) {
            for (let i = 0; i < images; i++) {

                /** @var image {File} */
                const image = images[i];

                const blob = new Blob([image], {
                    type: image.mimeType
                });

                console.log(image.filename)
                await Module.fileSystem.write(`${path}files/${file_name}_${image.filename}`, blob);
            }
        }


        await Module.fileSystem.write(`${path}${file_name}.json`, JSON.stringify(values))

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();