<template>
  <div class="board" :style="Helper.style.app">
    <v-expand-transition>
      <v-app-bar fixed v-if="index === 0" :style="Helper.style.app">
        <v-btn icon @click="Helper.$emit('tile.add')" color="accent">
          <v-icon>add</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn icon @click="Helper.$emit('settings.open')" color="accent">
          <v-icon>settings</v-icon>
        </v-btn>
      </v-app-bar>
    </v-expand-transition>

    <div class="tiles" v-if="index === 0">
      <tile-component
          v-for="(tile, index) in tiles"
          :key="`tile ${tile.modified} ${index}`"
          :_tile="tile"
          :_teaser="false"
      />
    </div>

    <add-tile-component v-else-if="index === 1" :_board="board" :_tile="tile"/>
    <settings-component v-else-if="index === 2"/>
  </div>
</template>

<script>
import { Helper, fileSystem, cordovaExists } from "../main";
import * as Common from "./../../../../common/lib/Library";

import TileComponent from "./Board/Tile";
import AddTileComponent from "./Board/AddTile";
import SettingsComponent from "./Board/Settings";

export default {
  name: "Board",
  data() {
    return {

      /** @type {Helper} */
      Helper,

      /** @type {Document} */
      document,

      /**
       * Used to switch through pages.
       *
       * @type {Number}
       */
      index: 0,

      /** @type {Common.Tile} */
      tile: null,

      /** @type {Array} */
      tiles: [],
    };
  },
  mounted: async function () {
    window.board = this.board;
    await this.loadBoard();

    this.Helper.$on("tile.add", async () => {
      this.addTile();
    });

    this.Helper.$on("tile.edit.leave", async () => {
      this.tile = false;
      this.index = 0;
      await this.loadBoard();
    });

    this.Helper.$on("tile.behavior.longpress", tile => {
      this.editTile(tile);
    });

    this.Helper.$on("settings.open", () => {
      this.index = 2;
    });

    this.Helper.$on("settings.close", () => {
      this.index = 0;
    });

  },
  components: {
    TileComponent,
    SettingsComponent,
    AddTileComponent,
  },
  props: {
    board: Common.Tile
  },
  methods: {
    loadBoard: async function () {
      if (cordovaExists) {
        this.tiles = [];

        let tiles = await fileSystem.list(this.board.pathTo(), "f");
        for (let i = 0; i < tiles.length; i++) {
          let tile;
          try {
            tile = await this.Helper.loadTile(tiles[i]);
          }
          catch (error) {
            console.warn("Tile could not be loaded.", error);
            continue;
          }

          if (tile !== false && tile.type !== "board") {
            this.tiles.push(tile);
          }
        }

        let boards = await fileSystem.list(this.board.pathTo(), "d");
        for (let i = 0; i < boards.length; i++) {
          let board;
          try {
            board = await this.Helper.loadTile(`${boards[i]}board.json`);
          }
          catch (error) {
            console.warn("Board could not be loaded.", error);
            continue;
          }

          if (board !== false && board.type === "board") {
            this.tiles.push(board);
          }
        }
      }
    },
    addTile: function () {
      this.tile = false;
      this.index = 1;
    },
    editTile: function (tile) {
      this.tile = tile;
      this.index = 1;
    }
  }
};
</script>

<style lang="scss">
.board {
  height: 100%;

  > .tiles {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>
