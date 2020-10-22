Module => {
    const component = {
        name: 'Color-Picker',
        template:
            '<v-color-picker\n' +
            '      v-model="value"\n' +
            '      :canvas-height="canvasHeight"\n' +
            '      :hide-canvas="hideCanvas"\n' +
            '      :hide-inputs="hideInputs"\n' +
            '      :hide-mode-switch="hideModeSwitch"\n' +
            '      :mode="mode"\n' +
            '      :show-swatches="showSwatches"\n' +
            '      :swatches="swatches"\n' +
            '      :swatches-max-height="swatchesMaxHeight"\n' +
            '      :width="canvasHeight"\n' +
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
                value: "",
                canvasHeight: "",
                hideCanvas: false,
                hideModeSwitch: false,
                hideInputs: false,
                mode: 'rgba',
                showSwatches: false,
                swatches: undefined,
                swatchesMaxHeight: 150,
                width: 300
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

            const info = this.region.regionRaw.info;

            Module.emit(`register.receive.${info.id}`);

            Module.on(`submit.event.${info.id}`, () => {
                Module.emit(`submit.receive.${info.id}`, {
                    key: this.element,
                    value: this.value
                });
            });
        },
    };
    Module.appendStyle(`src/elements/css/Colorpicker.css`, component.name);

    Module.appendStyle(`
    div.v-text-field > .v-input__control > .v-input__slot {
        background - color: var(--background) !important;
    }
    
    div.v-text-field > .v-input__control > .v-input__slot input,
        div.v-text-field > .v-input__control > .v-input__slot label.v-label,
        div.v-text-field > .v-input__control div.v-messages {
        color: var(--font) !important;
    }
    
    div.v-text-field > .v-input__control > .v-input__slot button.v-icon,
        div.v-text-field > .v-input__control > .v-input__slot:before,
        div.v-text-field > .v-input__control > .v-input__slot:after,
        div.v-text-field > .v-input__control > .v-input__slot > fieldset {
        color: var(--accent) !important;
        border-color: var(--accent) !important;
    }`);

    return component;
};