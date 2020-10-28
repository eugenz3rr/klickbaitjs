Module => {
    const component = {
        name: 'Upload',
        template: 
            '<v-file-input' +
            '   v-model="value"' +
            '   :label="title"' +
            '   :hint="description"' +
            '   :append-icon="appendIcon"' +
            '   :append-outer-icon="appendOuterIcon"' +
            '   :autofocus="autofocus"' +
            '   :background-color="backgroundColor"' +
            '   :chips="chips"' +
            '   :clear-icon="clearIcon"' +
            '   :clearable="clearable"' +
            '   :color="color"' +
            '   :counter="counter"' +
            '   :counter-size-string="counterSizeString"' +
            '   :counter-string="counterString"' +
            '   :counter-value="counterValue"' +
            '   :dark="dark"' +
            '   :dense="dense"' +
            '   :disabled="disabled"' +
            '   :error="error"' +
            '   :error-count="errorCount"' +
            '   :error-messages="errorMessages"' +
            '   :filled="filled"' +
            '   :flat="flat"' +
            '   :full-width="fullWidth"' +
            '   :height="height"' +
            '   :hide-details="hideDetails"' +
            '   :hide-input="hideInput"' +
            '   :light="light"' +
            '   :loader-height="loaderHeight"' +
            '   :loading="loading"' +
            '   :messages="messages"' +
            '   :multiple="multiple"' +
            '   :outlined="outlined"' +
            '   :persistent-hint="persistentHint"' +
            '   :placeholder="placeholder"' +
            '   :prefix="prefix"' +
            '   :prepend-icon="prependIcon"' +
            '   :prepend-inner-icon="prependInnerIcon"' +
            '   :readonly="readonly"' +
            '   :reverse="reverse"' +
            '   :rounded="rounded"' +
            '   :rules="rules"' +
            '   :shaped="shaped"' +
            '   :show-size="showSize"' +
            '   :single-line="singleLine"' +
            '   :small-chips="smallChips"' +
            '   :solo="solo"' +
            '   :solo-inverted="soloInverted"' +
            '   :success="success"' +
            '   :success-messages="successMessages"' +
            '   :suffix="suffix"' +
            '   :truncate-length="truncateLength"' +
            '/>',
        data() {
            return {
                title: undefined,
                description: undefined,
                value: undefined,
                appendIcon: undefined,
                appendOuterIcon: undefined,
                autofocus: false,
                backgroundColor: undefined,
                chips: false,
                clearIcon: '$clear',
                clearable: true,
                color: undefined,
                counter: undefined,
                counterSizeString: '$vuetify.fileInput.counterSize',
                counterString: '$vuetify.fileInput.counter',
                counterValue: null,
                dark: false,
                dense: false,
                disabled: false,
                error: false,
                errorCount: 1,
                errorMessages: [],
                filled: false,
                flat: false,
                fullWidth: false,
                height: undefined,
                hideDetails: undefined,
                hideInput: false,
                light: false,
                loaderHeight: 2,
                loading: false,
                messages: [],
                multiple: false,
                outlined: false,
                persistentHint: true,
                placeholder: undefined,
                prefix: undefined,
                prependIcon: '$file',
                prependInnerIcon: undefined,
                readonly: false,
                reverse: false,
                rounded: false,
                rules: [],
                shaped: false,
                showSize: false,
                singleLine: false,
                smallChips: false,
                solo: false,
                soloInverted: false,
                success: false,
                successMessages: [],
                suffix: undefined,
                truncateLength: 22,
            };
        },
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
        watch: {
            value: {
                handler: function (value) {
                    console.log(value)
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

            const info = this.region.regionRaw.info;

            this.$route.params[this.element] = this.value;
        },
    };

    return component;
};