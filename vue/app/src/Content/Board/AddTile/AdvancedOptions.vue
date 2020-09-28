<template>
  <div class="add-tile-advanced" v-if="advanced">
    <v-expansion-panels accordion>
      <!-- <v-expansion-panel disabled>
        <v-expansion-panel-header color="background">Color</v-expansion-panel-header>
        <v-expansion-panel-content color="background">
          <div>
            <v-color-picker
              mode="rgba"
              hide-mode-switch
              hide-inputs
              :width="window.innerWidth / 2"
            />
          </div>
          <v-color-picker
            mode="rgba"
            hide-mode-switch
            hide-inputs
            hide-canvas
            :width="window.innerWidth / 2"
          />
        </v-expansion-panel-content>
      </v-expansion-panel> -->

      <v-expansion-panel>
        <v-expansion-panel-header color="background">Image</v-expansion-panel-header>
        <v-expansion-panel-content color="background">

          <v-file-input
            v-if="_image_state !== 'stored' && _image_state !== 'prepared'"
            v-model="image.raw"
            @change="prepareImage"
            placeholder="Upload a gif or image"
            label="Tile image"
            hint="An image or a gif will override the selected tile."
            persistent-hint
            show-size
            color="accent"
          />

          <!--  -->
          <v-btn
            v-if="_image_state === 'stored' || _image_state === 'prepared'"
            color="error"
            class="audio-editor-item"
            outlined
            block
            tile
            @click="removeCurrentImage"
          >Remove</v-btn>

          <!-- Crop current image. -->
          <v-btn
            v-if="_editing && _image_state === 'stored'"
            class="audio-editor-item"
            outlined
            block
            tile
            @click="cropCurrentImage"
          >Crop image</v-btn>

          <v-btn
            v-if="image.raw && _image_state !== 'stored'"
            class="audio-editor-item"
            outlined
            block
            tile
            @click="cropImage"
          >Crop image</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header color="background">Sound</v-expansion-panel-header>
        <v-expansion-panel-content color="background">

          <v-file-input
            v-if="_sound_state !== 'stored' && _sound_state !== 'prepared'"
            v-model="sound.raw"
            @change="prepareSound"
            placeholder="Upload your sound"
            label="Tile sound"
            show-size
            color="accent"
          />

          <v-slider
            v-if="_sound_state === 'stored' || _sound_state === 'prepared'"
            v-model="volume"
            append-icon="volume_up"
            prepend-icon="volume_down"
            :min="1"
            :max="100"
            label="Volume"
            hint="Change the volume of the played tile."
            persistent-hint
          />

          <!--  -->
          <v-btn
            v-if="_sound_state === 'stored' || _sound_state === 'prepared'"
            color="error"
            class="audio-editor-item"
            outlined
            block
            tile
            @click="removeCurrentSound"
          >Remove</v-btn>

          <v-btn
            v-if="_sound_state === 'stored' || _sound_state === 'prepared'"
            class="audio-editor-item"
            outlined
            block
            tile
            @click="cropSound"
          >Crop audio</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import { Helper, cordovaExists } from "../../../main.js";

export default {
  name: "AdvancedOptions",
  data: function() {
    return {
      Helper,
      window,
      image: {
        raw: null,
      },
      sound: {
        raw: null,
      },
      volume: 100,
    };
  },
  props: {
    advanced: Boolean,
    
    _editing: Boolean,

    _image: Array | File,
    _image_state: String,

    _sound: Array | File,
    _sound_state: String,
  },
  mounted: function() {
    if (this._image) {
      this.image.raw = this._image;
    }
    if (this._sound) {
      this.sound.raw = this._sound;
    }
  },
  methods: {

    /**
     * Crop current image.
     */
    cropCurrentImage: function () {
      this.Helper.$emit('image.current.crop');
    },

    /**
     * remove current image.
     */
    removeCurrentImage: function () {
      this.image.raw = null;
      this.Helper.$emit('image.current.remove');
    },

    /**
     * 
     */
    cropImage: function () {
      this.Helper.$emit('image.crop', this.image.raw);
    },

    /**
     * 
     */
    prepareImage: async function () {

      try {
        if (!this.image.raw) {
          this.Helper.$emit('image.prepare', false);
          return;
        }
      } catch (error) {
        this.Helper.$emit('image.prepare', false);
        return;
      }

      let result;
      await new Promise( resolve => {
        let fileReader = new FileReader();

        fileReader.onload = dataUrl => {
          result = dataUrl.target.result;
          resolve();
        }

        fileReader.readAsDataURL(this.image.raw);
      });

      this.Helper.$emit('image.prepare', result);
    },

    // ----------

    /**
     * 
     */
    prepareSound: async function () {
      if (!cordovaExists) {
        //return;
      }

      try {
        if (!this.sound.raw) {
          this.Helper.$emit('sound.prepare', false);
          return;
        }
      } catch (error) {
        this.Helper.$emit('sound.prepare', false);
        return;
      }

      let result;
      await new Promise( resolve => {
        let fileReader = new FileReader();

        fileReader.onload = data => {

          result = data.target.result;
          resolve();
        };

        fileReader.readAsDataURL(this.sound.raw);
      });

      this.Helper.$emit('sound.prepare', result);
    },

    /**
     * Crop current sound.
     */
    cropCurrentSound: function () {
      this.Helper.$emit('sound.current.crop');
    },

    removeCurrentSound: function () {
      this.sound.raw = null;
      this.Helper.$emit('sound.prepare', false);
    },

    /**
     * 
     */
    cropSound: function () {
      this.Helper.$emit('sound.crop');
    },
  }
};
</script>

<style lang="sass">

</style>