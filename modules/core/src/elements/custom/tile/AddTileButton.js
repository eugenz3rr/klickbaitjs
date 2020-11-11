Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    /** TODO: convert this into a container. */
    const component = {
        name: 'SpeedDial',
        components,
        template:
            '<v-speed-dial' +
            '      v-model="fab"' +
            '      fixed' +
            '      bottom' +
            '      right' +
            '      direction="top"' +
            '    >' +
            '      <template v-slot:activator>' +
            '        <v-btn' +
            '          color="blue darken-2"' +
            '          outlined' +
            '          dark' +
            '          fab' +
            '        >' +
            '          <v-icon v-if="fab">' +
            '            close' +
            '          </v-icon>' +
            '          <v-icon v-else>' +
            '            more_vert' +
            '          </v-icon>' +
            '        </v-btn>' +
            '      </template>' +
            '      <component v-for="(renderElement, element) in content"' +
            '              :is="`as-${renderElement[\'#type\']}`"' +
            '              :renderElement="renderElement"' +
            '              :element="element"' +
            '              :key="`${element}.${changed}`"' +
            '              :region="region"/>' +
            '</v-speed-dial>',
        data() {
            return {
                title: '',
                backgroundColor: '',
                content: [],
                textColor: '#000000',
                changed: 0,
                src: undefined,
                audio: [],
                to: {},
                classes: ['default'],
                images: [],
                update: [],
                fab: false,
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
        methods: {
            addtile: function () {
                let path;

                if ('path' in this.$route.params) {
                    path = this.$route.params['path'] || '/soundboard';
                }


                if ('path' in this.$route.params) {
                    path = this.$route.params['path'] || '/soundboard';
                }

                this.$router.push({
                    name: "tile.templates",
                })
            }
        }
    };


    return component;
};