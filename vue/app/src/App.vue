<template>
  <v-app id="advanced-soundboard">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "AdvancedSoundboard",
  data() {
    return {
      Helper,
    };
  },
  mounted: function() {
  },
  components: {}
};
</script>

<style lang="scss">

@import "scss/cropper";
@import "scss/custom";

* {
  font-family: "OpenLight", sans-serif;
}
//.best {
//  z-index: 99999;
//}
#advanced-soundboard {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  @import "./vuetify.min.css";
}
</style>
