Module => {
    let data = Manager.componentManager.getAll(['v-list-group', 'v-list', 'content', 'form']);
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    return {
        name: 'k-list-group',
        components,
        template:
            '<v-list-group' +
            '    :active-class="activeClass"' +
            '    :append-icon="appendIcon"' +
            '    :color="color"' +
            '    :disabled="disabled"' +
            '    :eager="eager"' +
            '    :group="group"' +
            '    :no-action="noAction"' +
            '    :prepend-icon="prependIcon"' +
            '    :ripple="ripple"' +
            '    :sub-group="subGroup"' +
            '    :value="value"' +
            '    >' +
            '    <component v-for="(renderElement, element) in content"' +
            '               :is="`as-${renderElement[\'#type\']}`"' +
            '               :renderElement="renderElement"' +
            '               :element="element"' +
            '               :key="`${element}.${changed}`"' +
            '               :region="region"/>' +
            '</v-list-group>',
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
                activeClass: undefined,
                appendIcon: '$expand',
                color: 'primary',
                disabled: false,
                eager: false,
                group: undefined,
                noAction: false,
                prependIcon: undefined,
                ripple: true,
                subGroup: false,
                value: undefined,
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