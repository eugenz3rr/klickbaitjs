<template>
  <v-sheet>
    <component v-for="(renderElement, element) in renderArray"
               :is="`as-${renderElement['#type']}`"
               :renderElement="renderElement"
               :element="element"
               :key="`element-${renderElement['#type']}-${element}`"/>
  </v-sheet>
</template>

<script>
import { Helper } from "../main";
import * as Common from "./../../../../common/lib/Library";

const data = window.Manager.componentManager.getAll();
const components = {};
for (let i = 0; i < data.length; i++) {
  const component = data[i];
  components[`as-${component.id}`] = component.getComponent();
}
export default {
  name: "Content",
  components,
  data() {
    return {
      Helper,
      renderArray: {},
    }
  },

  props: {
    route: Object,
    region: Object,
  },

  mounted: async function () {

    // Load the render array.
    await this.region.load();
    this.renderArray = this.region.regionRaw.build(this.region.module);
  },

  methods: {}
}
</script>

<style>
</style>