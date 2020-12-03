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
            '#title': 'Tile Templates',
        };

        build.tile_column = {
            '#type': 'one_column',
            '#content': {
                add_tile: {
                    '#type': 'tile_template',
                    '#title': 'Tile',
                    '#to': {
                        name: 'add.tile',
                        params: {
                            tile_title: "",
                            path: data.path,
                        }
                    },
                    '#color': 'info'
                }
            },
        };

        build.board = {
            '#type': 'headline',
            '#title': 'Board Templates',
        };

        build.add_board = {
            '#type': 'tile_template',
            '#title': 'Board',
            '#to': {
                name: 'add.tile'
            },
            '#color': 'info'
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