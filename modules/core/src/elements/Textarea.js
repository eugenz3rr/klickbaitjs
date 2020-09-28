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

    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        style.setAttribute('data-module', component.name);
        document.head.append(style);
    }

    addStyle(`
    div.v-textarea {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    div.v-textarea > .v-input__control > .v-input__slot {
      background-color: var(--background) !important;
    }
    div.v-textarea > .v-input__control > .v-input__slot textarea, div.v-textarea > .v-input__control > .v-input__slot label, div.v-textarea > .v-input__control > .v-input__slot div.v-messages {
      color: var(--font) !important;
    }
    div.v-textarea > .v-input__control > .v-input__slot button.v-icon, div.v-textarea > .v-input__control > .v-input__slot > fieldset {
      color: var(--accent) !important;
      border-color: var(--accent) !important;
    }`);

    return component;
};
