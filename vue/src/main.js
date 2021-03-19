// Main application.
import VueRouter from 'vue-router';
import EventManager from "vue-event-manager";

// Import Components.
import App from './App.vue';
import Vue from "vue";
import Vuetify from "vuetify/dist/vuetify.min";
//import VueI18n from 'vue-i18n';
import Vue2TouchEvents from 'vue2-touch-events';
import Cropper from "cropperjs";
import * as Common from "../../common/lib/Library";
//import * as Draggable from "@shopify/draggable";

window.Cropper = Cropper;
//window.Draggable = Draggable;

Vue.use(Vuetify);
//Vue.use(VueI18n);
Vue.use(Vue2TouchEvents);
Vue.use(VueRouter);
Vue.use(EventManager);

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
    window.router = router;

    let Route = await Manager.eventManager.fire('core.route', {
        Manager,
    });

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
            theme: { disable: true },
        }),
        router,
        render: h => h(App),
    });
};

window.deviceready = false;

window.addEventListener('klickbait-ready', async () => {
    document.addEventListener('backbutton', e => {
        e.preventDefault();
    }, false );

    window.Manager = new Common.Manager({
        fileSystem: window.Configuration.publicFileSystem,
        privateSystem: window.Configuration.privateFileSystem,
        applicationSystem: window.Configuration.applicationFileSystem,
    });
    await window.Manager.initialize();
    window.deviceready = true;
    await start();
    await Manager.eventManager.fire(`core.route.init`, {
        Manager,
        Router: router
    });
}, false);