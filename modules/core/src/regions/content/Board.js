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
    "build": (Module) => {
        let build = {};

        build.headline = {
            '#type': 'headline',
            '#title': 'Tiles',
            '#description': 'Tiles are usually located here.',
        };

        return build;
    },
};

(() => {
    return Board;
})();