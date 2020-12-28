Module => {
    const component = {
        name: 'S-Information',
        template:
            '<div>' +
            '   <v-dialog' +
            '      v-model="dialog"' +
            '      persistent' +
            '      max-width="290"' +
            '    >' +
            '      <template v-slot:activator="{ on, attrs }">' +
            '        <v-btn' +
            '          tile' +
            '          block' +
            '          elevation="0"' +
            '          color="transparent"' +
            '          class=""' +
            '          v-bind="attrs"' +
            '          v-on="on"' +
            '        >' +
            '          <div class="mr-3">{{value}}</div>' +
            '          <v-icon>info</v-icon>' +
            '        </v-btn>' +
            '      </template>' +
            '      <v-card>' +
            '        <v-card-title class="headline">' +
            '          {{title}}' +
            '        </v-card-title>' +
            '        <v-card-text>{{description}}</v-card-text>' +
            '        <v-card-actions>' +
            '          <v-spacer></v-spacer>' +
            '          <v-btn' +
            '            color="green darken-1"' +
            '            text' +
            '            @click="dialog = false"' +
            '          >' +
            '            OK' +
            '          </v-btn>' +
            '        </v-card-actions>' +
            '      </v-card>' +
            '    </v-dialog>' +
            '</div>',
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
                description: "",
                value: "",
                dialog: false,
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
    
    //Module.appendStyle(`src/elements/css/Paragraph.css`, component.name);

    return component;
};