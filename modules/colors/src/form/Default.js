(() => {
    return {

        /**
         * @type {Object}
         * @description This holds information about the form.
         */
        info: {
            title: "Colors",
            description: ""
        },

        /**
         *
         * @param Module
         * @param VueRoute
         * @returns {{}}
         */
        build: async (Module, VueRoute) => {
            let build = {};
            const path = '/colors/';

            // Determine the path.
            await Module.fileSystem.ensure(path);

            // Ensure the settings exists.
            const configuration_path = `${path}configuration.json`;
            let configuration;

            try {
                configuration = await Module.fileSystem.readJSON(configuration_path);
            }
            catch (e) {
                configuration = {
                    'background-primary': '#2c3e50',
                    'background-secondary': '#34495e',
                    'background-tertiary': '#7f8c8d',

                    'icon': '#ecf0f1',
                    'string': '#ecf0f1',
                    'accent': '#ecf0f1',

                    'status-neutral': '#2980b9',
                    'status-info': '#f1c40f',
                    'status-warning': '#e67e22',
                    'status-error': '#d35400',
                };

                await Module.fileSystem.write(configuration_path, JSON.stringify(configuration));
            }

            build.colors_definition = {
                '#title': 'Colors',
                '#type': 'paragraph',
                '#flat': true,
                '#value': 'Here you can change the looks of the app.<br/>Are we going full black?',
            };

            let color_keys = Object.keys(configuration);
            for (let i = 0; i < color_keys.length; i++) {
                let current_key = color_keys[i];
                let current_color = configuration[current_key];

                build[`${current_key}_title`] = {
                    '#type': 'paragraph',
                    '#title': current_key.replace('-', ' ').toUpperCase(),
                    '#classes': ['mb-2'],
                    '#flat': true,
                };

                build[current_key] = {
                    '#type': 'colorpicker',
                    '#mode': 'hex',
                    '#classes': ['mb-2'],
                    '#value': current_color,
                };
            }

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
            try {
                await Module.fileSystem.write('/colors/configuration.json', JSON.stringify(values));
            }
            catch (e) {
                console.error('Could not write color values.', e);
            }
        }
    };
})();