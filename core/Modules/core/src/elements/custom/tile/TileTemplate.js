Module => {
    const component = {
        name: 'TileTemplate',
        template:
            '<v-card ' +
            '       v-ripple' +
            '       v-touch:tap="click"' +
            '       :width="width" ' +
            '       :height="height" ' +
            '       :color="backgroundColor" ' +
            '       class="tile" ' +
            '       :class="classes"' +
            '       :style="style">' +
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
                audio: [],
                classes: ['default'],
                style: {},
                height: '150px',
                width: '150px',
                images: [],
                update: [],
                to: [],
            };
        },
        watch: {
            images: {
                handler: function (value) {
                    if (value.length === 0) {
                        this.src = '';
                        return;
                    }
                    const fileReader = new FileReader()
                    fileReader.onload = () => {
                        this.src = fileReader.result;
                    }
                    fileReader.readAsDataURL(value[0]);
                },
                deep: true
            },
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

                // Set the new value.
                this[key.replace('#', '')] = value;
            }
        },
        updated: async function () {
            const containers = document.querySelector('.one-column');
            const computedWidth = containers.offsetWidth;

            // todo: Look into this.
            this.size = `${(window.innerWidth - 50)/ 4}px`
            this.style.margin = '2px';

            /*const sortable = new Draggable.Swappable(containers, {
                draggable: '.tile',
                mirror: {
                    appendTo: '.one-column',
                    constrainDimensions: true,
                },
                plugins: [Draggable.Plugins.SwapAnimation],
                sortAnimation: {
                    duration: 200,
                },
            });*/
        },
        methods: {
            click: function () {
                this.$router.push(this.to)
            }
        },
    };

    Module.appendStyle(`src/elements/css/Tile.css`, component.name);

    return component;
};