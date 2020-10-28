Module => {
    const component = {
        name: 'Tile',
        template:
            '<v-card width="150px" height="150px" :color="backgroundColor">' +
            '   <v-card-text :style="{ color: textColor }">{{ title }}</v-card-text>' +
            '</v-card>',
        data() {
            return {
                title: '',
                backgroundColor: '',
                textColor: '#000000',
                changed: 0,
                update: []
            };
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

                if (value.includes('~')) {
                    this.update.push({
                        key: key.replace('#', ''),
                        value: value.replace('~', '')
                    });
                    continue;
                }

                // Set the new value.
                this[key.replace('#', '')] = value;
            }
        },
    };

    return component;
};