Module => {
    const data = Manager.componentManager.getAll(['content', 'form']);
    const components = {};

    data.forEach(component => {
        components[`as-${component.id}`] = component.getComponent();
    });

    return {
        name: 'Content',
        components,
        template:
            '<v-sheet>' +
            '  <component v-for="(renderElement, element) in renderArray"' +
            '             :is="`as-${renderElement[\'#type\']}`"' +
            '             :renderElement="renderElement"' +
            '             :element="element"' +
            '             :key="`element-${renderElement[\'#type\']}-${element}-${changed}`"/>' +
            '</v-sheet>',
        props: {
            route: Object,
            region: Object,
        },
        data() {
            return {
                renderArray: {},
                changed: 0,
            };
        },
        mounted: async function () {

            // Load the render array.
            await this.region.load();
            this.renderArray = await this.region.regionRaw.build(this.region.module, this.$route);
        },
    };
};