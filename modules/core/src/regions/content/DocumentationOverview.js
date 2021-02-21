(() => {
    return {

        /**
         * @type {Object}
         * @description This holds information about the form.
         */
        info: {
            title: "",
            description: "",
        },

        /**
         *
         * @param Module
         * @param VueRoute
         * @returns {{}}
         */
        build: async (Module, VueRoute) => {
            let build = {};

            build.navigation = {
                '#type': 'v-app-bar',
                '#flat': true,
                '#color': '#2d3436',
                '#content': {
                    home: {
                        '#type': 'button',
                        '#title': 'Home',
                        '#text': true,
                        '#color': '#FFF',
                        '#to': {
                            name: 'core.home'
                        }
                    },
                    documentation: {
                        '#type': 'button',
                        '#title': 'Documentation',
                        '#text': true,
                        '#color': '#FFF',
                        '#to': {
                            name: 'core.home'
                        }
                    },
                    about: {
                        '#type': 'button',
                        '#title': 'About',
                        '#text': true,
                        '#color': '#FFF',
                        '#to': {
                            name: 'core.home'
                        }
                    },
                }
            };

            build.welcome = {
                '#type': 'headline',
                '#title': '<h2>Welcome on klickbait!</h2>',
                '#description': 'This page should be a little example what klickbait can actually do.',
                '#classes': ['mt-3', 'mb-2', 'justify-center', 'text-center', 'h2'],
            };

            build.overview = {
                '#type': 'v-list',
                '#content': {
                    group: {
                        '#type': 'v-list-group',
                    }
                }
            }

            return build;
        },
    };
})();