Module => {
    const component = {
        name: 'S-ImageEditor',
        template:
            '<div class="tile-image-editor mb-5 px-2">' +
            '    <div>' +
            '      <img id="tile-image" :src="image" @load="loaded" />' +
            '    </div>' +
            '    <v-btn class="image-editor-item" outlined :loading="loading" block tile color="success" @click="apply">Apply</v-btn>' +
            '  </div>',
        props: {

            /**
             * @description Render element. Usually an array with key value pairs for options.
             */
            renderElement: Object,

            /**
             * @description Element key. The key provided to map submitted values.
             */
            element: String,
        },
        data() {
            return {
                title: "",
                description: "",
                value: [],
                cropper: null,
                image: null,
                files: [],
                to: undefined,
                loading: false,
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

            // Exit if empty.
            if (!this.files.length) {
                return;
            }

            try {
                this.image = URL.createObjectURL(this.files[0]);
            } catch (error) {
                console.log(error);
                console.warn("Object url could not be read.");
            }
        },
        methods: {
            submit: function () {
                if (!('params' in this.to)) {
                    this.to.params = {};
                }

                this.to.params = Object.assign(
                    this.to.params,
                    this.$route.params
                );
                this.loading = false;
                this.$router.push(this.to)
            },
            apply: function () {
                if (!this.cropper) {
                    return;
                }
                this.loading = true;

                this.cropper.getCroppedCanvas({
                    maxWidth: 4096,
                    maxHeight: 4096,
                    fillColor: "#fff",
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: "high"
                });

                this.cropper.getCroppedCanvas().toBlob(blob => {
                    this.value = [
                        new File([blob], `edited_image.${Date.now()}`)
                    ];

                    this.$route.params[this.element] = this.value;
                    this.submit();
                }, 'image/png', 100);
            },
            loaded: function () {
                this.cropper = new Cropper(document.querySelector("#tile-image"), {
                    aspectRatio: 1,
                    viewMode: 1,
                    autoCrop: true
                });
            }
        }
    };

    Module.appendStyle(`src/elements/css/Image.css`, component.name);

    return component;
};