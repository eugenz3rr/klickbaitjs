Module => {
    const elements = window.Manager.componentManager.getComponentsByType('elements');
    const containers = window.Manager.componentManager.getComponentsByType('containers');
    const data = [...elements, ...containers];
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    return {
        name: 'Content',
        components,
        template:
            '<v-sheet>' +
            '  <component v-for="(renderElement, element) in renderArray"' +
            '             :is="`as-${renderElement[\'#type\']}`"' +
            '             :renderElement="renderElement"' +
            '             :element="element"' +
            '             :key="`element-${renderElement[\'#type\']}-${element}`"/>' +
            '</v-sheet>',
        props: {
            route: Object,
            region: Object,
        },
        data() {
            return {
                renderArray: {},
            }
        },
        mounted: async function () {

            // Load the render array.
            await this.region.load();
            this.renderArray = await this.region.regionRaw.build(this.region.module, this.$route);
        },
    };
};