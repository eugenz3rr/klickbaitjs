<template>
  <v-sheet style="margin-top: 56px;" :min-height="style.sheet.height">
    <Board v-if="board" :board="board" :key="board.path"/>

    <v-dialog v-model="disclaimer" persistent>
      <v-card color="secondary">
        <v-card-title>Disclaimer</v-card-title>
        <v-card-text>
          This app is currently at heavy development.

          This is why the app writes its files into a cache which is a storage type that is temporary.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="closeDisclaimer">Ok hf & gl</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-sheet>
</template>

<script>
import { Helper, fileSystem, cordovaExists } from "./main.js";
import * as Common from "./../../../common/lib/Library";
import Board from "./Content/Board";

export default {
  name: "MainContent",
  data() {
    return {

      /** @type {Helper} */
      Helper,

      /** @type {Common.Settings} */
      settings: Helper.settings,

      /** @type {Document} */
      document,

      board: false,

      disclaimer: false,

      style: {
        sheet: {
          height: window.innerHeight - 56
        }
      }
    };
  },
  components: {
    Board
  },
  mounted: async function () {
    this.Helper.$on("board.load", async tile => {
      this.board = tile;
    });

    if (cordovaExists) {
      this.disclaimer = this.settings.disclaimer;
    }

    // Shake to open tile add.
    // shake.startWatch(() => {
    //   this.addTile();
    // }, 40, () => {});

    window.forceShake = this.addTile;

    await this.initSoundboard();
  },
  methods: {
    initSoundboard: async function () {
      // Return if cordova is not defined. (Debug mode).
      if (!cordovaExists) {
        let board = new Common.Tile();
        board.id = "board";
        board.path = "soundboard/board.json";
        board.name = "Soundboard";
        board.type = "board";
        this.board = board;

        return;
      }

      // Ensure soundboard directory exists.
      await fileSystem.ensure("soundboard");

      let initFile = await fileSystem.exists("soundboard/board.json");

      if (!initFile) {
        initFile = new Common.Tile();
        initFile.id = "board";
        initFile.path = "soundboard/board.json";
        initFile.name = "Soundboard";
        initFile.type = "board";

        await fileSystem.create(initFile.path);
        await fileSystem.write(initFile.path, initFile.toJson());

        await this.initSoundboard();
      }
      else {
        initFile = await this.Helper.loadTile("soundboard/board.json");

        if (!initFile) {
          alert("Files may be corrupt.");
        }
        else {
          this.board = initFile;
        }
      }
    },
    closeDisclaimer: async function () {
      this.disclaimer = false;
      this.settings.disclaimer = false;
      await this.settings.save();
    }
  }
};
</script>

<style lang="scss">
#main-content {
  grid-area: main-content;
  overflow-y: scroll;
}
</style>
