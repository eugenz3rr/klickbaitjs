const AddTile = {

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

        build.tile = {
            '#type': 'tile',
            '#title': '#tile_name',
        };

        build.tile_name = {
            '#type': 'textfield',
            '#title': 'Default Tile name',
            '#description': 'This name will be used as default for each tile.',
            '#value': Module.fallback(values, 'tile_name', 'Rüdiger'),
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
    return AddTile;
})();