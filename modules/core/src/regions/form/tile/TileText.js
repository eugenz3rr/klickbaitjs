const Form = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "TEXT SETTINGS",
        "description": "All you want in your text shall be here.",
        "id": "tile_text",
        "location": "settings",
        "submit": false,
    },

    "build": (Module, values, data) => {
        let build = {};

        build.text = {
            '#type': 'paragraph',
            '#value': Module.fallback(data, 'tile_title', 'Lorem ipsum dolor sit amet'),
            '#textColor': '~text_color',
        };

        build.text_color = {
            '#type': 'colorpicker',
            '#title': 'Color',
            '#classCSS': ['mt-3', 'mb-3'],
            '#hideModeSwitch': true,
            '#description': 'This color will be the default color of the tile.',
            '#value': Module.fallback(data, 'text_color', '#32a852'),
        }

        build.alter_text = {
            '#type': 'redirect_button',
            '#title': 'Confirm',
            '#prependIcon': 'exit_to_app',
            '#to': {
                name: 'add.tile'
            },
            '#color': 'green',
            '#outlined': true,
            '#block': true
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
    return Form;
})();