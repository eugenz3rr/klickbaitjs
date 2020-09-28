<template>
  <v-form class="pa-4">
    <br/>
    <h2>{{ region.title }}</h2>
    <h6>{{ region.description }}</h6>

    <component v-for="(renderElement, element) in renderArray"
               :is="`as-${renderElement['#type']}`"
               :renderElement="renderElement"
               :element="element"
               :key="`${element}.${changed}`"
               :region="region"/>

    <v-btn block
           tile
           :loading="saving"
           color="success"
           @click="submit">
      Save
    </v-btn>
    <br/>
    <v-divider/>

    <v-snackbar v-model="snackbar"
                top
                color="success"
                multi-line
                timeout="3000"
                dismissible>
      <v-icon color="accent">done_all</v-icon> Saved successfully :D

      <v-btn color="transparent" @click="snackbar = false">
        <v-icon color="accent">close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>

const data = window.Manager.componentManager.getAll();
const components = {};
for (let i = 0; i < data.length; i++) {
  const component = data[i];
  components[`as-${component.id}`] = component.getComponent();
}

export default {
  name: "Form",
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

    const values = await this.loadValues();
    this.renderArray = await this.region.regionRaw.build(this.region.module, values);

    this.region.on(`register.receive.${this.info.id}`, () => {
      this.registered++;
    });

    let received = 0;
    this.region.on(`submit.receive.${this.info.id}`, (data) => {

      const {key, value} = data.detail;

      // Reset value to prevent errors.
      if (received === 0) {
        this.values = {};
      }

      // Set the new value.
      this.values[key] = value;

      // Update the received items.
      received++;

      // Check if we all
      if (this.registered === received) {
        this.submit(false);
        received = 0;
      }
    });
  },

  methods: {

    /**
     *
     */
    loadValues: async function () {
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

    submit: async function (collect = true) {

      // First collect all information currently set in all elements.
      if (collect) {

        this.region.emit(`submit.event.${this.info.id}`);
        this.saving = true;
        return;
      }

      // Submit all values.
      await this.save(this.values);

      //console.log(this.values)
      this.saving = false;
      this.snackbar = true;
    },

    /**
     *
     * @param values
     */
    save: async function (values) {
      console.debug('values', values)
      values = await this.region.regionRaw.submit(this.route.module, values);
      console.log(values)
      await this.region.fileSystem.write(`${this.route.module.path}values/form.${this.info.id}.json`, JSON.stringify(values));
    }
  }
}
</script>

<style>
form > div.v-input {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>