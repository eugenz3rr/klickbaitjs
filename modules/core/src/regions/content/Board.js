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
     * @param VueRouter
     * @returns {{}}
     */
     build: async (Module, VueRoute) => {
        let build = {};
        const params = VueRoute.params;

        const prefix = '/soundboard';

        // Determine the path.
        const path = 'board' in params ? params.build : '';
        const elements = await Module.fileSystem.list(`${prefix}/${path}`);

        build.tile_column = {
            '#type': 'one_column',
            '#content': {},
        };

        for (let i = 0; i < elements.length; i++) {
            const path = elements[i];
            const content = await Module.fileSystem.readJSON(path);

            build.tile_column['#content'][path] = {
                '#type': 'tile',
                '#title': Module.fallback(content, 'tile_title', ''),
                '#backgroundColor': Module.fallback(content, 'tile_color', '#000000')
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
                            path,
                        }
                    }
                }
            }
        }

        return build;
    },
};

(() => {
    return Board;
})();