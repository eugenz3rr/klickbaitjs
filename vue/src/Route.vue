<template>
  <v-sheet>
    <component v-for="(region, index) in route.regionManager.regions"
               :is="`as-${region.type}`"
               :route="route"
               :region="region"
               :key="`region-${index}-${region.type}-${route.path}-${changed}`"
               :style="{
                 order: index
                }"/>
  </v-sheet>
</template>

<script>

const components = {};
if (window.deviceready) {
  const data = window.Manager.componentManager.getAll();
  for (let i = 0; i < data.length; i++) {
    const component = data[i];
    components[`as-${component.id}`] = component.getComponent();
  }
}

export default {
  name: "Route",
  data() {
    return {
      drawer: false,
      renderRegions: [],
      changed: 0
    };
  },
  props: {
    route: Object,
  },
  watch: {
    $route: async function (to, from) {
      this.changed = Date.now();
    }
  },
  components
};
</script>

<style lang="scss">
.v-application--wrap {
  > .v-sheet {
    display: flex;
    flex-direction: column;
  }
}
</style>
