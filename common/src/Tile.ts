import Color, { JsonColor } from './Tile/Color';
import Image, { JsonImage } from './Tile/Image';
import Sound, { JsonSound } from './Tile/Sound';

export interface JsonTile {
  id: string;
  path: string;
  name: string;
  type: string;
  modified: Number;
  colors: {
    background: JsonColor;
    font: JsonColor;
  }
  image: JsonImage;
  sound: JsonSound
}

export default class Tile {

  /**
   * @description A unique id ... well to identify.
   * @type {string} 
   */
  public id: string = "";

  /**
   * @description The actual path to this tile including the tile name.
   * @type {string}
   */
  public path: string = "";

  /**
   * @description A custom name for this tile.
   * @type {string}
   */
  public name: string = "";

  /**
   * @description Define the type of this tile.
   * @type {"board" | "tile"}
   */
  public type: string = "";

  /**
   * @description Define the types which are available.
   * @type {Array<String>}
   */
  public types: string[] = ["board", "tile"];

  /**
   * @description The background color of this tile.
   * @type {Color}
   */
  public backgroundColor: Color = new Color();

  /**
   * @description The font color of this tile. 
   * @type {Color}
   */
  public fontColor: Color = new Color();

  /**
   * @description Shows the last modification of the tile.
   * @type {Number}
   */
  public modified: Number = 0;

  /**
   * @description The image of the current tile. (Overrides the background color.)
   * @type {Image} 
   */
  public image: Image = new Image();

  /**
   * @description The sound of the current tile.
   * @type {Sound} 
   */
  public sound: Sound = new Sound();

  constructor() {}

  /**
   * @returns Returns this tile as JSON. Can be used to store the current tile.
   */
  public toJson = (): JsonTile => {
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
  public pathTo = (): string => {
    let pathAsArray: string[] = this.path.split('/');
    pathAsArray.pop();
    return pathAsArray.join('/');
  };

  /**
   * @returns Returns the current path to the directory which the current directory is located at. 
   */
  public pathBefore = (): string => {
    let pathAsArray: string[] = this.pathTo().split('/');
    pathAsArray.pop();
    return pathAsArray.join();
  };
}