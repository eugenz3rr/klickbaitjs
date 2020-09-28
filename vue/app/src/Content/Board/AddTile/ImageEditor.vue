<template>
  <div class="tile-image-editor">
    <h2>Crop Image</h2>
    <div>
      <img id="tile-image" :src="image" @load="loaded" />
    </div>
    <v-btn class="image-editor-item" block tile color="success" @click="cropImage">Crop</v-btn>
    <v-btn class="image-editor-item" block tile color="error" @click="leave">Cancel</v-btn>
  </div>
</template>

<script>
import { Helper, fileSystem, cordovaExists } from "./../../../main.js";
import Cropper from "cropperjs";

export default {
  name: "ImageEditor",
  data() {
    return {
      Helper,
      cropper: null,
      image: null
    };
  },
  props: {
    _file: File | String
  },
  watch: {},
  mounted: function() {

    if (typeof this._file === 'string') {
      this.image = this._file;
    }
    else {
      try {
        this.image = URL.createObjectURL(this._file);
      } 
      catch (error) {
       console.log(error);
       console.warn("Object url could not be read.");   
      }
    }
  },
  methods: {
    cropImage: function() {
      if (this.cropper) {
        this.cropper.getCroppedCanvas({
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: "#fff",
          imageSmoothingEnabled: false,
          imageSmoothingQuality: "high"
        });

        this.Helper.$emit("image.prepare", this.cropper.getCroppedCanvas().toDataURL('image/png'));
      }
    },
    loaded: function() {
      this.cropper = new Cropper(document.querySelector("#tile-image"), {
        aspectRatio: 1,
        viewMode: 1,
        autoCrop: true
      });
    },
    leave: function() {
      this.Helper.$emit("tile.editor");
    }
  }
};
</script>

<style lang="scss">
.tile-image-editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 50px;

  #tile-image {
    display: block;
    max-width: 100%;
  }
  .image-editor-item {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  > h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid;
    font-weight: initial;
    padding-bottom: 5px;
  }
}
</style>