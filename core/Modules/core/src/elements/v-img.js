Module => {
    return {
        name: 'k-img',
        template:
            '<v-img' +
            '       :alt="alt"' +
            '       :aspect-ratio="aspectRatio"' +
            '       :contain="contain"' +
            '       :content-class="contentClass"' +
            '       :dark="dark"' +
            '       :eager="eager"' +
            '       :gradient="gradient"' +
            '       :height="height"' +
            '       :lazy-src="lazySrc"' +
            '       :light="light"' +
            '       :max-height="maxHeight"' +
            '       :max-width="maxWidth"' +
            '       :min-height="minHeight"' +
            '       :min-width="minWidth"' +
            '       :options="options"' +
            '       :position="position"' +
            '       :sizes="sizes"' +
            '       :src="src"' +
            '       :srcset="srcset"' +
            '       :transition="transition"' +
            '/>',
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,

            region: Object
        },
        data() {
            return {
                alt: undefined,
                aspectRatio: undefined,
                contain: false,
                contentClass: undefined,
                dark: false,
                eager: false,
                gradient: undefined,
                height: undefined,
                lazySrc: undefined,
                light: false,
                maxHeight: undefined,
                maxWidth: undefined,
                minHeight: undefined,
                minWidth: undefined,
                options: {},
                position: 'center center',
                sizes: undefined,
                src: undefined,
                srcset: undefined,
                transition: undefined,
                changed: 0,
            };
        },

        mounted: async function () {

            this.panels = this.element['#content'];

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
};