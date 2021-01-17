const Settings = {

    /**
     * @type {Object}
     * @description This holds information about the form.
     */
    "info": {
        "title": "Tile Settings",
        "description": "Configure your settings here.",
        "id": "tile",
        "tab": "tile.settings",
        "location": "settings",
        "submit_text": "Be gone!",
        "save": false,
    },

    "build": (Module, data) => {
        let build = {};

        build.title = {
            '#type': 'headline',
            '#title': 'Delete Tile?'
        };

        build.tile_to_remove = {
            '#type': 'headline',
            '#title': `Are you sure you want to delete the tile "${data.tile_title}"?`
        };

        build.back = {
            '#type': 'redirect_button',
            '#title': 'NO! WTF!',
            '#outlined': true,
            '#block': true,
            '#classes': ['mb-2'],
            '#color': '#FF0000',
            '#to': {
                name: 'edit.tile',
                params: {
                    ...data
                }
            }
        };

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
        let path = window.router.currentRoute.params.path;
        let file_name = path.split('/')[path.split('/').length - 1];
        const path_directory = path.replace(file_name, "");
        file_name = file_name.split('.')[0];

        // Remove old content start.
        let old_content;
        try {
            old_content = await Module.fileSystem.readJSON(path);
        }
        catch (e) {
            console.error("Could not read tile.", path);
        }

        let old_images = Module.fallback(old_content, 'image_upload', []);
        for (let j = 0; j < old_images.length; j++) {
            let image_name = old_images[j];
            try {
                await Module.fileSystem.remove(`${path_directory}files/${file_name}_${image_name}`);
            } catch (e) {
                console.warn("Could not delete image.", `${path_directory}files/${file_name}_${image_name}`, e);
            }
        }

        let old_sounds = Module.fallback(old_content, 'sound_upload', []);
        for (let j = 0; j < old_sounds.length; j++) {
            let sound_name = old_sounds[j];
            try {
                await Module.fileSystem.remove(`${path_directory}files/${file_name}_${sound_name}`);
            } catch (e) {
                console.warn("Could not delete sound.", `${path_directory}files/${file_name}_${sound_name}`, e);
            }
        }
        // Remove old content end.

        try {
            await Module.fileSystem.remove(values.path);
        } catch (e) {
            console.warn("Could not delete sound.", values.path, e);
        }

        Router.push({
            name: "core.board",
            params: {
                pathMatch: values.pathMatch
            },
        });

        // The submitted values of the user.
        return values;
    },
};

(() => {
    return Settings;
})();