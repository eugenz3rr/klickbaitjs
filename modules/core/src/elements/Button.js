Module => {
    const component = {
        name: 'S-Button',
        template:
            '<v-button>' +
            '{{ title }}' +
            '</v-button>',
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
                absolute: false,
                
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