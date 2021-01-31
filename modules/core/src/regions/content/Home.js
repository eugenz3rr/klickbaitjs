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
                '#type': 'v-app-bar'
            };

            return build;
        },
    };
})();