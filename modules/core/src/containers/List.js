Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    const component = {
        name: 'S-List',
        components,
        template:
            '  <v-list\n' +
            '      :disabled="disabled"\n' +
            '      :dense="dense"\n' +
            '      :two-line="twoLine"\n' +
            '      :three-line="threeLine"\n' +
            '      :shaped="shaped"\n' +
            '      :flat="flat"\n' +
            '      :subheader="subheader"\n' +
            '      :sub-group="subGroup"\n' +
            '      :nav="nav"\n' +
            '      :avatar="avatar"\n' +
            '      :rounded="rounded">\n' +
            '\n' +
            '    <v-list-item v-for="(panel, key) in panels" :key="`${key}-list-${panels.length}`">\n' +
            '      <v-list-item-content>\n' +
            '        <component v-for="(renderElement, element) in panel[\'#content\']"\n' +
            '                  :is="`as-${renderElement[\'#type\']}`"\n' +
            '                   :renderElement="renderElement"\n' +
            '                   :element="element"\n' +
            '                   :key="`${element}.${changed}`"\n' +
            '                   :region="region"/>\n' +
            '      </v-list-item-content>\n' +
            '    </v-list-item>\n' +
            '  </v-list>',
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
                disabled: false,
                dense: false,
                twoLine: false,
                threeLine: false,
                shaped: false,
                flat: false,
                subheader: false,
                inactive: false,
                subGroup: false,
                nav: false,
                avatar: false,
                rounded: false,
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

    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        style.setAttribute('data-module', component.name);
        document.head.append(style);
    }

    addStyle(`
    .v-expansion-panels {
      z-index: 0 !important;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .v-expansion-panels :before {
      border: solid 1px var(--accent);
      box-shadow: none !important;
    }
    .v-expansion-panels :first-child:before {
      border-bottom: none;
    }
    `);

    return component;
};