(() => {
  return {
    "core.route": async context => {
      let components = {};

      const data = window.Manager.componentManager.getAll();
      for (let i = 0; i < data.length; i++) {
        const component = data[i];
        components[`as-${component.id}`] = component.getComponent();
      }

      return {
        name: "Route",
          template:
        '<v-sheet>' +
        '  <component v-for="(region, index) in route.regionManager.regions"' +
        '             :is="`as-${region.type}`"' +
        '             :route="route"' +
        '             :region="region"' +
        '             :key="`region-${index}-${region.type}-${route.path}-${changed}`"' +
        '             :style="{' +
        '               order: index' +
        '              }"/>' +
        '</v-sheet>',
          data() {
        return {
          drawer: false,
          renderRegions: [],
          changed: 0
        };
      },
        mounted: function () {
        },
        props: {
          route: Object,
        },
        watch: {
          $route: async function (to, from) {
            this.changed = Date.now();
          }
        },
        components
      };
    },
    "core.colors": async context => {
      return {
        '--background-primary': {
          name: 'Primary Background',
          value: '#2c3e50'
        },
        '--background-secondary': {
          name: 'Secondary Background',
          value: '#34495e'
        },
        '--background-tertiary': {
          name: 'Tertiary Background',
          value: '#7f8c8d'
        },
        '--icon': {
          name: 'Icon',
          value: '#ecf0f1'
        },
        '--string': {
          name: 'String',
          value: '#ecf0f1'
        },
        '--accent': {
          name: 'Accent',
          value: '#ecf0f1'
        },
        '--status-neutral': {
          name: 'Neutral Status',
          value: '#2980b9'
        },
        '--status-info': {
          name: 'Info Status',
          value: '#f1c40f'
        },
        '--status-warning': {
          name: 'Warning Status',
          value: '#e67e22'
        },
        '--status-error': {
          name: 'Error Status',
          value: '#d35400'
        },
      };
    },
  };
})();