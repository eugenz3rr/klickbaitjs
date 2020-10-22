Module => {
    const component = {
        name: 'S-Paragraph',
        template:
            '  <v-card class="ma-4">' +
            '    <v-card-title v-html="title"/>' +
            '    <v-card-subtitle v-html="description"/>' +
            '    <v-card-text v-html="value"/>' +
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
        },
    };
    
    Module.appendStyle(`src/elements/css/Paragraph.css`, component.name);

    return component;
};