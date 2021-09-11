Module => {
    let data = Manager.componentManager.getAll(['v-list', 'content', 'form']);
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    return {
        name: 'k-list',
        components,
        template:
            '<v-list' +
            '    :color="color"' +
            '    :dark="dark"' +
            '    :dense="dense"' +
            '    :disabled="disabled"' +
            '    :elevation="elevation"' +
            '    :expand="expand"' +
            '    :flat="flat"' +
            '    :height="height"' +
            '    :light="light"' +
            '    :max-height="maxHeight"' +
            '    :max-width="maxWidth"' +
            '    :min-height="minHeight"' +
            '    :min-width="minWidth"' +
            '    :nav="nav"' +
            '    :outlined="outlined"' +
            '    :rounded="rounded"' +
            '    :shaped="shaped"' +
            '    :subheader="subheader"' +
            '    :tag="tag"' +
            '    :three-line="threeLine"' +
            '    :tile="tile"' +
            '    :two-line="twoLine"' +
            '    :width="width"' +
            '    >' +
            '    <component v-for="(renderElement, element) in content"' +
            '               :is="`as-${renderElement[\'#type\']}`"' +
            '               :renderElement="renderElement"' +
            '               :element="element"' +
            '               :key="`${element}.${changed}`"' +
            '               :region="region"/>' +
            '</v-list>',
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
                color: undefined,
                dark: false,
                dense: false,
                disabled: false,
                elevation: undefined,
                expand: false,
                flat: false,
                height: undefined,
                light: false,
                maxHeight: undefined,
                maxWidth: undefined,
                minHeight: undefined,
                minWidth: undefined,
                nav: false,
                outlined: false,
                rounded: false,
                shaped: false,
                subheader: false,
                tag: 'div',
                threeLine: false,
                tile: false,
                twoLine: false,
                width: undefined,
                content: {},
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