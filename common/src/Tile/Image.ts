import Size, { JsonSize } from "./Size";

export interface JsonImage {
  type: string;
  subtype: string;
  state: string;
  path: string;
  size: JsonSize;
}

export default class Image {
  public type: string = "";
  public subtype: string = "";
  public state: string = "empty";
  public path: string = "";
  public size: Size;

  constructor() {
    this.size = new Size();
  }

  public toJson = (): JsonImage => {
    return {
      type: this.type,
      subtype: this.subtype,
      state: this.state,
      path: this.path,
      size: this.size.toJson(),
    }
  };

  public pathTo = (): string => {
    let pathAsArray: string[] = this.path.split('/');
    pathAsArray.pop();
    return pathAsArray.join('/');
  };

  public contentType = (): string => {
    return `${this.type}/${this.subtype}`;
  }
}