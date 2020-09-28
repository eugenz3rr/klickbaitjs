<template>
  <div class="settings" :style="Helper.style.app">
    <h2>Settings</h2>

    <v-tabs v-model="tab" background-color="transparent" color="accent" grow>
      <v-tab v-for="(tab, id) in tabs" :key="`${tab}-tabmenu`">
        <div :style="Helper.style.app">{{ id }}</div>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(tab, id) in tabs" :key="`${tab}-tabcontent`">
        <div v-if="tab === 'theme'">
          <theme/>
        </div>

        <div v-else>
          <forms-component :tab="tab" location="settings"></forms-component>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog v-model="dialog" persistent>
      <v-card v-if="!saving" color="secondary">
        <v-card-title>Did u forget smth?</v-card-title>
        <v-card-text>Ur trying to leave without saving. Are u sure m8?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="save">Save!</v-btn>
          <v-btn color="error" text @click="discard">Discard</v-btn>
          <v-btn color="warning" text @click="dialog = false">Let me edit ffs</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else color="secondary">
        <v-card-title>Saving ...</v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate color="primary"/>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-speed-dial
        v-model="fab"
        fixed
        bottom
        right
        direction="top"
        transition="scale-transition">
      <template v-slot:activator>
        <v-btn v-model="fab" color="secondary" fab>
          <v-icon color="accent" v-if="fab">close</v-icon>
          <v-icon color="accent" v-else>more_vert</v-icon>
        </v-btn>
      </template>

      <v-btn fab small color="transparent" @click="discard">
        <v-icon color="accent">exit_to_app</v-icon>
      </v-btn>

      <v-btn fab small color="transparent" @click="save">
        <v-icon color="accent">save</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import { Helper, fileSystem, cordovaExists, Common } from "../../main.js";

import ThemeComponent from "./Settings/Theme";
import TileComponent from "./Settings/Tile";
import FormsComponent from "../../Forms";

export default {
  name: "Settings",
  data() {
    return {
      fab: false,
      dialog: false,
      saving: false,

      /** @type {Helper} */
      Helper,
      document,

      /** @type {Common.Settings} */
      settings: Helper.settings,

      /**
       * @type {Object}
       * @description This
       */
      tabs: {
        'Theme': 'theme',
        'Tile': 'tile',
        'Misc': 'misc',
      },

      forms: {},

      tab: 0,
    };
  },
  components: {
    theme: ThemeComponent,
    tile: TileComponent,
    FormsComponent,
  },
  mounted: async function () {

    this.document.addEventListener(
        "backbutton",
        this.leave,
        false
    );


  },
  destroyed: async function () {
    this.document.removeEventListener("backbutton", this.leave, true);
  },
  methods: {
    leave: async function () {
      try {

        // Check if settings have changed.
        if (await fileSystem.read("settings.json") === JSON.stringify(this.settings.toJson())) {
          this.Helper.$emit("tile.edit.leave");
        }
        else {
          this.dialog = true;
        }
      }
      catch (e) {
        this.Helper.$emit("tile.edit.leave");
      }
    },

    save: async function () {
      this.saving = true;
      await this.settings.save();
      this.dialog = false;
      this.saving = false;
      this.Helper.$emit("tile.edit.leave");
    },

    discard: async function () {
      await this.settings.load();
      this.Helper.colors();
      this.dialog = false;
      this.Helper.$emit("tile.edit.leave");
    }
  }
};
</script>

<style lang="scss">
.settings {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 50px;

  > h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid;
    font-weight: initial;
    padding-bottom: 5px;
  }

  iframe {
    display: block;
    margin: 0 auto;
    width: 100%;

    .freebirdFormviewerViewFooterEmbeddedDisclaimer {
      display: none;
    }
  }
}
</style>