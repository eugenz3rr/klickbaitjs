<template>
  <div id="main-toolbar" :style="{
      backgroundColor: Helper.themes.light.secondary
    }">
    <v-toolbar>
      <v-btn icon @click="back"><v-icon>keyboard_backspace</v-icon></v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="addTile"><v-icon>add</v-icon></v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import { Helper } from './main.js';

  export default {
    name: 'MainToolbar',
    data() {
      return {
        Helper,
      }
    },
    methods: {
      back: function() {
        Helper.$emit('tile.back');
      }
    }
  }
</script>

<style lang="scss">
  #main-toolbar {
    grid-area: main-toolbar;
  }

</style>
