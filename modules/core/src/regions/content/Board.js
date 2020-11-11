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
     * @param values
     * @returns {{}}
     */
    build: (Module) => {
        let build = {};


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
                        name: 'tile.templates'
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