<template>
  <div
      class="tile"
      :style="{
          backgroundColor: backgroundColor,
          color: fontColor,
        }"
      v-ripple
      v-touch:longtap="longpress"
      v-touch:tap="click"
  >
    <v-img
        v-if="image.data"
        :src="image.data"
        :min-height="tile.image.size.height"
        :min-width="tile.image.size.width"
        :alt="tile.name"
        @error="loading = true"
        @load="loading = true"
    />

    <audio v-if="sound.data" :src="sound.data" :id="tile.id" style="display: none;"/>
    <v-progress-circular v-if="loading" indeterminate color="primary"/>
    <div v-if="!loading" class="tile-title">{{ tile.name }}</div>
  </div>
</template>

<script>
import { Helper, fileSystem, cordovaExists} from "../../main";
import * as Common from "./../../../../../common/lib/Library";

export default {
  name: "Tile",
  data() {
    return {
      Helper,

      /**
       * @type Common.Tile
       */
      tile: this._tile,

      backgroundColor: "rgba(0, 0, 0, 0)",
      fontColor: "rgba(0, 0, 0, 0)",

      /** @type {Number} */
      loading: false,
      teaser: this._teaser || false,

      /** @type {Boolean} */
      options: false,

      /** @type {Object} */
      image: {
        /** @type {String} */
        data: ""
      },

      /** @type {Object} */
      sound: {
        /** @type {String} */
        data: ""
      },

      /** @type {Object} */
      timeout: {
        longpress: null
      }
    };
  },
  props: {
    _tile: Common.Tile,
    _teaser: Boolean
  },
  mounted: async function () {
    this.backgroundColor = this.tile.backgroundColor.toString();
    this.fontColor = this.tile.fontColor.toString();

    if (!cordovaExists) {
      return;
    }
    this.loading = true;

    if (
        this.tile.sound.state === "stored" ||
        this.tile.sound.state === "prepared"
    ) {
      try {
        this.sound.data = await fileSystem.toDataURL(this.tile.sound.path);
        console.log("Sound", this.tile.sound.path);
      }
      catch (error) {
        console.log(error);
      }
    }

    if (
        this.tile.image.state === "stored" ||
        this.tile.image.state === "prepared"
    ) {
      try {
        this.image.data = await fileSystem.toDataURL(this.tile.image.path);
        console.log("Image", this.tile.image.path);
      }
      catch (error) {
        console.log(error);
      }
    }
    this.loading = false;
  },
  methods: {
    longpress: function () {
      this.Helper.$emit("tile.behavior.longpress", this.tile);
    },
    click: function () {
      if (this.tile.type === "board") {
        this.Helper.$emit('board.load', this.tile);
      }
      else {
        this.play();
      }
    },
    play: function () {
      if (!this.sound.data) {
        return;
      }

      const audioElement = document.querySelector(`#${this.tile.id}`);
      let overlapping = false;

      audioElement.pause();
      audioElement.currentTime = 0;

      // TODO: Add setting for overlapping.
      if (overlapping) {
        audioElement.play();
      }
      else {
        // First pause all audio play.
        let audioElements = document.querySelectorAll("audio");
        for (let i = 0; i < audioElements.length; i++) {
          const audioElement = audioElements[i];

          audioElement.pause();
          audioElement.currentTime = 0;
        }

        audioElement.play();
      }
    }
  }
};
</script>

<style lang="scss">
.tile {
  overflow: hidden;
  border-radius: 15%;
  width: 150px;
  height: 150px;
  margin: 5px;
  transition: 0.2s;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  > .tile-title {
    position: absolute;
    max-width: 75%;
    max-height: 75%;
    word-break: break-word;
    text-align: center;
  }

  user-select: none;

  * {
    user-select: none;
  }
}
</style>