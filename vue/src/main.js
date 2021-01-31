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

    const Route = (() => {
        const components = {};
        if (window.deviceready) {
            const data = window.Manager.componentManager.getAll();
            for (let i = 0; i < data.length; i++) {
                const component = data[i];
                components[`as-${component.id}`] = component.getComponent();
            }
        }

        let component = {
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

        return component;
    })();

    Vue.component('route', Route);

    // Register routes in the vue-router.
    for (let i = 0; i < Manager.routeManager.routes.length; i++) {
        const route = Manager.routeManager.routes[i];

        router.addRoute({
            name: route.id,
            path: route.path,
            component: Route,
            props: {
                default: true,
                route,
            },
            params: {}
        });
    }

    new Vue({
        el: '#klickbait-js',
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
window.deviceready = false;

window.addEventListener('klickbait-ready', async () => {
    document.addEventListener('backbutton', function (e) {
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
}, false);