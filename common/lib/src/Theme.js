import Color from "./Tile/Color";
export default class Theme {
    constructor(name, editable = false) {
        this.primary = new Color(25, 118, 210, 1); // #1976D2
        this.secondary = new Color(66, 66, 66, 1); // #424242
        this.font = new Color(0, 0, 0, 1); // #000000
        this.background = new Color(255, 255, 255, 1);
        this.accent = new Color(130, 177, 255, 1); // #82b1ff
        this.error = new Color(255, 82, 82, 1); // #FF5252
        this.info = new Color(33, 150, 243, 1); // #2196F3
        this.success = new Color(76, 175, 80, 1); // #4CAF50
        this.warning = new Color(255, 193, 7, 1); // #FFC107
        this.toJson = () => {
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
            };
        };
        this.toTheme = (type = "hex") => {
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
                };
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
                };
            }
        };
        this.name = name;
        this.editable = editable;
    }
}
