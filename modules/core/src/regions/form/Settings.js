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
        "location": "settings"
    },

    "build": (Module, values, data) => {
        let build = {};

        console.log(data)

        build.two_column = {
            '#type': 'two_column',
            '#first': {
                tile: {
                    '#type': 'tile',
                    '#title': '~tile_title',
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

        build.alter_text = {
            '#type': 'redirect_button',
            '#title': 'Customize Text',
            '#appendIcon': 'text_format',
            '#to': {
                name: 'add.tile.text'
            },
            '#color': 'info',
            '#outlined': true
        };

        // build.alter_image = {
        //     '#type': 'redirect_button',
        //     '#title': 'Tile',
        //     '#to': {
        //         name: 'core.templates'
        //     },
        //     '#color': 'info'
        // };

        build.advanced_settings = {
            '#type': 'accordion',
            '#panels': [
                {
                    '#title': 'Sound',
                    '#content': {
                        'sound_upload': {
                            '#type': 'upload',
                            '#title': 'Sound File',
                            '#description': 'Select your sound file.',
                            '#value': undefined,
                        }
                    }
                },
                {
                    '#title': 'Image',
                    '#content': {
                        'my_second_accordion_switch': {
                            '#type': 'switch',
                            '#title': 'Enable this module',
                            '#description': 'This enables the module.',
                            '#value': Module.fallback(values, 'my_second_accordion_switch', false),
                        },
                        'my_second_accordion_description': {
                            '#type': 'textarea',
                            '#title': 'Default Tile description',
                            '#description': 'This description will be used for describing ur tile.',
                            '#value': Module.fallback(values, 'my_second_accordion_description', 'NICHT SO TIEF RÜDIGER!'),
                            '#autoGrow': true,
                            '#clearable': true,
                        }
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

    submit: (Module, values) => {

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();