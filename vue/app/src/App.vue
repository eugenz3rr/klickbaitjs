<template>
  <v-app id="advanced-soundboard">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "AdvancedSoundboard"
};
</script>

<style lang="scss">

@import "scss/cropper";
@import "scss/custom";

* {
  font-family: "OpenLight", sans-serif;
}

#advanced-soundboard {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
}

@import "./vuetify.min.css";

</style>
