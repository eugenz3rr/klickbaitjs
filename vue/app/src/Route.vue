<template>
  <v-sheet>

    <!--  Global element.  -->
    <v-toolbar>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
    </v-toolbar>

    <!--
      TODO: Make this generic or at least add the possibility to alter the display.

      I want this part only to have pages and the logged in google user.
     -->
    <v-navigation-drawer
        v-model="drawer"
        absolute>
      <v-list dense nav>

        <!--
          FIXME: This item should be in another module.
          google_login module?
        -->
        <v-list-item>
          <v-list-item-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Unknown</v-list-item-title>
            <v-list-item-subtitle>Not logged in</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Lists items. -->
        <v-subheader>PAGES</v-subheader>
        <v-list-item
            v-for="route in route.module.moduleManager.manager.routeManager.routes"
            :key="route.title"
            v-if="!route.hide"
            link
            :to="{
              path: route.path
            }">
          <v-list-item-icon v-if="route.fallback(route, 'icon', false)">
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ route.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <component v-for="(region, index) in route.regionManager.regions"
               :is="`as-${region.type}`"
               :route="route"
               :region="region"
               :key="`region-${index}-${region.type}-${route.path}`"
               :style="{
                 order: index
                }"/>
  </v-sheet>
</template>

<script>
import Form from "./Regions/Form";
import Content from "./Regions/Content";

export default {
  name: "Route",
  data() {
    return {
      Helper,
      drawer: false,
      renderRegions: []
    };
  },
  mounted: function () {
  },
  props: {
    route: Object,
  },
  components: {
    'as-content': Content,
    'as-form': Form,
  }
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
