Module => {
    const component = {
        name: 'Textarea',
        template:
            '<v-textarea\n' +
            '      v-model="value"\n' +
            '      :label="title"\n' +
            '      :hint="description"\n' +
            '      :placeholder="placeholder"\n' +
            '      :auto-grow="autoGrow"\n' +
            '      :clearable="clearable"\n' +
            '      :filled="filled"\n' +
            '      :flat="flat"\n' +
            '      :no-resize="noResize"\n' +
            '      :outlined="outlined"\n' +
            '      :persistent-hint="persistentHint"\n' +
            '      :rounded="rounded"\n' +
            '      :row-height="rowHeight"\n' +
            '      :rows="rows"\n' +
            '      :shaped="shaped"\n' +
            '      :single-line="singleLine"\n' +
            '      :solo="solo"\n' +
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
        data() {
            return {
                value: "",
                title: "",
                description: "",
                placeholder: "",
                autoGrow: false,
                autofocus: true,
                clearable: false,
                filled: false,
                flat: false,
                noResize: false,
                outlined: false,
                persistentHint: true,
                rounded: false,
                rowHeight: 24,
                rows: 1,
                shaped: false,
                singleLine: false,
                solo: false,
            };
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

    Module.appendStyle(`src/elements/css/Textfield.css`, component.name);

    return component;
};
