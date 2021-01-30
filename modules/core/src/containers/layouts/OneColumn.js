Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    const component = {
        name: 'TileContainer',
        components,
        template:
            '<div class="one-column">' +
            '   <component v-for="(renderElement, element) in content"' +
            '              :is="`as-${renderElement[\'#type\']}`"' +
            '              :renderElement="renderElement"' +
            '              :element="element"' +
            '              :key="`${element}.${changed}`"' +
            '              :region="region"/>' +
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
                content: {},
                changed: 0
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
        updated: async function () {
            const containers = document.querySelector('.one-column');
            const computedWidth = containers.offsetWidth;

            /*const sortable = new Draggable.Swappable(containers, {
                draggable: '.tile',
                mirror: {
                    appendTo: '.one-column',
                    constrainDimensions: true,
                },
                plugins: [Draggable.Plugins.SwapAnimation],
                sortAnimation: {
                    duration: 200,
                },
            });*/
        }
    };

    Module.appendStyle(`src/containers/layouts/css/OneColumn.css`, component.name);

    return component;
};