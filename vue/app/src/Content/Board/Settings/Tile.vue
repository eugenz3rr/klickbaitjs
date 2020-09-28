<template>
  <v-card color="background" flat>
    <v-card-text>
      Here you can edit the default settings of a tile.
      <br/>For example the default background colour when adding a new tile.
    </v-card-text>
    <v-card-text>

      <v-text-field
          label="Tile name"
          v-model="name"
          @change="modified"
          :counter="56"
          color="accent"
      />

      <v-text-field
          label="Tiles per row"
          v-model="tilesPerRow"
          type="number"
          min="2"
          max="5"
      />

      <v-radio-group v-model="type" label="Tile type">
        <v-radio
            v-for="setting in settings.defaultTile.types"
            :key="setting"
            :label="capitalize(setting)"
            :value="setting"
            color="accent"
        />
      </v-radio-group>

      <h3 class="mb-4">Background Color</h3>
      <v-color-picker
          v-model="backgroundColor"
          mode="rgba"
          hide-mode-switch
          flat
      />

    </v-card-text>
  </v-card>
</template>

<script>
import { Helper, fileSystem, cordovaExists, Common } from "../../../main.js";

export default {
  name: "Tile",
  data() {
    return {
      /** @type {Helper} */
      Helper,

      /** @type {Document} */
      document,

      /** @type {Window} */
      window,

      /** @type {Common.Settings} */
      settings: Helper.settings,

      name: "",
      type: "",
      backgroundColor: null,
      tilesPerRow: 3,
    };
  },
  components: {},
  mounted: async function () {
    this.name = this.settings.defaultTile.name;
    this.type = this.settings.defaultTile.type;
  },
  destroyed: function () {
  },
  watch: {
    name: function (newValue) {
      this.settings.defaultTile.name = newValue;
      this.modified();
    },
    type: function (newValue) {
      this.settings.defaultTile.type = newValue;
      this.modified();
    }
  },
  methods: {
    modified: function () {
      this.settings.modified = new Date().getTime();
      console.log(this.settings.modified);
    },
    capitalize: function (s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
};
</script>
