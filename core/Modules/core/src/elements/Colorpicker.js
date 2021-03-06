Module => {
    const component = {
        name: 'Color-Picker',
        template:
            '<v-color-picker' +
            '      :style="style" ' +
            '      :class="classes" ' +
            '      dot-size="30" ' +
            '      v-model="value"' +
            '      :canvas-height="canvasHeight"' +
            '      :hide-canvas="hideCanvas"' +
            '      :hide-inputs="hideInputs"' +
            '      :hide-mode-switch="hideModeSwitch"' +
            '      :mode="mode"' +
            '      :show-swatches="showSwatches"' +
            '      :swatches="swatches"' +
            '      :swatches-max-height="swatchesMaxHeight"' +
            '      :width="canvasHeight"' +
            '  />',
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,

            /**
             * @description Form id to identify events.
             */
            region: Object,
        },
        data() {
            return {
                value: {},
                canvasHeight: "",
                hideCanvas: false,
                hideModeSwitch: false,
                hideInputs: false,
                mode: 'hexa',
                showSwatches: false,
                swatches: undefined,
                swatchesMaxHeight: 150,
                width: 300,
                info: {},
                style: {},
                classes: [],
            };
        },
        watch: {
            value: {
                handler: function (value) {
                    this.$route.params[this.element] = value;
                    this.$trigger('input_change', this.element);
                },
                deep: true
            }
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

            this.info = this.region.regionRaw.info;

            this.$route.params[this.element] = this.value;
        },
    };
    Module.appendStyle(`src/elements/css/Colorpicker.css`, component.name);

    return component;
};