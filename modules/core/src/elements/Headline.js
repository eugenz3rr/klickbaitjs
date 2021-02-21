Module => {
    const component = {
        name: 'S-Headline',
        template:
            '<v-card flat :class="classes" color="transparent">' +
            '    <v-card-title :class="classes" v-if="title" v-html="title"/>' +
            '    <v-card-subtitle :class="classes" v-if="description" v-html="description"/>' +
            '</v-card>',
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
                classes: [],
                title: "",
                description: "",
                size: 1,
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
    Module.appendStyle(`src/libraries/highlight/highlight.pack.js`, component.name);

    return component;
};