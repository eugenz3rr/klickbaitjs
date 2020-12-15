// Main application.
import VueRouter from 'vue-router';
import Route from "./Route";
import EventManager from "vue-event-manager";

// Import Components.
import App from './App.vue';
import Vue from "vue";
import Vuetify from "vuetify/dist/vuetify.min";
//import VueI18n from 'vue-i18n';
//import Vue2TouchEvents from 'vue2-touch-events';
import Cropper from "cropperjs";
//import * as Draggable from "@shopify/draggable";

window.Cropper = Cropper;
//window.Draggable = Draggable;

Vue.use(Vuetify);
//Vue.use(VueI18n);
//Vue.use(Vue2TouchEvents);
Vue.use(VueRouter);
Vue.use(EventManager);

Vue.component('route', Route);

export let Helper;

/** @type {Settings} */
let settings = null;

let start = async () => {
    Helper = new Vue({
        data() {
            return {};
        }
    });

    window.settings = settings;
    window.Helper = Helper;
    const Manager = window.Manager;

    const router = new VueRouter({});
    console.debug(Manager.routeManager.routes)

    // Register routes in the vue-router.
    for (let i = 0; i < Manager.routeManager.routes.length; i++) {
        const route = Manager.routeManager.routes[i];

        router.addRoutes([{
            name: route.id,
            path: route.path,
            component: Route,
            props: {
                default: true,
                route,
            },
            params: {}
        }]);
    }

    // Default page.
    //await router.push({ name: 'core.board'});

    new Vue({
        el: '#advanced-soundboard',
        vuetify: new Vuetify({
            icons: {
                iconfont: 'md',
            },
            theme: {
                themes: {
                    light: {},
                }
            },
        }),
        router,
        render: h => h(App),
    });
};

const cordovaExists = window.cordovaExists;

document.addEventListener('deviceready', async () => {
    window.deviceready = true;

    await start();
}, false);

if (!cordovaExists) {
    start().then(() => {}).catch(() => {});
}