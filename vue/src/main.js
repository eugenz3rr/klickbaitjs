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
                '<v-sheet>\n' +
                '\n' +
                '  <!--  Global element.  -->\n' +
                '  <v-toolbar>\n' +
                '    <v-btn icon @click="drawer = !drawer">\n' +
                '      <v-icon>menu</v-icon>\n' +
                '    </v-btn>\n' +
                '\n' +
                '    <v-spacer></v-spacer>\n' +
                '  </v-toolbar>\n' +
                '\n' +
                '  <!--\n' +
                '    TODO: Make this generic or at least add the possibility to alter the display.\n' +
                '\n' +
                '    I want this part only to have pages and the logged in google user.\n' +
                '   -->\n' +
                '  <v-navigation-drawer\n' +
                '      v-model="drawer"\n' +
                '      absolute>\n' +
                '    <v-list dense nav>\n' +
                '\n' +
                '      <!--\n' +
                '        FIXME: This item should be in another module.\n' +
                '        google_login module?\n' +
                '      -->\n' +
                '      <v-list-item>\n' +
                '        <v-list-item-avatar>\n' +
                '        </v-list-item-avatar>\n' +
                '\n' +
                '        <v-list-item-content>\n' +
                '          <v-list-item-title>Development</v-list-item-title>\n' +
                '          <v-list-item-subtitle>In development</v-list-item-subtitle>\n' +
                '        </v-list-item-content>\n' +
                '      </v-list-item>\n' +
                '\n' +
                '      <v-divider></v-divider>\n' +
                '\n' +
                '      <!-- Lists items. -->\n' +
                '      <v-subheader>PAGES</v-subheader>\n' +
                '      <v-list-item\n' +
                '          v-for="route in route.module.moduleManager.manager.routeManager.routes"\n' +
                '          :key="route.title"\n' +
                '          v-if="!route.hide"\n' +
                '          link\n' +
                '          :to="{\n' +
                '            name: route.id,\n' +
                '            params: route.params\n' +
                '          }">\n' +
                '        <v-list-item-icon v-if="route.fallback(route, \'icon\', false)">\n' +
                '          <v-icon>{{ route.icon }}</v-icon>\n' +
                '        </v-list-item-icon>\n' +
                '\n' +
                '        <v-list-item-content>\n' +
                '          <v-list-item-title>{{ route.title }}</v-list-item-title>\n' +
                '          <v-list-item-subtitle>{{ route.description }}</v-list-item-subtitle>\n' +
                '        </v-list-item-content>\n' +
                '      </v-list-item>\n' +
                '    </v-list>\n' +
                '  </v-navigation-drawer>\n' +
                '  <component v-for="(region, index) in route.regionManager.regions"\n' +
                '             :is="`as-${region.type}`"\n' +
                '             :route="route"\n' +
                '             :region="region"\n' +
                '             :key="`region-${index}-${region.type}-${route.path}-${changed}`"\n' +
                '             :style="{\n' +
                '               order: index\n' +
                '              }"/>\n' +
                '</v-sheet>\n' +
                '</template>',
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

    // Default page.
    await router.push({
        name: 'core.board',
        params: {
            pathMatch: '/soundboard/',
        }
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

// if (!cordovaExists) {
//     window.Manager.initialize().then(async () => {
//         window.deviceready = true;
//         await start();
//     });
// }