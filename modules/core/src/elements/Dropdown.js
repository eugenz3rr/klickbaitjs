Module => {
    const component = {
        name: 'Dropdown',
        template:
            '<v-select' +
            '   v-model="value"' +
            '   :label="title"' +
            '   :hint="description"' +
            '   :append-icon="appendIcon"' +
            '   :append-outer-icon="appendOuterIcon"' +
            '   :attach="attach"' +
            '   :autofocus="autofocus"' +
            '   :background-color="backgroundColor"' +
            '   :cache-items="cacheItems"' +
            '   :chips="chips"' +
            '   :clear-icon="clearIcon"' +
            '   :clearable="clearable"' +
            '   :color="color"' +
            '   :counter="counter"' +
            '   :counter-value="counterValue"' +
            '   :dark="dark"' +
            '   :deletable-chips="deletableChips"' +
            '   :dense="dense"' +
            '   :disable-lookup="disableLookup"' +
            '   :disabled="disabled"' +
            '   :eager="eager"' +
            '   :error="error"' +
            '   :error-count="errorCount"' +
            '   :error-messages="errorMessages"' +
            '   :filled="filled"' +
            '   :flat="flat"' +
            '   :full-width="fullWidth"' +
            '   :height="height"' +
            '   :hide-details="hideDetails"' +
            '   :hide-selected="hideSelected"' +
            '   :id="id"' +
            '   :item-color="itemColor"' +
            '   :item-disabled="itemDisabled"' +
            '   :item-text="itemText"' +
            '   :item-value="itemValue"' +
            '   :items="items"' +
            '   :light="light"' +
            '   :loader-height="loaderHeight"' +
            '   :loading="loading"' +
            '   :menu-props="menuProps"' +
            '   :messages="messages"' +
            '   :multiple="multiple"' +
            '   :no-data-text="noDataText"' +
            '   :open-on-clear="openOnClear"' +
            '   :outlined="outlined"' +
            '   :persistent-hint="persistentHint"' +
            '   :placeholder="placeholder"' +
            '   :prefix="prefix"' +
            '   :prepend-icon="prependIcon"' +
            '   :prepend-inner-icon="prependInnerIcon"' +
            '   :readonly="readonly"' +
            '   :return-object="returnObject"' +
            '   :reverse="reverse"' +
            '   :rounded="rounded"' +
            '   :rules="rules"' +
            '   :shaped="shaped"' +
            '   :single-line="singleLine"' +
            '   :small-chips="smallChips"' +
            '   :solo="solo"' +
            '   :solo-inverted="soloInverted"' +
            '   :success="success"' +
            '   :success-messages="successMessages"' +
            '   :suffix="suffix"' +
            '   :type="type"' +
            '   :validate-on-blur="validateOnBlur"' +
            '></v-select>',
        data() {
            return {
                value: "",
                title: "",
                description: "",
                appendIcon: '$dropdown',
                appendOuterIcon: undefined,
                attach: false,
                autofocus: false,
                backgroundColor: undefined,
                cacheItems: false,
                chips: false,
                clearIcon: '$clear',
                clearable: false,
                color: undefined,
                counter: undefined,
                counterValue: null,
                dark: false,
                deletableChips: false,
                dense: false,
                disableLookup: false,
                disabled: false,
                eager: false,
                error: false,
                errorCount: 1,
                errorMessages: [],
                filled: false,
                flat: false,
                fullWidth: false,
                height: undefined,
                hideDetails: undefined,
                hideSelected: false,
                hint: undefined,
                id: undefined,
                itemColor: 'primary',
                itemDisabled: "disabled",
                itemText: "text",
                itemValue: "value",
                items: [],
                label: undefined,
                light: false,
                loaderHeight: "2",
                loading: false,
                menuProps: {
                    'closeOnClick': false,
                    'closeOnContentClick': false,
                    'disableKeys': true,
                    'openOnClick': false,
                    'maxHeight': 304
                },
                messages: [],
                multiple: false,
                noDataText: '$vuetify.noDataText',
                openOnClear: false,
                outlined: false,
                persistentHint: true,
                placeholder: undefined,
                prefix: undefined,
                prependIcon: undefined,
                prependInnerIcon: undefined,
                readonly: false,
                returnObject: false,
                reverse: false,
                rounded: false,
                rules: [],
                shaped: false,
                singleLine: false,
                smallChips: false,
                solo: false,
                soloInverted: false,
                success: false,
                successMessages: [],
                suffix: undefined,
                type: 'text',
                validateOnBlur: false,
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