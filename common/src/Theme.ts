import Color, {JsonColor} from "./Tile/Color";

export interface JsonTheme {
  name: string;
  editable: boolean;

  primary: JsonColor;
  secondary: JsonColor;
  font: JsonColor;
  background: JsonColor,
  accent: JsonColor;
  error: JsonColor;
  info: JsonColor;
  success: JsonColor;
  warning: JsonColor;
}

export interface JsonToTheme {
  primary: string;
  secondary: string;
  font: string;
  background: string,
  accent: string;
  error: string;
  info: string;
  success: string;
  warning: string;
}

export default class Theme {
  public primary: Color = new Color(25, 118, 210, 1); // #1976D2
  public secondary: Color = new Color(66, 66, 66, 1); // #424242
  public font: Color = new Color(0, 0, 0, 1); // #000000
  public background: Color = new Color(255, 255, 255, 1);
  public accent: Color = new Color(130, 177, 255, 1); // #82b1ff
  public error: Color = new Color(255, 82, 82, 1); // #FF5252
  public info: Color = new Color(33, 150, 243, 1); // #2196F3
  public success: Color = new Color(76, 175, 80, 1); // #4CAF50
  public warning: Color = new Color(255, 193, 7, 1); // #FFC107

  public name: string;
  readonly editable: boolean;

  constructor (name: string, editable: boolean = false) {
    this.name = name;  
    this.editable = editable;
  }

  public toJson = (): JsonTheme => {
    return {
      name: this.name,
      editable: this.editable,

      primary: this.primary.toJson(),
      secondary: this.secondary.toJson(),
      font: this.font.toJson(),
      background: this.background.toJson(),
      accent: this.accent.toJson(),
      error: this.error.toJson(),
      info: this.info.toJson(),
      success: this.success.toJson(),
      warning: this.warning.toJson(),
    }
  }

  public toTheme = (type: string = "hex") => {
    if (type === "hex") {
      return {
        primary: this.primary.hex(),
        secondary: this.secondary.hex(),
        font: this.font.hex(),
        background: this.background.hex(),
        accent: this.accent.hex(),
        error: this.error.hex(),
        info: this.info.hex(),
        success: this.success.hex(),
        warning: this.warning.hex(),
      }
    }
    else if (type = "rgba") {
      return {
        primary: this.primary.rgba(),
        secondary: this.secondary.rgba(),
        font: this.font.rgba(),
        background: this.background.rgba(),
        accent: this.accent.rgba(),
        error: this.error.rgba(),
        info: this.info.rgba(),
        success: this.success.rgba(),
        warning: this.warning.rgba(),
      }
    }
  } 
}