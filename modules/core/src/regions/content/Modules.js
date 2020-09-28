const Modules = {

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

        build.headline = {
            '#type': 'headline',
            '#title': 'Modules',
            '#description': 'Shows the current installed modules.',
        };

        const modules = Module.moduleManager.modules;

        for (let i = 0; i < modules.length; i++) {
            const module = modules[i];

            build[`${module.id}-module-list`] = {
                '#type': 'paragraph',
                '#title': module.info.name,
                '#description': module.info.description,
                '#value': `Version: ${module.info.version}`
            };
        }


        return build;
    },
};

(() => {
    return Modules;
})();