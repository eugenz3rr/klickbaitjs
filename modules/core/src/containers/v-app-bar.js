Module => {
    const data = window.Manager.componentManager.getComponentsByType('elements');
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    return {
        name: 'k-app-bar',
        components,
        template:
            '<v-app-bar' +
            '       :absolute="absolute"' +
            '       :app="app"' +
            '       :bottom="bottom"' +
            '       :clipped-left="clippedLeft"' +
            '       :clipped-right="clippedRight"' +
            '       :collapse="collapse"' +
            '       :collapse-on-scroll="collapseOnScroll"' +
            '       :color="color"' +
            '       :dark="dark"' +
            '       :dense="dense"' +
            '       :elevate-on-scroll="elevateOnScroll"' +
            '       :elevation="elevation"' +
            '       :extended="extended"' +
            '       :extension-height="extensionHeight"' +
            '       :fade-img-on-scroll="fadeImgOnScroll"' +
            '       :fixed="fixed"' +
            '       :flat="flat"' +
            '       :floating="floating"' +
            '       :height="height"' +
            '       :hide-on-scroll="hideOnScroll"' +
            '       :inverted-scroll="invertedScroll"' +
            '       :light="light"' +
            '       :max-height="maxHeight"' +
            '       :max-width="maxWidth"' +
            '       :min-height="minHeight"' +
            '       :min-width="minWidth"' +
            '       :outlined="outlined"' +
            '       :prominent="prominent"' +
            '       :rounded="rounded"' +
            '       :scroll-off-screen="scrollOffScreen"' +
            '       :scroll-target="scrollTarget"' +
            '       :scroll-threshold="scrollThreshold"' +
            '       :shaped="shaped"' +
            '       :short="short"' +
            '       :shrink-on-scroll="shrinkOnScroll"' +
            '       :src="src"' +
            '       :tag="tag"' +
            '       :tile="tile"' +
            '       :value="value"' +
            '       :width="width"' +
            '    >' +
            '    <component v-for="(renderElement, element) in content[\'#content\']"' +
            '               :is="`as-${renderElement[\'#type\']}`"' +
            '               :renderElement="renderElement"' +
            '               :element="element"' +
            '               :key="`${element}.${changed}`"' +
            '               :region="region"/>' +
            '</v-app-bar>',
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
                absolute: false,
                app: false,
                bottom: false,
                clippedLeft: false,
                clippedRight: false,
                collapse: false,
                collapseOnScroll: false,
                color: undefined,
                dark: false,
                dense: false,
                elevateOnScroll: false,
                elevation: undefined,
                extended: false,
                extensionHeight: 48,
                fadeImgOnScroll: false,
                fixed: false,
                flat: false,
                floating: false,
                height: undefined,
                hideOnScroll: false,
                invertedScroll: false,
                light: false,
                maxHeight: undefined,
                maxWidth: undefined,
                minHeight: undefined,
                minWidth: undefined,
                outlined: false,
                prominent: false,
                rounded: undefined,
                scrollOffScreen: false,
                scrollTarget: undefined,
                scrollThreshold: undefined,
                shaped: false,
                short: false,
                shrinkOnScroll: false,
                src: undefined,
                tag: 'header',
                tile: false,
                value: true,
                width: undefined,
                content: {}
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