Module => {
    const component = {
        name: 'Textfield',
        template:
            '  <v-text-field' +
            '      v-model="value"' +
            '      :label="title"' +
            '      :hint="description"' +
            '      :placeholder="placeholder"' +
            '      :min="min"' +
            '      :max="max"' +
            '      :persistent-hint="persistentHint"' +
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
                    this.$route.params[this.element] = value;
                    this.$trigger('input_change', this.element);
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

            this.$route.params[this.element] = this.value;
        },
    };

    Module.appendStyle(`src/elements/Textfield.css`, component.name);

    return component;
};