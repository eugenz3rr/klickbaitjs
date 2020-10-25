Module => {
  const component = {
    name: 'S-Switch',
    template:
        '<v-switch\n' +
        '      v-model="value"\n' +
        '      :label="title"\n' +
        '      :hint="description"\n' +
        '      :persistent-hint="persistentHint"/>',
    props: {

      /**
       * @description Render element. Usually an array with key value pairs for options.
       */
      renderElement: Object,

      /**
       * @description Element key. The key provided to map submitted values.
       */
      element: String,

      /**
       * @description Form id to identify events.
       */
      region: Object,
    },
    data() {
      return {
        value: false,
        title: "",
        description: "",
        persistentHint: true,
      };
    },
    mounted: async function () {

      // Iterate trough all items and set them.
      const keys = Object.keys(this.renderElement);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.renderElement[key];
        const dataKey = key.replace('#', '');

        // Check if data is mappable.
        if (!this.hasOwnProperty(dataKey)) {
          continue;
        }

        // Check if element is empty.
        if (!value || value === false || value === undefined || value === null) {
          continue;
        }

        // Set the new value.
        this[key.replace('#', '')] = value;
      }

      const info = this.region.regionRaw.info;

      Module.emit(`register.receive.${info.id}`);

      Module.on(`submit.event.${info.id}`, () => {
        Module.emit(`submit.receive.${info.id}`, {
          key: this.element,
          value: this.value
        });
      });
    },
  };

  function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    style.setAttribute('data-module', component.name);
    document.head.append(style);
  }
  Module.appendStyle(`src/elements/css/Switch.css`, component.name);

  Module.appendStyle(`
  div.v-input--switch {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  div.v-input--switch > .v-input__control > .v-input__slot {
    background-color: var(--background) !important;
  }
  
  div.v-input--switch > .v-input__control > .v-input__slot label.v-label,
    div.v-input--switch > .v-input__control div.v-messages {
    color: var(--font) !important;
  }
  
  div.v-input--switch > .v-input__control > .v-input__slot button.v-icon,
  div.v-input--switch > .v-input__control > .v-input__slot .primary--text {
    color: var(--accent) !important;
    border-color: var(--accent) !important;
  }`);

  return component;
};
