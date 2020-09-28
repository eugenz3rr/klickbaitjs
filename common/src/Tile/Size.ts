export interface JsonSize {
  width: number;
  height: number;
}

export default class Size {
  public width: number;
  public height: number;

  constructor(width: number = 150, height: number = 150) {
    this.width = width;
    this.height = height;
  }

  public heightToString = (): string => {
    return `${this.height}px`;
  }

  public widthToString = (): string => {
    return `${this.width}px`;
  }

  public toJson = (): JsonSize => {
    return {
      width: this.width,
      height: this.height,
    };
  }
}