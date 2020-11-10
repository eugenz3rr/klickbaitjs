const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Tile Templates",
        "description": "Find and choose the tile templates you want to use.",
        "id": "tile_templates",
        "tab": "misc",
        "location": "settings",
        "submit": false
    },

    /**
     *
     * @param {Module} Module
     * @param {Object} values
     * @param {Object} data
     *
     * @returns {{}}
     */
    "build": (Module, values, data) => {
        let build = {};

        build.title = {
            '#type': 'headline',
            '#title': Module.fallback(data, 'tile_title', false) ? `Oi cunt u forgot to save ur tile ...` : 'Hi choose your tile ;)',
            '#description': 'Core templates are templates which are defined by default.',
        };

        build.add_tile = {
            '#type': 'button',
            '#title': 'Tile',
            '#to': {
                name: 'add.tile',
                params: {
                    tile_title: ""
                }
            },
            '#color': 'info'
        };

        build.add_board = {
            '#type': 'button',
            '#title': 'Board',
            '#to': {
                name: 'add.tile'
            },
            '#color': 'info'
        };

        build.hardcore = {
            '#type': 'button',
            '#title': 'Hardcore',
            '#to': {
                name: 'add.tile',
                params: {
                    tile_title: "yo I'm hardcore hehe",
                    tile_color: "#ff0000",
                }
            },
            '#color': 'red'
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