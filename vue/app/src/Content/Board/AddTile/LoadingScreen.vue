<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card color="primary">
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <v-progress-circular indeterminate color="accent"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      dialog: true
    };
  },
  props: {
    title: String
  }
};
</script>

<style>
</style>