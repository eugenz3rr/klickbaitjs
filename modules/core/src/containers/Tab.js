Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    const component = {
        name: 'S-Tab',
        components,
        template:
            '  <v-card>\n' +
            '    <v-tabs v-model="panel"\n' +
            '            :centered="centered"\n' +
            '            :grow="grow"\n' +
            '            :vertical="vertical"\n' +
            '            :right="right">\n' +
            '      <v-tab v-for="(panel, key) in panels" :key="`${key}-tab-header-${panels.length}`">\n' +
            '        {{ panel[\'#title\'] }}\n' +
            '      </v-tab>\n' +
            '    </v-tabs>\n' +
            '\n' +
            '    <v-tabs-items v-model="panel">\n' +
            '      <v-tab-item v-for="(panel, key) in panels" :key="`${key}-tab-content-${panels.length}`">\n' +
            '        <v-card flat>\n' +
            '          <v-card-text>\n' +
            '            <component v-for="(renderElement, element) in panel[\'#content\']"\n' +
            '                       :is="`as-${renderElement[\'#type\']}`"\n' +
            '                       :renderElement="renderElement"\n' +
            '                       :element="element"\n' +
            '                       :key="`${element}.${changed}`"\n' +
            '                       :region="region"/>\n' +
            '          </v-card-text>\n' +
            '        </v-card>\n' +
            '      </v-tab-item>\n' +
            '    </v-tabs-items>\n' +
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

            region: Object
        },
        data() {
            return {
                panels: {},
                panel: 1,
                centered: false,
                grow: true,
                vertical: false,
                right: false,
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

    Module.appendStyle(`
    .v-tabs {
      margin-top: 20px;
    }
    .v-tabs .v-tabs-slider {
      background-color: var(--accent) !important;
    }
    .v-tabs .v-tabs-bar {
      background-color: var(--secondary) !important;
    }
    .v-tabs .v-tabs-bar .v-tab {
      color: var(--font) !important;
    }
    
    .v-window {
      margin-bottom: 20px;
    }
    .v-window .v-card {
      background-color: var(--primary) !important;
    }
    `);

    return component;
};