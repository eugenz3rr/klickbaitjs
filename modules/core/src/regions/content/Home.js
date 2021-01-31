(() => {
    return {

        /**
         * @type {Object}
         * @description This holds information about the form.
         */
        info: {
            title: "Tile Board",
            description: "Configure your settings here.",
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
                '#classes': ['mt-3', 'mb-2'],
            };

            build.two_column = {
                '#type': 'two_column',
                '#first': {
                    different_layouts: {
                        '#type': 'headline',
                        '#title': '<h3>Different Layouts?!</h3>',
                        '#description': 'When using klickbait you can easily build layouts!',
                    },
                    paragraph: {
                        '#type': 'paragraph',
                        '#flat': true,
                        '#value':
                            'Working with Drupal taught me how to work with the backend and how important it is to sort data. <br/>' +
                            'Defining render arrays as Drupal does and structuring it the way that VueJS can understand is f**ing cool!.'
                    }
                },
                '#second': {
                    image: {
                        '#type': 'v-img',
                        '#src': '/images/IMG_20210124_142559.jpg'
                    }
                }
            };

            return build;
        },
    };
})();