Module => {
    const component = {
        name: 'Tile',
        template:
            '<v-card ' +
            '       v-ripple' +
            '       v-touch:tap="click"' +
            '       v-touch:longtap="edit"' +
            '       :width="width" ' +
            '       :height="height" ' +
            '       :color="backgroundColor" ' +
            '       class="tile" ' +
            '       :class="classes">' +
            '   <v-card-text :style="{ color: textColor }">{{ title }}</v-card-text>' +
            '   <v-img v-if="src !== undefined" :src="src" width="150px" height="150px" :color="backgroundColor">' +
            '   </v-img>' +
            '</v-card>',
        data() {
            return {
                title: '',
                backgroundColor: '',
                textColor: '#000000',
                changed: 0,
                src: undefined,
                audio: undefined,
                classes: ['default'],
                images: [],
                sounds: [],
                update: [],
                height: '150px',
                width: '150px',
                path: "",
                to: {}
            };
        },
        watch: {
            images: {
                handler: function (value) {
                    if (value.constructor.name === "String") {
                        this.src = value;
                        return;
                    }

                    if (!value || value.length === 0 || !value[0]) {
                        this.src = '';
                        return;
                    }

                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        this.src = fileReader.result;
                    };
                    fileReader.readAsDataURL(value[0]);
                },
                deep: true
            },
            sounds: {
                handler: function (value) {
                    if (value.constructor.name === "String") {
                        this.audio = new Audio(value);
                        return;
                    }

                    if (value.length === 0) {
                        this.audio = undefined;
                        return;
                    }

                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        this.audio = new Audio(fileReader.result);
                    };
                    fileReader.readAsDataURL(value[0]);
                },
                deep: true
            }
        },
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,

            /**
             * @description Form id to identify events.
             */
            region: Object,
        },
        events: {
            input_change: function (event, value) {
                const params = this.$route.params;

                if (!(value in params)) {
                    return;
                }

                const update_length = Object.keys(this.update).length;
                let found = undefined;
                for (let i = 0; i < update_length; i++) {
                    const update = this.update[i];

                    if (update.value === value) {
                        found = update;
                        break;
                    }
                }

                if (found === undefined) {
                    return;
                }

                this[found.key] = params[value];
            }
        },
        mounted: async function () {

            // Iterate trough all items and set them.
            const keys = Object.keys(this.renderElement);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                let value = this.renderElement[key];
                const dataKey = key.replace('#', '');

                // Check if data is mappable.
                if (!this.hasOwnProperty(dataKey)) {
                    continue;
                }

                // Check if element is empty.
                if (!value || value === false || value === undefined || value === null) {
                    continue;
                }

                if (value.constructor.name === 'String' && value.includes('~')) {
                    this.update.push({
                        key: key.replace('#', ''),
                        value: value.replace('~', '')
                    });

                    //continue;
                    if (key.replace('#', '') in this && value.replace('~', '') in this.$route.params) {
                        value = this.$route.params[value.replace('~', '')];
                    }
                    else {
                        continue;
                    }
                }

                // Set the new value.
                this[key.replace('#', '')] = value;
            }
        },
        methods: {
            click: function () {
                if (
                    !this.audio ||
                    this.audio.constructor.name !== 'HTMLAudioElement'
                ) {
                    return;
                }

                this.audio.pause();
                this.audio.currentTime = 0;
                this.audio.play();
            },
            edit: function () {
                this.$router.push(this.to);
            }
        },
        destroyed: function () {
            if (
                !this.audio ||
                this.audio.constructor.name !== 'HTMLAudioElement'
            ) {
                return;
            }

            this.audio.pause();
        }
    };

    Module.appendStyle(`src/elements/css/Tile.css`, component.name);

    return component;
};