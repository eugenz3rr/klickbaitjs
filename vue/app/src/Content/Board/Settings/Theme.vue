<template>
  <v-card color="background" flat>
    <v-select class="mt-4" color="accent" v-model="theme" :items="themes" label="Themes"></v-select>

    <v-card color="background" flat>
      <p v-if="!settings.themes[settings.selectedTheme].editable">Sorry this theme cannot be edited.</p>

      <v-tabs v-else v-model="color" background-color="transparent" color="accent" vertical>
        <v-tab v-for="(color, name) in colors" :key="name">
          <div :style="Helper.style.app">
            {{ name }}
          </div>
        </v-tab>

        <v-tab-item v-for="(color, name) in colors" :key="name">

          <h3 class="pb-2 ml-2">Change {{ name }}</h3>

          <v-color-picker
              class="ml-2"
              v-model="colors[name]"
              mode="rgba"
              hide-mode-switch
              flat
              :width="window.innerWidth / 2"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-card>
</template>

<script>
import { Helper, fileSystem, cordovaExists } from "../../../main.js";
import * as Common from "./../../../../../../common/lib/Library";

export default {
  name: "Theme",
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

      /** @type {Array} */
      themes: [],

      /** @type {String} */
      theme: "",

      lastColorChange: "",
      colors: {},

      color: "",

      // We need to update by ourselves, because vue won't notice the change. Also this is a performance boost.
      update: () => {
      },
    };
  },
  components: {},
  mounted: async function () {

    for (let i = 0; i < this.settings.themes.length; i++) {
      let theme = this.settings.themes[i];
      this.themes.push(theme.name);
    }

    this.theme = this.themes[this.settings.selectedTheme];

    this.update = setInterval(() => {
      this.checkThemeChange();
    }, 1000 / this.Helper.UPS);
  },
  watch: {
    theme: function (_theme) {
      let theme;
      for (let i = 0; i < this.settings.themes.length; i++) {
        if (this.settings.themes[i].name === _theme) {
          this.settings.selectedTheme = i;
          theme = this.settings.themes[i];
          break;
        }
      }

      for (const key in theme) {
        const color = theme[key];

        if (color instanceof Common.Color) {
          this.colors[key] = color.toJson();
        }
      }

      this.Helper.colors();
    },
  },
  methods: {
    checkThemeChange: function () {
      let lastColorChange = JSON.stringify(this.colors);
      if (lastColorChange === this.lastColorChange) {
        return;
      }

      let theme = this.settings.themes[this.settings.selectedTheme];

      if (!theme.editable) {
        return;
      }

      for (const key in theme) {
        const color = theme[key];

        if (color instanceof Common.Color && this.colors && this.colors[key]) {
          theme[key] = new Common.Color(0, 0, 0, 0, this.colors[key]);
        }
      }

      this.Helper.colors();
      this.lastColorChange = lastColorChange;
    }
  }
};
</script>
