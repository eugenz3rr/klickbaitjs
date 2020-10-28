Module => {
    const component = {
        name: 'S-Paragraph',
        template:
            '  <v-card>' +
            '    <v-card-title v-html="title"/>' +
            '    <v-card-subtitle v-html="description"/>' +
            '    <v-card-text :style="{ color: textColor }" v-html="value"/>' +
            '  </v-card>',
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
                value: "",
                textColor: "",
                update: [],
            };
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
    
    Module.appendStyle(`src/elements/css/Paragraph.css`, component.name);

    return component;
};