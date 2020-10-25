Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    const component = {
        name: 'S-Accordion',
        components,
        template:
            '  <v-expansion-panels :accordion="accordion"\n' +
            '                      :popout="popout"\n' +
            '                      :inset="inset"\n' +
            '                      :multiple="multiple"\n' +
            '                      :focusable="focusable"\n' +
            '                      :disabled="disabled"\n' +
            '                      :readonly="readonly"\n' +
            '                      :flat="flat"\n' +
            '                      :hover="hover"\n' +
            '                      :tile="tile">\n' +
            '    <v-expansion-panel v-for="(panel, key) in panels" :key="`${key}-accordion-${panels.length}`">\n' +
            '      <v-expansion-panel-header>{{ panel[\'#title\'] }}</v-expansion-panel-header>\n' +
            '\n' +
            '      <v-expansion-panel-content>\n' +
            '        <component v-for="(renderElement, element) in panel[\'#content\']"\n' +
            '                   :is="`as-${renderElement[\'#type\']}`"\n' +
            '                   :renderElement="renderElement"\n' +
            '                   :element="element"\n' +
            '                   :key="`${element}.${changed}`"\n' +
            '                   :region="region"/>\n' +
            '      </v-expansion-panel-content>\n' +
            '    </v-expansion-panel>\n' +
            '  </v-expansion-panels>',
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
                panels: {},
                accordion: true,
                popout: false,
                inset: false,
                multiple: false,
                disabled: false,
                readonly: false,
                focusable: false,
                flat: true,
                hover: false,
                tile: false,
                changed: 0,
            };
        },

        mounted: async function () {

            this.panels = this.element['#panels'];

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

    Module.appendStyle(`src/containers/css/Accordion.css`, component.name);
    return component;
};