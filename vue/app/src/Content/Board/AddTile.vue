<template>
  <div class="add-tile" :style="Helper.style.app">
    <v-form v-if="editor === 0" v-model="valid" ref="addtile">
      <div class="add-tile-simplified">

        <!-- Title. -->
        <h2>{{ state.editing ? 'Alter' : 'Add' }} {{ tile.type !== 'board' ? 'Tile' : 'Board'}}</h2>

        <div class="add-tile-simplified-container">
          <div class="add-tile-tile">
            <tile-component :_tile="tile" :_teaser="true" :key="tile.modified"/>

            <v-switch
              v-if="!state.editing"
              v-model="directory"
              @change="validateForm"
              class="add-tile-directory-switch"
              :label="`Add as ${ tile.type !== 'board' ? 'Tile' : 'Board'}`"
              color="accent"/>
          </div>

          <!-- Get background color. -->
          <div class="add-tile-input">
            <v-color-picker
              v-model="backgroundColor"
              mode="rgba"
              hide-mode-switch
              hide-canvas
              flat
              :width="window.innerWidth / 2"
            />
          </div>
        </div>

        <!-- Tile name. -->
        <v-text-field
          label="Tile name"
          v-model="tile.name"
          @change="modified"
          :counter="56"
          color="accent"
          required
        />
      </div>

      <v-tabs v-model="tab" background-color="transparent" color="accent" grow>
        <v-tab>
          <div :style="Helper.style.app">Options</div>
        </v-tab>
        <v-tab>
          <div :style="Helper.style.app">Functions</div>
        </v-tab>
        <v-tab>
          <div :style="Helper.style.app">Misc</div>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <options
            advanced
            :_image="image"
            :_image_state="tile.image.state"
            :_sound="sound"
            :_sound_state="tile.sound.state"
            :_editing="state.editing"
            :key="tile.image.modified"
          />
        </v-tab-item>

        <v-tab-item>
          <p>Comming soon.</p>
        </v-tab-item>

        <v-tab-item>
          <p>Comming soon.</p>
        </v-tab-item>
      </v-tabs-items>

      <v-btn class="editor-item" block tile color="success" :disabled="!valid" @click="save">Save</v-btn>
      <v-btn
        v-if="state.editing"
        class="editor-item"
        block
        tile
        color="error"
        @click="remove"
      >Remove</v-btn>
      <v-btn class="editor-item" block tile color="error" @click="leave">Cancel</v-btn>
    </v-form>
    <AudioEditor :_file="sound" v-else-if="editor === 1" />
    <image-editor :_file="image" v-else-if="editor === 2" />
    <loading-screen v-if="state.saving" title="Please wait ..."></loading-screen>
  </div>
</template>

<script>
import { Helper, fileSystem, cordovaExists } from "../../main.js";
import * as Common from "./../../../../../common/lib/Library";

import TileComponent from "./Tile";

import AudioEditor from "./AddTile/AudioEditor";
import ImageEditor from "./AddTile/ImageEditor";
import LoadingScreen from "./AddTile/LoadingScreen";
import Options from "./AddTile/AdvancedOptions";

import Uniqid from "uniqid";

export default {
  name: "AddTile",
  data() {
    return {
      
      /**
       * @type {Function}
       */
      Uniqid,
      
      /**
       * @type {Helper}
       */
      Helper,
      
      /**
       * @type {Window}
       */
      window,
      
      /**
       * @type {Number}
       */
      editor: 0,
      
      /**
       * @type {Number}
       */
      tab: 0,
      
      /**
       * @type {Object}
       */
      board: this._board,

      /** 
       * If no tile was set, the user wants to create one.
       * Else the user wants to edit a tile.
       * 
       * @type {Common.Tile}
       */
      tile: this._tile || new Common.Tile(),

      /**
       * @type {Object}
       */
      backgroundColor: {},

      /**
       * @type {Boolean}
       */
      directory: false,

      /**
       * @type {Boolean}
       */
      valid: false,

      /**
       * @type {Object}
       */
      snackbar: {
        
        /**
         * @type {Boolean}
         */
        show: false,
        
        /**
         * @type {String}
         */
        message: "This is so wrong <3"
      },

      /**
       * @type {Object}
       */
      state: {

        /**
         * @type {Boolean}
         */
        saving: false,

        /**
         * @type {Boolean}
         */
        editing: false
      },

      /**
       * @type {Object}
       */
      options: {

        /**
         * @type {Object}
         */
        peekjs: {}
      },

      /**
       * @type {}
       */
      image: null,
      
      /**
       * @type {}
       */
      sound: null,

      /**
       * @type {Array}
       */
      temporary: []
    };
  },
  watch: {
    backgroundColor: function(newColor) {
      this.tile.backgroundColor.r = newColor.rgba.r;
      this.tile.backgroundColor.g = newColor.rgba.g;
      this.tile.backgroundColor.b = newColor.rgba.b;
      this.tile.backgroundColor.a = newColor.rgba.a;

      this.modified();
    },
    directory: function(isDirectory) {
      this.tile.type = isDirectory ? "board" : "tile";
      this.modified();
    }
  },
  updated: function() {
    this.validateForm();
  },
  mounted: async function() {
    window.changingTile = this.tile;

    this.backgroundColor.rgba.r = this.tile.backgroundColor.r;
    this.backgroundColor.rgba.g = this.tile.backgroundColor.g;
    this.backgroundColor.rgba.b = this.tile.backgroundColor.b;
    this.backgroundColor.rgba.a = this.tile.backgroundColor.a;

    if (cordovaExists) {
      let path = this.tile.path;
      let fileExists = false;

      try {
        fileExists = (await fileSystem.exists(path)) !== false;
      } catch (error) {}

      this.state.editing = path && fileExists;
    }

    this.Helper.$on("image.crop", async image => {
      this.image = image;
      this.editor = 2;
    });

    this.Helper.$on("image.prepare", async dataUrl => {
      if (dataUrl === false) {
        this.tile.image.state = "remove";
        this.modified();
        return;
      }

      // Create name to save in the temporary folder.
      let id = `temp/${new Date().getTime()}-image.temp`;

      let b64Details = this.Helper.b64Details(dataUrl);

      // Push into temporary.
      this.temporary.push(id);

      this.tile.image.type = b64Details.type;
      this.tile.image.subtype = b64Details.subtype;
      this.tile.image.state = "prepared";
      this.tile.image.path = id;

      if (cordovaExists) {
        let blob = this.Helper.b64toBlob(
          b64Details.data,
          b64Details.contentType
        );
        await fileSystem.write(id, blob);
      }

      this.editor = 0;
      this.modified();
    });

    this.Helper.$on("image.current.remove", async () => {
      this.tile.image.state = "remove";
      this.modified();
    });

    this.Helper.$on("image.current.crop", async () => {
      try {
        this.image = await fileSystem.toDataURL(this.tile.image.path);
      } catch (error) {
        console.log(error);
        console.warn(
          "Stored image couldn't be loaded as data url.",
          this.tile.image.path
        );
      }
      this.editor = 2;
      this.modified();
    });

    this.Helper.$on("sound.prepare", async dataUrl => {
      if (dataUrl === false) {
        this.tile.sound.state = "remove";
        this.modified();
        return;
      }

      let b64Details = this.Helper.b64Details(dataUrl);
      let extension = this.Helper.Clone(b64Details.subtype);

      if (extension === 'mpeg') {
        extension = 'mp3';
      }

      // Create name to save in the temporary folder.
      let id = `temp/${this.Uniqid()}-sound.${extension}`;

      // Push into temporary.
      this.temporary.push(id);

      this.tile.sound.type = b64Details.type;
      this.tile.sound.subtype = b64Details.subtype;

      this.tile.sound.state = "prepared";
      this.tile.sound.path = id;

      if (cordovaExists) {

        let blob = this.Helper.b64toBlob(
          b64Details.data,
          b64Details.contentType
        );

        // FIXME #001: Somehow the mime type is written as undefined even if mime type was set in the blob itself.
        await fileSystem.write(id, blob);
      } 
      else {

        let blob = this.Helper.b64toBlob(
          b64Details.data,
          b64Details.contentType
        );

        localSystem[id] = blob;
      }

      this.editor = 0;
      this.modified();
    });

    this.Helper.$on("sound.crop", async () => {
      try {

        if (cordovaExists) {
          this.sound = await fileSystem.toDataURL(this.tile.sound.path);
        } 
        else {
          this.sound = await this.Helper.blobtoB64(localSystem[this.tile.sound.path]);
        }
        
        this.sound = this.Helper.b64Details(this.sound);

        // FIXME #001: Somehow the mime type is undefined.
        this.sound.type = this.tile.sound.type;
        this.sound.subtype = this.tile.sound.subtype;
        this.sound.contentType = this.tile.sound.contentType();

        this.sound = this.Helper.b64toBlob(
          this.sound.data,
          this.sound.contentType
        );
      } catch (error) {
        console.log(error);
        console.warn(
          "Stored sound couldn't be loaded as data url / converted to blob.",
          this.tile.sound.path
        );
      }
      this.editor = 1;
      this.modified();
    });

    this.Helper.$on("tile.editor", () => {
      this.editor = 0;
    });
  },
  destroyed: async function() {
    await this.cleanTemporary();
  },
  props: {
    _board: Common.Tile,
    _tile: Common.Tile | Boolean
  },
  components: {
    LoadingScreen,
    TileComponent,
    AudioEditor,
    ImageEditor,
    Options
  },
  methods: {
    cleanTemporary: async function() {
      if (!cordovaExists) return;

      // Cleanup temporary files.
      for (let i = 0; i < this.temporary.length; i++) {
        const file = this.temporary[i];

        // Check if file exists.
        if (await fileSystem.exists(file)) {
          // Remove file
          await fileSystem.remove(file);
        }
      }

      this.temporary = [];
    },

    validateForm: function() {
      if ("addtile" in this.$refs) {
        try {
          this.$refs.addtile.validate();
        } catch (error) {}
      }
    },
    trimAudio: function() {
      this.editor = 1;
    },
    trimImage: function() {
      this.editor = 2;
    },

    modified: function() {
      this.tile.modified = new Date().getTime();
    },

    isValid: function(item, rules) {
      for (let i = 0; i < rules.length; i++) {
        if (typeof rules[i](item) === "string") {
          return false;
        }
      }
      return true;
    },

    /**
     * Saves the current files.
     */
    save: async function() {
      this.state.saving = true;

      let entitiesInDir;

      // Create a new tile.
      if (this.tile.type === "board") {
        entitiesInDir = await fileSystem.list(this.board.pathTo());

        this.tile.id = "board";

        if (!this.state.editing) {
          this.tile.path = `${this.board.pathTo()}/${this.Uniqid()}/${
            this.tile.id
          }.json`;
        }
      }

      // Create a new tile.
      else if (this.tile.type === "tile" || this.tile.type === "") {
        if (!this.tile.type) {
          this.tile.type = "tile";
        }

        if (!this.state.editing) {
          this.tile.id = this.Uniqid();
          this.tile.path = `${this.board.pathTo()}/${this.tile.id}.json`;
        }
      }

      // Check if image was set.
      if (this.tile.image.state === "prepared") {
        let newImagePath = `${this.tile.pathTo()}/images/${this.tile.id}.${
          this.tile.image.subtype
        }`;

        // Move the image from the temporary folder to the desired directory.
        await fileSystem.move(this.tile.image.path, newImagePath);
        this.tile.image.path = newImagePath;
        this.tile.image.state = "stored";
      }

      if (this.tile.image.state === "remove") {
        try {
          if (this.tile.image.path) {
            await fileSystem.remove(this.tile.image.path);
          }
        } catch (error) {}

        this.tile.image = new Common.Image();
      }

      // Check if image was set.
      if (this.tile.sound.state === "prepared") {

        let ending = this.Helper.Clone(this.tile.sound.subtype);
        if (ending === "mpeg") {
          ending = "mp3";
        }

        let newSoundPath = `${this.tile.pathTo()}/sounds/${this.tile.id}.${
          ending
        }`;

        // Move the image from the temporary folder to the desired directory.
        await fileSystem.move(this.tile.sound.path, newSoundPath);
        this.tile.sound.path = newSoundPath;
        this.tile.sound.state = "stored";
      }

      if (this.tile.sound.state === "remove") {
        try {
          if (this.tile.sound.path) {
            await fileSystem.remove(this.tile.sound.path);
          }
        } catch (error) {}

        this.tile.sound = new Common.Sound();
      }

      try {
        // Create this path.
        await fileSystem.ensure(this.tile.pathTo());

        // Save this tile.
        await fileSystem.create(this.tile.path);
        await fileSystem.write(this.tile.path, this.tile.toJson());

        console.warn(this.tile);
        console.warn(this.tile.path);
      } catch (error) {
        console.log(error);
        console.warn(`${this.tile.type} could not be saved.`, this.tile.path);
      }

      this.state.saving = false;
      this.Helper.$emit("tile.edit.leave");
    },

    remove: async function() {
      if (!cordovaExists) {
        return;
      }

      this.state.saving = true;

      if (this.tile.image.state === "stored") {
        await fileSystem.remove(this.tile.image.path);
      }

      if (this.tile.type === "tile") {
        await fileSystem.remove(this.tile.path);
      } else if (this.tile.type === "board") {
        await fileSystem.removeDir(this.tile.pathTo());
      }

      this.state.saving = false;
      this.Helper.$emit("tile.edit.leave");
    },

    /**
     * A function to leave the tile editor.
     */
    leave: function() {
      this.Helper.$emit("tile.edit.leave");
    }
  }
};
</script>

<style lang="scss">
.add-tile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .add-tile-directory-switch {
    margin-top: 0;
  }

  .audio-editor-item {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .v-form {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 50px;

    div > h2 {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid;
      font-weight: initial;
      padding-bottom: 5px;
    }

    .add-tile-simplified {
      .add-tile-simplified-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
      }
    }
  }

  .editor-item {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>