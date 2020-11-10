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
            '   <div class="my-4">' +
            '    <v-slider' +
            '        v-if="Playlist"' +
            '        class="my-10 audio-editor-item"' +
            '        color="accent"' +
            '        thumb-color="accent"' +
            '        track-fill-color="accent"' +
            '        append-icon="volume_up"' +
            '        prepend-icon="volume_down"' +
            '        v-model="MasterVolume"' +
            '        :min="1"' +
            '        :max="100"' +
            '        label="Volume"' +
            '        hint="Change the volume of the played tile."' +
            '        persistent-hint' +
            '    />' +
            '   </div>' +
            '' +
            '    <div id="playlist" class="mt-4 mb-10"></div>' +
            '' +
            '   <div class="mt-3 mb-7">' +
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
            '   </div>' +
            '' +
            '    <v-btn v-if="Playlist && cursor === \'select\'" block depressed @click="trim" color="secondary">Trim</v-btn>' +
            '' +
            '    <v-toolbar v-if="cursor === \'shift\'" class="audio-editor-item mt-6" color="secondary">' +
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
            '   <v-btn class="mb-3" block color="success" :loading="loading" outlined @click="save">' +
            '       <v-icon left>save</v-icon>' +
            '       Save' +
            '   </v-btn>' +
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
                EventEmitter: null,
                files: [],
                loading: false,
                to: undefined,
            };
        },
        watch: {
            MasterVolume: function (val) {
                if (val && this.Playlist) {
                    this.EventEmitter.emit("mastervolumechange", val);
                }
            },
            CursorPosition: function (val) {
                if (val && this.Playlist) {
                    this.EventEmitter.emit("setcursorposition", val);
                }
            },
            SelectionSegment: function (val) {
                if (val && this.Playlist) {
                    this.EventEmitter.emit("select", val[0], val[1]);
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
                zoomLevels: [
                    500,
                    1000,
                    3000,
                    5000
                ]
            });

            window.Playlist = this.Playlist;

            await this.Playlist.load([]);

            this.Playlist.initExporter();
            this.EventEmitter = this.Playlist.getEventEmitter();
            this.CursorPositionMax = this.Playlist.duration;
            this.SelectionSegmentMax = this.Playlist.duration;

            this.EventEmitter.on("finished", () => {
                this.state = "pause";
            });

            this.EventEmitter.on("audiosourcesrendered", () => {
                this.CursorPositionMax = this.Playlist.duration;
                this.SelectionSegmentMax = this.Playlist.duration;
            });

            this.EventEmitter.on("finished", () => {
                this.CursorPositionMax = this.Playlist.duration;
                this.SelectionSegmentMax = this.Playlist.duration;
            });

            this.EventEmitter.on("shift", (time, track) => {
                this.trimmed[0] += time;
                this.trimmed[1] += time;

                this.CursorPositionMax = this.Playlist.duration;
                this.SelectionSegmentMax = this.Playlist.duration;
            });

            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                this.EventEmitter.emit("newtrack", file);
            }

            this.EventEmitter.on("audiosourcesloaded", () => {
            });

            this.EventEmitter.on("audiosourcesrendered", () => {

                // We need to set the color manually for the audio viewer.
                /** @type {NodeListOf<HTMLElement>} */
                const canvases = this.document.querySelectorAll('.playlist .channel canvas');

                /*for (let i = 0; i < canvases.length; i++) {
                    const canvas = canvases[i];
                    canvas.style.backgroundColor = this.settings.theme().accent;
                }*/
            });

            this.EventEmitter.on("audiorenderingfinished", (type, blob) => {
                this.value = [
                    new File(
                        [blob],
                        `edited_sound.${Date.now()}`, {
                            type: `audio/${type}`
                        })
                ];
                this.$route.params[this.element] = this.value;
                this.submit();
            });

        },
        methods: {
            submit: function () {
                if (!('params' in this.to)) {
                    this.to.params = {};
                }

                this.to.params = Object.assign(
                    this.to.params,
                    this.$route.params
                );
                this.$router.push(this.to)
            },
            play: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit("play");
                this.state = "play";
            },
            pause: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit("pause");
                this.state = "pause";
            },
            stop: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit("stop");
                this.state = "pause";
            },
            save: function () {
                if (!this.Playlist) {
                    return;
                }
                this.loading = true;
                this.EventEmitter.emit("startaudiorendering", "wav");
            },
            trim: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit("trim");
                this.trimmed = this.SelectionSegment;
            },
            alignLeft: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit(
                    "shift",
                    this.trimmed[0] * -1,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            moveLeft: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit(
                    "shift",
                    this.stepSize * -1,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            moveRight: function () {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit(
                    "shift",
                    this.stepSize,
                    this.Playlist.activeTrack || this.Playlist.tracks[0]
                );
            },
            statechange: function (state) {
                if (!this.Playlist) {
                    return;
                }
                this.EventEmitter.emit("statechange", state);
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