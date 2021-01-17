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
        const default_path = '/soundboard/';

        // Determine the path.
        const pathMatch = 'pathMatch' in params ? params.pathMatch : default_path;
        await Module.fileSystem.ensure(pathMatch);
        const elements = await Module.fileSystem.list(pathMatch, 'df');

        // Settings.
        const tiles_per_row = 4;

        build.tile_column = {
            '#type': 'one_column',
            '#content': {},
        };

        for (let i = 0; i < elements.length; i++) {
            let path = elements[i];

            // We need to check whether the element is a board.
            const isFile = path.split('.').length > 1;

            let content;

            // Check if entity is a file.
            if (!isFile) {
                try {
                    content = await Module.fileSystem.readJSON(`${path}board.json`);
                } catch (e) {
                    console.error("Could not read board.", path);
                    continue;
                }
            }
            else if (!path.includes('board.json')) {
                try {
                    content = await Module.fileSystem.readJSON(path);
                }
                catch (e) {
                    console.error("Could not read tile.", path);
                    continue;
                }
            }

            // Continue if no content.
            if (!content || content.constructor.name !== "Object") {
                console.debug("No content for path ->", path);
                continue;
            }

            let tile_type = isFile ? 'tile' : 'board';

            let file_name = path.split('/')[path.split('/').length - 1];
            let path_directory = path.replace(file_name, "");
            file_name = file_name.split('.')[0];

            let window_width = document.querySelector('#advanced-soundboard').offsetWidth - 20;
            let tile_width = window_width / tiles_per_row;

            let content_images = Module.fallback(content, 'image_upload', []);
            let images = [];
            for (let j = 0; j < content_images.length; j++) {
                let image_name = content_images[j];
                let image;
                let url;
                let error = false;
                try {
                    url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${image_name}`);
                    let response = await fetch(url);
                    let data = await response.blob();

                    data.name = image_name;
                    data.lastModifiedDate = new Date();
                    image = data;
                } catch (e) {
                    console.log("Could not read image.", image_name);
                    error = true;
                }

                if (error) {
                    try {
                        url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${image_name}`);
                    } catch (e) {
                        console.log("Could not read image.", image_name);
                        continue;
                    }
                }

                images.push(image);
            }

            let content_sounds = Module.fallback(content, 'sound_upload', []);
            let sounds = [];
            for (let j = 0; j < content_sounds.length; j++) {
                let sound_name = content_sounds[j];
                let sound;
                let url;
                let error = false;

                if (
                    sound_name instanceof Blob ||
                    sound_name instanceof File
                ) {
                    sounds.push(sound_name);
                    continue;
                }

                try {
                    url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${sound_name}`);
                    let response = await fetch(url);
                    let data = await response.blob();

                    data.name = sound_name;
                    data.lastModifiedDate = new Date();
                    sound = data;
                } catch (e) {
                    console.log("Could not read sound.", sound_name);
                    error = true;
                }

                if (error) {
                    try {
                        url = await Module.fileSystem.toDataURL(`${path_directory}files/${file_name}_${sound_name}`);
                    } catch (e) {
                        console.log("Could not read sound.", sound_name);
                        continue;
                    }
                }

                sounds.push(sound);
            }

            build.tile_column['#content'][path] = {
                '#type': isFile ? 'tile' : 'board',
                '#title': Module.fallback(content, 'tile_title', ''),
                '#backgroundColor': Module.fallback(content, 'tile_color', '#000000'),
                '#textColor': Module.fallback(content, 'text_color', '#000000'),
                '#classes': Module.fallback(content, 'tile_style', 'default'),
                '#images': images,
                '#sounds': sounds,
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

        build.navigation = {
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

        if (params.pathMatch !== default_path) {
            let past_board = params.pathMatch;
            past_board = past_board.split('/');
            past_board.pop();
            past_board.pop();
            past_board = past_board.join('/');
            past_board += '/';
            console.log("PAST BOARD", past_board);

            build.navigation["#content"]['past_board'] = {
                '#type': 'button',
                '#fab': true,
                '#outlined': true,
                '#color': 'orange',
                '#centerIcon': 'arrow_back',
                '#to': {
                    name: 'core.board',
                    params: {
                        pathMatch: past_board,
                    }
                }
            };
        }

        return build;
    },
};

(() => {
    return Board;
})();