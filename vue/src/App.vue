<template>
  <v-app id="klickbait-js">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "Klickbait"
};
</script>

<style lang="scss">

@import "~vuetify/dist/vuetify.min.css";
@import "scss/cropper";
@import "scss/custom";

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

* {
  font-family: "OpenLight", sans-serif;
}

#klickbait-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.v-icon.material-icons {
  color: var(--icon) !important;
}

.theme--light {
  &.v-card .v-card__subtitle,
  &.v-card > .v-card__text,
  &.v-btn,
  &.v-input,
  &.v-input input,
  &.v-input textarea,
  &.v-list-item,
  .v-btn__content,
  .v-select .v-select__selection--comma,
  .v-list-item .v-list-item__subtitle,
  .v-list-item .v-list-item__title {
    color: var(--string);
  }

  &.v-expansion-panels .v-expansion-panel {
    background-color: var(--background-primary);
    color: var(--string);
  }

  &.v-application,
  &.v-sheet {
    background-color: var(--background-primary);
    border-color: var(--accent);
    color: var(--string);
  }

  &.v-color-picker {
    span {
      color: var(--string);
    }

    .v-color-picker__input input {
      color: var(--string);
      border-color: var(--string);
    }
  }
}
</style>
