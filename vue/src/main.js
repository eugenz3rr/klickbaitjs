const configuration = require('../../core/Configuration/configuration.json');

// Main application.
import VueRouter from 'vue-router';
import EventManager from "vue-event-manager";

// Import Components.
import App from './App.vue';
import Vue from "vue";
import Vuetify from "vuetify/dist/vuetify.min";
import Vue2TouchEvents from 'vue2-touch-events';;

Vue.use(Vuetify);
Vue.use(Vue2TouchEvents);
Vue.use(VueRouter);
Vue.use(EventManager);

let start = async () => {

  window.configuration = configuration;
  const Manager = window.Manager;

  const router = new VueRouter({});
  window.router = router;

  let Route = await Manager.eventManager.fire('core.route', {
    Manager,
  });

  let colors = await Manager.eventManager.fire('core.colors', {
    Manager,
  });

  let keys = Object.keys(colors);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let color = colors[key];

    document.documentElement.style.setProperty(key, color.value);
  }

  Vue.component('route', Route);

  // Register routes in the vue-router.
  for (let i = 0; i < Manager.routeManager.routes.length; i++) {
    const route_object = Manager.routeManager.routes[i];

    let route = {
      name: route_object.id,
      path: route_object.path,
      component: Route,
      props: {
        default: true,
        route: route_object,
      },
      params: {}
    };

    // Provide a solution to remove unwanted routes.
    let altered_route;

    // First all because that's less specific.
    altered_route = await Manager.eventManager.fire(`core.route.alter`, {
      Manager,
      Route: route
    });

    // The specific form is more important it overrides the less specific one.
    altered_route = await Manager.eventManager.fire(`core.route.${route.id}.alter`, {
      Manager,
      Route: route
    });

    if (
      altered_route !== undefined ||
      altered_route
    ) {
      route = altered_route;
    }

    router.addRoute(route);
  }

  new Vue({
    el: '#klickbait-js',
    vuetify: new Vuetify({
      icons: {
        iconfont: 'md',
      },
      theme: {
        disable: true
      },
    }),
    router,
    render: h => h(App),
  });
};

window.addEventListener('klickbait-ready', async () => {
  document.addEventListener('backbutton', e => {
    e.preventDefault();
  }, false);

  await window.Manager.initialize();
  await start();
  await window.Manager.eventManager.fire(`core.route.init`, {
    Manager: window.Manager,
    Router: window.router
  });
}, false);