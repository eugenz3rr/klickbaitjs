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
                events: {
                    update: {

                    },
                }
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
                    const event = content => {
                        this[key.replace('#', '')] = content;
                    };
                    this.events.update[`${value.replace('~', '')}.update`] = event;

                    EventBus.$on(`${value.replace('~', '')}.update` , event);
                    continue;
                }

                // Set the new value.
                this[key.replace('#', '')] = value;
            }
        },
        beforeDestroy: function () {
            const keys = Object.keys(this.events.update);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                EventBus.$off(key, this.events.update[key]);
            }
        },
    };

    return component;
};