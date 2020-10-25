Module => {
    const component = {
        name: 'S-Button',
        template:
            '<v-btn' +
            '   @click="submit"' +
            '   :absolute="absolute"' +
            '   :active-class="activeClass"' +
            '   :append="append"' +
            '   :block="block"' +
            '   :bottom="bottom"' +
            '   :color="color"' +
            '   :dark="dark"' +
            '   :depressed="depressed"' +
            '   :disabled="disabled"' +
            '   :elevation="elevation"' +
            '   :exact="exact"' +
            '   :exact-active-class="exactActiveClass"' +
            '   :fab="fab"' +
            '   :fixed="fixed"' +
            '   :height="height"' +
            '   :href="href"' +
            '   :icon="icon"' +
            '   :input-value="inputValue"' +
            '   :large="large"' +
            '   :left="left"' +
            '   :light="light"' +
            '   :link="link"' +
            '   :loading="loading"' +
            '   :max-height="maxHeight"' +
            '   :max-width="maxWidth"' +
            '   :min-height="minHeight"' +
            '   :min-width="minWidth"' +
            '   :nuxt="nuxt"' +
            '   :outlined="outlined"' +
            '   :replace="replace"' +
            '   :retain-focus-on-click="retainFocusOnClick"' +
            '   :right="right"' +
            '   :ripple="ripple"' +
            '   :rounded="rounded"' +
            '   :shaped="shaped"' +
            '   :small="small"' +
            '   :tag="tag"' +
            '   :target="target"' +
            '   :text="text"' +
            '   :tile="tile"' +
            '   :top="top"' +
            '   :type="type"' +
            '   :value="value"' +
            '   :width="width"' +
            '   :x-large="xLarge"' +
            '   :x-small="xSmall">' +
            '       <v-icon left v-if="appendIcon">{{ appendIcon }}</v-icon>' +
            '       {{ title }}' +
            '       <v-icon right v-if="prependIcon">{{ prependIcon }}</v-icon>' +
            '</v-btn>',
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,
        },
        data() {
            return {
                title: "",
                appendIcon: false,
                prependIcon: false,
                absolute: false,
                activeClass: '',
                append: false,
                block: false,
                bottom: false,
                color: undefined,
                dark: false,
                depressed: false,
                disabled: false,
                elevation: undefined,
                exact: false,
                exactActiveClass: undefined,
                fab: false,
                fixed: false,
                height: undefined,
                href: undefined,
                icon: false,
                inputValue: undefined,
                large: false,
                left: false,
                light: false,
                link: false,
                loading: false,
                maxHeight: undefined,
                maxWidth: undefined,
                minHeight: undefined,
                minWidth: undefined,
                nuxt: false,
                outlined: false,
                replace: false,
                retainFocusOnClick: false,
                right: false,
                ripple: undefined,
                rounded: false,
                shaped: false,
                small: false,
                tag: "button",
                target: undefined,
                text: false,
                tile: false,
                to: undefined,
                top: false,
                type: "button",
                value: undefined,
                width: undefined,
                xLarge: false,
                xSmall: false,
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

        methods: {
            submit: function () {

                // TODO: What do we do if there are multiple forms currently present??
                EventBus.$emit(`submit.redirect`, this.to);
            }
        }
    };

    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        style.setAttribute('data-module', component.name);
        document.head.append(style);
    }

    addStyle(`
    div.v-text-field {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    div.v-text-field > .v-input__control > .v-input__slot {
      background-color: var(--background) !important;
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