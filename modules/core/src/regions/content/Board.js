const Board = {

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
        const params = VueRoute.params;
        const default_path = '/soundboard';

        // Determine the path.
        const pathMatch = 'pathMatch' in params ? params.pathMatch : default_path;
        const elements = await Module.fileSystem.list(pathMatch, 'df');

        // Settings.
        const tiles_per_row = 4;

        build.tile_column = {
            '#type': 'one_column',
            '#content': {},
        };

        for (let i = 0; i < elements.length; i++) {
            const path = elements[i];

            // We need to check whether the element is a board.
            const isFile = path.split('.').length > 1;

            let content;

            // Check if entity is a file.
            if (!isFile) {
                content = await Module.fileSystem.readJSON(`${path}board.json`);
            }
            else if (!path.includes('board.json')) {
                content = await Module.fileSystem.readJSON(path);
            }

            // Continue if no content.
            if (!content || content.constructor.name !== "Object") {
                console.debug("No content for path ->", path);
                continue;
            }

            const tile_type = Module.fallback(content, 'tile_type', 'tile');

            let file_name = path.split('/')[path.split('/').length - 1];
            const path_directory = path.replace(file_name, "");
            file_name = file_name.split('.')[0];

            const window_width = document.querySelector('#advanced-soundboard').offsetWidth - 20;
            const tile_width = window_width / tiles_per_row;

            build.tile_column['#content'][path] = {
                '#type': isFile ? 'tile' : 'board',
                '#title': Module.fallback(content, 'tile_title', ''),
                '#backgroundColor': Module.fallback(content, 'tile_color', '#000000'),
                '#textColor': Module.fallback(content, 'text_color', '#000000'),
                '#classes': Module.fallback(content, 'tile_style', 'default'),
                '#images': [],
                '#path': path,
                '#width': `${tile_width}px`,
                '#height': `${tile_width}px`,
                '#to': {
                    name: `edit.${tile_type}`,
                    params: {
                        ...content,
                    }
                },
            };

            // Merging does not work directly somehow.
            build.tile_column['#content'][path]['#to']['params']['path'] = path;
            build.tile_column['#content'][path]['#to']['params']['pathMatch'] = pathMatch;
        }

        for (let i = 0; i < tiles_per_row; i++) {
            const window_width = document.querySelector('#advanced-soundboard').offsetWidth - 20;
            const tile_width = window_width / tiles_per_row;

            build.tile_column['#content'][`space_holder_${i}`] = {
                '#type': 'advanced-space-holder',
                '#width': `${tile_width}px`,
                '#height': `${tile_width}px`,
            };
        }

        build.addTileButton = {
            '#type': 'add-tile-button',
            '#content': {
                add_tile: {
                    '#type': 'redirect_button',
                    '#fab': true,
                    '#outlined': true,
                    '#color': 'green',
                    '#centerIcon': 'add',
                    '#to': {
                        name: 'tile.templates',
                        params: {
                            pathMatch,
                        }
                    }
                }
            }
        };

        return build;
    },
};

(() => {
    return Board;
})();