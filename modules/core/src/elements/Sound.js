Module => {
    const component = {
        name: 'S-Sound',
        template:
            '<div>' +
            '    <v-toolbar color="secondary">' +
            '      <v-btn v-if="state === \'pause\'" icon @click="play">' +
            '        <v-icon color="accent">play_arrow</v-icon>' +
            '      </v-btn>' +
            '      <v-btn v-if="state === \'play\'" icon @click="pause">' +
            '        <v-icon color="accent">pause</v-icon>' +
            '      </v-btn>' +
            '      <v-btn icon @click="stop">' +
            '        <v-icon color="accent">stop</v-icon>' +
            '      </v-btn>' +
            '' +
            '      <v-spacer></v-spacer>' +
            '' +
            '      <v-btn v-if="cursor !== \'cursor\'" icon @click="statechange(\'cursor\')">' +
            '        <v-icon color="accent">my_location</v-icon>' +
            '      </v-btn>' +
            '      <v-btn v-if="cursor !== \'shift\'" icon @click="statechange(\'shift\')">' +
            '        <v-icon color="accent">open_with</v-icon>' +
            '      </v-btn>' +
            '' +
            '      <v-btn v-if="cursor !== \'select\'" icon @click="statechange(\'select\')">' +
            '        <v-icon color="accent">select_all</v-icon>' +
            '      </v-btn>' +
            '    </v-toolbar>' +
            '' +
            '    <v-slider' +
            '        v-if="Playlist"' +
            '        color="accent"' +
            '        thumb-color="accent"' +
            '        track-fill-color="accent"' +
            '        class="audio-editor-item"' +
            '        append-icon="volume_up"' +
            '        prepend-icon="volume_down"' +
            '        v-model="MasterVolume"' +
            '        :min="1"' +
            '        :max="100"' +
            '        label="Volume"' +
            '        hint="Change the volume of the played tile."' +
            '        persistent-hint' +
            '    />' +
            '' +
            '    <div id="playlist"></div>' +
            '' +
            '    <v-slider' +
            '        v-if="Playlist && cursor === \'cursor\'"' +
            '        class="audio-editor-item extra"' +
            '        v-model="CursorPosition"' +
            '        color="accent"' +
            '        thumb-color="accent"' +
            '        track-fill-color="accent"' +
            '        :min="0"' +
            '        :max="this.CursorPositionMax"' +
            '        :step="0.1"' +
            '        label="Cursor"' +
            '        hint="Set the cursor at the position you want to start playing from."' +
            '        thumb-label="always"' +
            '        persistent-hint' +
            '    />' +
            '' +
            '    <v-range-slider' +
            '        v-if="Playlist && cursor === \'select\'"' +
            '        class="audio-editor-item extra"' +
            '        v-model="SelectionSegment"' +
            '        color="accent"' +
            '        thumb-color="accent"' +
            '        track-fill-color="accent"' +
            '        :min="0"' +
            '        :max="this.SelectionSegmentMax"' +
            '        :step="stepSize"' +
            '        label="Select"' +
            '        hint="Select the section you want to cut."' +
            '        thumb-label="always"' +
            '        persistent-hint' +
            '    />' +
            '' +
            '    <v-btn v-if="Playlist && cursor === \'select\'" block depressed @click="trim" color="secondary">Trim</v-btn>' +
            '' +
            '    <v-toolbar v-if="cursor === \'shift\'" class="audio-editor-item" color="secondary">' +
            '      <v-btn icon @click="alignLeft">' +
            '        <v-icon color="accent">format_align_left</v-icon>' +
            '      </v-btn>' +
            '' +
            '      <v-spacer></v-spacer>' +
            '' +
            '      <v-btn icon @click="moveLeft">' +
            '        <v-icon color="accent">chevron_left</v-icon>' +
            '      </v-btn>' +
            '      <v-btn icon @click="moveRight">' +
            '        <v-icon color="accent">chevron_right</v-icon>' +
            '      </v-btn>' +
            '    </v-toolbar>' +
            '' +
            '    <v-btn v-if="Playlist" class="audio-editor-item" block tile @click="save" color="success">Save</v-btn>' +
            '    <v-btn class="audio-editor-item" block tile color="error" @click="leave">Cancel</v-btn>' +
            '  </div>',
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,
        },
        data() {
            return {
                title: "",
                description: "",

                window,

                /** @type {Document} */
                document,
                state: "pause",
                cursor: "cursor",
                stepSize: 0.1,
                trimmed: [0, 0],
                MasterVolume: 50,
                CursorPosition: 0,
                CursorPositionMax: 0,
                SelectionSegment: [0, 0],
                Playlist: null,
                EventEmiter: null,
                file: [],
            };
        },
        watch: {
            MasterVolume: function (val) {
                if (val && this.Playlist) {
                    this.EventEmiter.emit("mastervolumechange", val);
                }
            },
            CursorPosition: function (val) {
                if (val && this.Playlist) {
                    this.EventEmiter.emit("setcursorposition", val);
                }
            },
            SelectionSegment: function (val) {
                if (val && this.Playlist) {
                    this.EventEmiter.emit("select", val[0], val[1]);
                }
            }
        },
        mounted: async function () {

            // Iterate trough all items and set them.
            const keys = Object.keys(this.renderElement);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = this.renderElement[key];
                const dataKey = key.replace('#', '');

                // Check if data is mappable.
                if (!this.hasOwnProperty(dataKey)) {
                    continue;
                }

                // Check if element is empty.
                if (!value || value === false || value === undefined || value === null) {
                    continue;
                }

                // Set the new value.
                this[key.replace('#', '')] = value;
            }

            // FIXME: This was created by me.
            // ee.on('setcursorposition', function (start) {
            //     _this2.setTimeSelection(start, start);
            //     _this2.drawRequest();
            // });

            this.Playlist = WaveformPlaylist.init({
                samplesPerPixel: 3000,
                mono: true,
                waveHeight: 70,
                container: document.getElementById("playlist"),
                state: "cursor",
                colors: {
                    waveOutlineColor: '#0000FF',
                    timeColor: '#FF00FF',
                    fadeColor: '#000000'
                },
                seekStyle: "line",
                zoomLevels: [500, 1000, 3000, 5000]
            });

            window.Playlist = this.Playlist;

            this.Playlist.load([]).then(() => {
                this.Playlist.initExporter();
                this.EventEmiter = this.Playlist.getEventEmitter();
                this.CursorPositionMax = this.Playlist.duration;
                this.SelectionSegmentMax = this.Playlist.duration;

                this.EventEmiter.on("finished", () => {
                    this.state = "pause";
                });

                this.EventEmiter.on("audiosourcesrendered", () => {
                    this.CursorPositionMax = this.Playlist.duration;
                    this.SelectionSegmentMax = this.Playlist.duration;
                });

                this.EventEmiter.on("finished", () => {
                    this.CursorPositionMax = this.Playlist.duration;
                    this.SelectionSegmentMax = this.Playlist.duration;
                });

                this.EventEmiter.on("shift", (time, track) => {
                    this.trimmed[0] += time;
                    this.trimmed[1] += time;

                    this.CursorPositionMax = this.Playlist.duration;
                    this.SelectionSegmentMax = this.Playlist.duration;
                });

                this.EventEmiter.emit("newtrack", this.file);

                this.EventEmiter.on("audiosourcesloaded", () => {
                });

                this.EventEmiter.on("audiosourcesrendered", () => {

                    // We need to set the color manually for the audio viewer.
                    /** @type {NodeListOf<HTMLElement>} */
                    const canvases = this.document.querySelectorAll('.playlist .channel canvas');

                    for (let i = 0; i < canvases.length; i++) {

                        /** @type {HTMLElement} */
                        const canvas = canvases[i];
                        canvas.style.backgroundColor = this.settings.theme().accent;
                    }
                });

                this.EventEmiter.on("audiorenderingfinished", async (type, blob) => {

                    let result;
                    await new Promise(resolve => {
                        let fileReader = new FileReader();

                        fileReader.onload = dataUrl => {
                            result = dataUrl.target.result;
                            resolve();
                        }

                        fileReader.readAsDataURL(blob);
                    });

                    Module.emit("sound.prepare", result);
                });
            });
        },
        methods: {
            play: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("play");
                this.state = "play";
            },
            pause: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("pause");
                this.state = "pause";
            },
            stop: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("stop");
                this.state = "pause";
            },
            save: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("startaudiorendering", "wav");
            },
            trim: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("trim");
                this.trimmed = this.SelectionSegment;
            },
            alignLeft: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit(
                    "shift",
                    this.trimmed[0] * -1,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            moveLeft: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit(
                    "shift",
                    this.stepSize * -1,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            moveRight: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit(
                    "shift",
                    this.stepSize,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            statechange: function (state) {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmiter.emit("statechange", state);
                this.cursor = state;
                if (this.cursor === "select") {
                    this.SelectionSegment = [0, this.CursorPosition];
                }
            },
            leave: function () {
                Module.emit("tile.editor");
            }
        }
    };

    Module.appendStyle(`src/elements/css/Sound.css`, component.name);

    return component;
};