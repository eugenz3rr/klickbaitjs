Module => {
    const elements = window.Manager.componentManager.getComponentsByType('elements');
    const containers = window.Manager.componentManager.getComponentsByType('containers');
    const data = [...elements, ...containers];
    const components = {};

    for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
    }

    return {
        name: 'Form',
        template: 
            '<v-form class="pa-4 mb-4">' +
            '    <br v-if="region.title || region.description"/>' +
            '    <h2 v-if="region.title">{{ region.title }}</h2>' +
            '    <h6 v-if="region.description">{{ region.description }}</h6>' +
            '' +
            '    <component v-for="(renderElement, element) in renderArray"' +
            '               :is="`as-${renderElement[\'#type\']}`"' +
            '               :renderElement="renderElement"' +
            '               :element="element"' +
            '               :key="`${element}.${changed}`"' +
            '               :region="region"/>' +
            '' +
            '    <v-btn' +
            '        v-if="info.submit === undefined || info.submit === true"' +
            '        block' +
            '        tile' +
            '        outlined' +
            '        :loading="saving"' +
            '        color="success"' +
            '        @click="submit">' +
            '      Save' +
            '      {{ info.submit }}' +
            '    </v-btn>' +
            '    <br/>' +
            '  </v-form>',
        components,
        data() {
            return {
                info: {},
                renderArray: {},
                values: {},
                saving: false,
                snackbar: false,
                changed: 0,
                registered: 0,
            }
        },

        props: {
            route: Object,
            region: Object,
        },

        mounted: async function () {
            await this.region.load();
            this.info = this.region.regionRaw.info;

            const values = await this.build();
            this.renderArray = await this.region.regionRaw.build(this.region.module, values, this.$route.params);
        },

        methods: {

            /**
             *
             */
            build: async function () {
                let values = {};

                try {
                    values = await this.region.fileSystem.readJSON(`${this.region.module.path}values/form.${this.info.id}.json`);
                    console.log(`${this.region.module.path}values/form.${this.info.id}.json`)
                } catch (error) {
                    await this.region.fileSystem.write(`${this.region.module.path}values/form.${this.info.id}.json`, JSON.stringify({}));

                    /*
                     * At this point we know that there is nothing in the fileSystem about this file.
                     * So it's ok to set value empty.
                     */
                    values = {};
                }

                if (values === undefined) return {};
                return values;
            },

            validate: async function () {

            },

            submit: async function () {
                this.saving = true;

                await this.save(this.$route.params, this.$router);

                //console.log(this.values)
                this.saving = false;
                this.snackbar = true;
            },

            /**
             *
             * @param values
             */
            save: async function (values) {
                values = await this.region.regionRaw.submit(this.route.module, values, this.$router);

                if ('save' in this.info && this.info.save !== false) {
                    //await this.region.fileSystem.write(`${this.router.module.path}values/form.${this.info.id}.json`, JSON.stringify(values));
                }
            }
        }
    };
};