Module => {
    const component = {
        name: 'S-Redirect-Button',
        template:
            '<v-btn' +
            '   v-if="show"' +
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
            '       <v-icon v-if="centerIcon">{{ centerIcon }}</v-icon>' +
            '       <div v-else>{{ title }}</div>' +
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
        events: {
            input_change: function (event, value) {
                const params = this.$route.params;

                if (!(value in params)) {
                    return;
                }

                const update_length = Object.keys(this.update).length;
                let found = undefined;
                for (let i = 0; i < update_length; i++) {
                    const update = this.update[i];

                    if (update.value === value) {
                        found = update;
                        break;
                    }
                }

                if (found === undefined) {
                    return;
                }

                this[found.key] = params[value];
            }
        },
        watch: {
            vif: {
                handler: function (value) {
                    if (Array.isArray(value)) {
                        this.show = value.length !== 0;
                    }
                },
                deep: true
            }
        },
        data() {
            return {
                title: "",
                vif: true,
                show: true,
                appendIcon: false,
                prependIcon: false,
                centerIcon: false,
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
                update: []
            };
        },
        mounted: async function () {

            // Iterate trough all items and set them.
            const keys = Object.keys(this.renderElement);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                let value = this.renderElement[key];
                const dataKey = key.replace('#', '');

                // Check if data is mappable.
                if (!this.hasOwnProperty(dataKey)) {
                    continue;
                }

                // Check if element is empty.
                if (!value || value === false || value === undefined || value === null) {
                    continue;
                }

                if (value.constructor.name === 'String' && value.includes('~')) {
                    this.update.push({
                        key: key.replace('#', ''),
                        value: value.replace('~', '')
                    });

                    if (key.replace('#', '') in this && value.replace('~', '') in this.$route.params) {
                        value = this.$route.params[value.replace('~', '')];
                    } else {
                        continue;
                    }
                }

                // Set the new value.
                this[key.replace('#', '')] = value;
            }
        },
        methods: {
            submit: function () {
                if (!('params' in this.to)) {
                    this.to.params = {};
                }

                this.to.params = Object.assign(
                    this.to.params,
                    this.$route.params
                );
                this.$router.push(this.to)
            }
        }
    };
    Module.appendStyle(`src/elements/css/Button.css`, component.name);

    return component;
};