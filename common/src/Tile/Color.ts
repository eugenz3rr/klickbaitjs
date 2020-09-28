export interface JsonColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export default class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 1, rgba?: JsonColor) {

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
  };

  /** @deprecated */
  public toString = () => {
    return this.rgba();
  };

  public toJson = () => {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  };

  public rgba = (): string => {
    return `rgba( ${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  };

  public hex = () => {
    let orig: string = this.rgba();
    let rgb: any = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    let a: any;
    let alpha: any = (rgb && rgb[4] || "").trim();
    let hex = rgb ?
    (rgb[1] | 1 << 8).toString(16).slice(1) +
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== "") {
      a = alpha;
    } else {
      a = 0o1;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1)
    
    // hex = hex + a;
    hex = hex;

    return `#${hex}`;
  };
}