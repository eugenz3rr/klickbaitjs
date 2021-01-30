const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Edit Sound",
        "description": "This page is used to contain a big element wich",
        "id": "image_edit",
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
    "build": async (Module, data) => {
        let build = {};

        let return_to = 'path' in data ? 'edit.' : 'add.';
        if ('tile_type' in data) {
            return_to += data.tile_type;
        }
        else {
            return_to += 'tile';
        }

        build.image_upload = {
            '#type': 'image',
            '#files': Module.fallback(data, 'image_upload', []),
            '#to': {
                name: return_to
            },
        };

        build.alter_tile = {
            '#type': 'redirect_button',
            '#title': 'cancel',
            '#appendIcon': 'clear',
            '#to': {
                name: return_to
            },
            '#block': true,
            '#color': 'red',
            '#outlined': true
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