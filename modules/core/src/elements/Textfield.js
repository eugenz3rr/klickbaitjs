Module => {
    const component = {
        name: 'Textfield',
        template:
            '  <v-text-field\n' +
            '      v-model="value"\n' +
            '      :label="title"\n' +
            '      :hint="description"\n' +
            '      :placeholder="placeholder"\n' +
            '      :min="min"\n' +
            '      :max="max"\n' +
            '      :persistent-hint="persistentHint"\n' +
            '  />',
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
        watch: {
            value: {
                handler: function (value) {
                    EventBus.$emit(`${this.element}.update`, value);
                },
                deep: true
            }
        },
        data() {
            return {
                value: "",
                title: "",
                description: "",
                placeholder: "",
                min: 0,
                max: 16,
                persistentHint: true
            };
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

            const info = this.region.regionRaw.info;

            Module.emit(`register.receive.${info.id}`);

            Module.on(`submit.event.${info.id}`, () => {
                Module.emit(`submit.receive.${info.id}`, {
                    key: this.element,
                    value: this.value
                });
            });
        },
    };

    Module.appendStyle(`src/elements/Textfield.css`, component.name);

    return component;
};