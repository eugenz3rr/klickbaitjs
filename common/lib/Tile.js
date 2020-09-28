import Color from './Tile/Color';
import Image from './Tile/Image';
import Sound from './Tile/Sound';
export default class Tile {
    constructor() {
        /**
         * @description A unique id ... well to identify.
         * @type {string}
         */
        this.id = "";
        /**
         * @description The actual path to this tile including the tile name.
         * @type {string}
         */
        this.path = "";
        /**
         * @description A custom name for this tile.
         * @type {string}
         */
        this.name = "";
        /**
         * @description Define the type of this tile.
         * @type {"board" | "tile"}
         */
        this.type = "";
        /**
         * @description Define the types which are available.
         * @type {Array<String>}
         */
        this.types = ["board", "tile"];
        /**
         * @description The background color of this tile.
         * @type {Color}
         */
        this.backgroundColor = new Color();
        /**
         * @description The font color of this tile.
         * @type {Color}
         */
        this.fontColor = new Color();
        /**
         * @description Shows the last modification of the tile.
         * @type {Number}
         */
        this.modified = 0;
        /**
         * @description The image of the current tile. (Overrides the background color.)
         * @type {Image}
         */
        this.image = new Image();
        /**
         * @description The sound of the current tile.
         * @type {Sound}
         */
        this.sound = new Sound();
        /**
         * @returns Returns this tile as JSON. Can be used to store the current tile.
         */
        this.toJson = () => {
            return {
                id: this.id,
                path: this.path,
                name: this.name,
                type: this.type,
                modified: new Date().getTime(),
                colors: {
                    background: this.backgroundColor.toJson(),
                    font: this.fontColor.toJson(),
                },
                image: this.image.toJson(),
                sound: this.sound.toJson()
            };
        };
        /**
         * @returns Returns the current path to the directory which the current tile is located at.
         */
        this.pathTo = () => {
            let pathAsArray = this.path.split('/');
            pathAsArray.pop();
            return pathAsArray.join('/');
        };
        /**
         * @returns Returns the current path to the directory which the current directory is located at.
         */
        this.pathBefore = () => {
            let pathAsArray = this.pathTo().split('/');
            pathAsArray.pop();
            return pathAsArray.join();
        };
    }
}
