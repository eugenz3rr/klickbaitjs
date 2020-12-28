const Settings = {
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

        const tiles_per_row = 4;
        const window_width = document.querySelector('#advanced-soundboard').offsetWidth - 20;
        const tile_width = window_width / tiles_per_row;

        build.title = {
            '#type': 'headline',
            '#title': 'Tile Templates',
            '#description': 'Here you can use contributed or custom tiles created by you.',
        };

        build.help_title = {
            '#type': 'information',
            '#title': 'Tiles? Tiles!',
            '#description': 'Tiles are buttons. Tiles play music when pressed and are fully customizable. Change colour, set an image, set the color of the text and so on.',
            '#value': 'What are tiles?!'
        };

        build.tile_column = {
            '#type': 'one_column',
            '#content': {
                create_tile: {
                    '#type': 'tile_template',
                    '#title': 'Create a tile',
                    '#backgroundColor': '#32a852',
                    '#width': `${tile_width}px`,
                    '#height': `${tile_width}px`,
                    '#to': {
                        name: 'add.tile',
                        params: {
                            tile_title: "Create a tile",
                            tile_type: "tile",
                            tile_color: '#32a852',
                            ...data,
                        }
                    }
                }
            },
        };

        for (let i = 0; i < tiles_per_row; i++) {
            build.tile_column['#content'][`space_holder_${i}`] = {
                '#type': 'advanced-space-holder',
                '#width': `${tile_width}px`,
                '#height': `${tile_width}px`,
            };
        }

        build.board = {
            '#type': 'headline',
            '#title': 'Board Templates',
            '#description': 'Here you can use contributed or custom boards created by you.',
        };

        build.help_board = {
            '#type': 'information',
            '#title': 'Boards? Boards!',
            '#description':
                'Boards are buttons like tiles except for one exception. ' +
                'They don\'t play music. They\'re like folders which contain even more buttons! ' +
                'You can sort your tiles by theme, character, or some schema you invent.',
            '#value': 'What are Boards?!'
        };

        build.board_column = {
            '#type': 'one_column',
            '#content': {
                create_board: {
                    '#type': 'tile_template',
                    '#title': 'Create a board',
                    '#width': `${tile_width}px`,
                    '#height': `${tile_width}px`,
                    '#backgroundColor': '#32a852',
                    '#to': {
                        name: 'add.board',
                        params: {
                            tile_title: "Create a board",
                            tile_type: "board",
                            tile_color: '#32a852',
                            ...data,
                        }
                    }
                }
            }
        }

        for (let i = 0; i < tiles_per_row; i++) {
            build.board_column['#content'][`space_holder_${i}`] = {
                '#type': 'advanced-space-holder',
                '#width': `${tile_width}px`,
                '#height': `${tile_width}px`,
            };
        }

        build.navigation = {
            '#type': 'floating_buttons',
            '#content': {
                back: {
                    '#type': 'redirect_button',
                    '#fab': true,
                    '#outlined': true,
                    '#color': '#ff7600',
                    '#centerIcon': 'return',
                    '#to': {
                        name: 'core.board',
                        params: {
                            pathMatch: values.pathMatch,
                        }
                    }
                }
            }
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

    submit: (Module, values) => {

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();