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

    "build": (Module, values) => {
        let build = {};

        build.tile_name = {
            '#type': 'textfield',
            '#title': 'Default Tile name',
            '#description': 'This name will be used as default for each tile.',
            '#value': Module.fallback(values, 'tile_name', 'Rüdiger'),
        };

        build.tile_description = {
            '#type': 'textarea',
            '#title': 'Default Tile description',
            '#description': 'This description will be used for describing ur tile.',
            '#value': Module.fallback(values, 'tile_description', 'NICHT SO TIEF RÜDIGER!'),
            '#autoGrow': true,
            '#clearable': true,
        };

        build.tile_enabled = {
            '#type': 'switch',
            '#title': 'Enable this module',
            '#description': 'This enables the module.',
            '#value': Module.fallback(values, 'tile_enabled', false),
        };

        build.my_accordion = {
            '#type': 'accordion',
            '#panels': [{
                '#title': 'My first tab lol',
                '#content': {
                    'my_accordion_switch': {
                        '#type': 'switch',
                        '#title': 'Enable this module',
                        '#description': 'This enables the module.',
                        '#value': Module.fallback(values, 'my_accordion_switch', false),
                    },
                    'my_accordion_description': {
                        '#type': 'textarea',
                        '#title': 'Default Tile description',
                        '#description': 'This description will be used for describing ur tile.',
                        '#value': Module.fallback(values, 'my_accordion_description', 'NICHT SO TIEF RÜDIGER!'),
                        '#autoGrow': true,
                        '#clearable': true,
                    }
                }
            }, {
                '#title': 'My second tab lol',
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