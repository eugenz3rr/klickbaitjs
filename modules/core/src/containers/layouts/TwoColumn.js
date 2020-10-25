Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    const component = {
        name: 'S-TwoColumn',
        components,
        template:
            '<div class="two-column mt-2">' +
            '   <v-card class="first-column" flat>' +
            '       <v-card-text>' +
            '             <component v-for="(renderElement, element) in first"' +
            '                        :is="`as-${renderElement[\'#type\']}`"' +
            '                        :renderElement="renderElement"' +
            '                        :element="element"' +
            '                        :key="`${element}.${changed}`"' +
            '                        :region="region"/>' +
            '       </v-card-text>' +
            '   </v-card>' +
            '   <v-card class="second-column" flat>' +
            '       <v-card-text>' +
            '             <component v-for="(renderElement, element) in second"' +
            '                        :is="`as-${renderElement[\'#type\']}`"' +
            '                        :renderElement="renderElement"' +
            '                        :element="element"' +
            '                        :key="`${element}.${changed}`"' +
            '                        :region="region"/>' +
            '       </v-card-text>' +
            '   </v-card>' +
            '</div>',
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
                first: {},
                second: {},
                changed: 0
            };
        },

        mounted: async function () {

            // this.first = Module.fallback(this.element, '#first', {});
            // this.second = Module.fallback(this.element, '#second', {});

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
        .two-column {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: auto;
            column-gap: 10px;
            grid-template-areas: 
              "first second";
        }
        
        .first-column {
            grid-area: first;
        }
        
        .second-column {
            grid-area: second;
        }
    `)

    return component;
};