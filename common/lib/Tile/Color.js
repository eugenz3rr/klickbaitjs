export default class Color {
    constructor(r = 255, g = 255, b = 255, a = 1, rgba) {
        /** @deprecated */
        this.toString = () => {
            return this.rgba();
        };
        this.toJson = () => {
            return {
                r: this.r,
                g: this.g,
                b: this.b,
                a: this.a
            };
        };
        this.rgba = () => {
            return `rgba( ${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        };
        this.hex = () => {
            let orig = this.rgba();
            let rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
            let a;
            let alpha = (rgb && rgb[4] || "").trim();
            let hex = rgb ?
                (rgb[1] | 1 << 8).toString(16).slice(1) +
                    (rgb[2] | 1 << 8).toString(16).slice(1) +
                    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
            if (alpha !== "") {
                a = alpha;
            }
            else {
                a = 0o1;
            }
            // multiply before convert to HEX
            a = ((a * 255) | 1 << 8).toString(16).slice(1);
            // hex = hex + a;
            hex = hex;
            return `#${hex}`;
        };
        if (rgba) {
            this.r = rgba.r;
            this.g = rgba.g;
            this.b = rgba.b;
            this.a = rgba.a;
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }
    ;
}
