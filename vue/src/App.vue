<template>
  <v-app id="klickbait-js">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "AdvancedSoundboard"
};
</script>

<style lang="scss">

:root {

  --background-primary: #2c3e50;
  --background-secondary: #34495e;
  --background-tertiary: #7f8c8d;

  --icon: #ecf0f1;
  --string: #ecf0f1;
  --accent: #ecf0f1;

  --status-neutral: #2980b9;
  --status-info: #f1c40f;
  --status-warning: #e67e22;
  --status-error: #d35400;
}

$color-pack: false;

@import "scss/cropper";
@import "scss/custom";

* {
  font-family: "OpenLight", sans-serif;
}

#klickbait-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
}

@import "~vuetify/dist/vuetify.min.css";
</style>
