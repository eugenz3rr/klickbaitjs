// Main application.
import VueRouter from 'vue-router';
import Route from "./Route";
import * as Common from "./../../../common/lib/Library";

// Import Components.
import App from './App.vue';
import Vue from "vue";
import Vuetify from "vuetify/dist/vuetify";
import VueI18n from 'vue-i18n';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(Vue2TouchEvents);
Vue.use(VueRouter);

Vue.component('route', Route);

export let Helper;

/** @type {Settings} */
let settings = null;

let start = async () => {
    // settings = new Common.Settings(fileSystem);
    // await settings.load();
    //
    // let theme = settings.theme();
    // window.settings = settings;

    // Set Helper vue instance.
    /** @type {Vue} */
    // Helper = new Vue({
    //     data: {
    //         settings,
    //         location: "Home",
    //
    //         // Updates per second.
    //         UPS: 10,
    //         style: {
    //             app: {
    //                 background: theme.background,
    //                 color: theme.font,
    //                 borderColor: theme.font
    //             },
    //         },
    //         changed: {
    //             audio: null,
    //         },
    //         sensitivity: {
    //             longpress: 300
    //         },
    //     },
    //     methods: {
    //         forceColor: function () {
    //
    //             // FIXME: Find a other way to fix this color issue.
    //             const icons = document.querySelectorAll('i.v-icon');
    //
    //             for (let i = 0; i < icons.length; i++) {
    //                 const icon = icons[i];
    //                 icon.classList.add('accent--text');
    //             }
    //
    //             const slider_thumb_labels = document.querySelectorAll('.v-slider__thumb-label > div > span');
    //
    //             for (let i = 0; i < slider_thumb_labels.length; i++) {
    //                 const slider_thumb_label = slider_thumb_labels[i];
    //                 slider_thumb_label.classList.add('font--text');
    //             }
    //
    //         },
    //
    //         Clone: function (item) {
    //             return JSON.parse(JSON.stringify(item));
    //         },
    //
    //         loadTile: async function (path) {
    //             /** @type {JsonTile} */
    //             let tileJson = await fileSystem.exists(path);
    //
    //             /** @type {Tile} */
    //             let tile;
    //
    //             if (tileJson !== false) {
    //                 tileJson = await fileSystem.readJSON(path);
    //
    //                 try {
    //
    //                     /** @type {Tile} */
    //                     tile = new Common.Tile();
    //
    //                     tile.id = tileJson.id;
    //                     tile.path = tileJson.path;
    //                     tile.name = tileJson.name;
    //                     tile.type = tileJson.type;
    //
    //                     tile.backgroundColor.r = tileJson.colors.background.r;
    //                     tile.backgroundColor.g = tileJson.colors.background.g;
    //                     tile.backgroundColor.b = tileJson.colors.background.b;
    //                     tile.backgroundColor.a = tileJson.colors.background.a;
    //
    //                     tile.fontColor.r = tileJson.colors.font.r;
    //                     tile.fontColor.g = tileJson.colors.font.g;
    //                     tile.fontColor.b = tileJson.colors.font.b;
    //                     tile.fontColor.a = tileJson.colors.font.a;
    //
    //                     tile.image.type = tileJson.image.type;
    //                     tile.image.subtype = tileJson.image.subtype;
    //                     tile.image.state = tileJson.image.state;
    //                     tile.image.path = tileJson.image.path;
    //                     tile.image.size.width = tileJson.image.size.width;
    //                     tile.image.size.height = tileJson.image.size.height;
    //
    //                     tile.sound.type = tileJson.sound.type;
    //                     tile.sound.subtype = tileJson.sound.subtype;
    //                     tile.sound.state = tileJson.sound.state;
    //                     tile.sound.path = tileJson.sound.path;
    //                     tile.sound.volume = tileJson.sound.volume;
    //                 }
    //                 catch (error) {
    //                     console.warn(error);
    //                     console.log("Tile is not readable or is outdated.", path);
    //                     return false;
    //                 }
    //                 return tile;
    //             }
    //             else {
    //                 return false;
    //             }
    //         },
    //
    //         b64toBlob: function (b64Data, contentType, sliceSize) {
    //             contentType = contentType || '';
    //             sliceSize = sliceSize || 512;
    //
    //             var byteCharacters = atob(b64Data);
    //             var byteArrays = [];
    //
    //             for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //                 var slice = byteCharacters.slice(offset, offset + sliceSize);
    //
    //                 var byteNumbers = new Array(slice.length);
    //                 for (var i = 0; i < slice.length; i++) {
    //                     byteNumbers[i] = slice.charCodeAt(i);
    //                 }
    //
    //                 var byteArray = new Uint8Array(byteNumbers);
    //
    //                 byteArrays.push(byteArray);
    //             }
    //
    //             return new Blob(byteArrays, {type: contentType});
    //         },
    //
    //         blobtoB64: async function (blob) {
    //             let reader = new FileReader();
    //             let result;
    //
    //             await new Promise(resolve => {
    //                 reader.onload = () => {
    //                     result = reader.result;
    //                     resolve();
    //                 };
    //
    //                 reader.readAsDataURL(blob);
    //             });
    //
    //             return result;
    //         },
    //
    //         b64toFile: function (dataurl, filename) {
    //
    //             var arr = dataurl.split(','),
    //                 mime = arr[0].match(/:(.*?);/)[1],
    //                 bstr = atob(arr[1]),
    //                 n = bstr.length,
    //                 u8arr = new Uint8Array(n);
    //
    //             while (n--) {
    //                 u8arr[n] = bstr.charCodeAt(n);
    //             }
    //
    //             return new File([u8arr], filename, {type: mime});
    //         },
    //
    //         b64Details: function (b64) {
    //             let b64Data = b64.split(',');
    //
    //             let contentType = b64Data[0].split(';')[0].split(':')[1];
    //             let type = contentType.split('/')[0];
    //             let subtype = contentType.split('/')[1];
    //             let data = b64Data[1];
    //
    //             const newVar = {
    //                 contentType,
    //                 type,
    //                 subtype,
    //                 data
    //             };
    //             return newVar;
    //         },
    //         colors: function () {
    //             theme = settings.theme();
    //             this.$emit('theme.change', theme);
    //             this.style.app = {
    //                 background: theme.background,
    //                 color: theme.font,
    //                 borderColor: theme.font,
    //             };
    //         },
    //     }
    // });

    Helper = new Vue({
        data() {
            return {};
        }
    });

    window.settings = settings;
    window.Helper = Helper;
    const Manager = window.Manager;

    const router = new VueRouter({});

    // Register routes in the vue-router.
    for (let i = 0; i < Manager.routeManager.routes.length; i++) {
        const route = Manager.routeManager.routes[i];

        router.addRoutes([
            {
                path: route.path,
                component: Route,
                props: {
                    route: route
                }
            }
            ]);
        }

        const defaultPath = "/core/board";

        // Default page.
        if (router.currentRoute.path !== defaultPath) {
            //router.push('/core/board');
        }


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