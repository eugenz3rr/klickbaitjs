export interface JsonSound {
  type: string;
  subtype: string;
  state: string;
  path: string;
  volume: number;
}

export default class Sound {
  public type: string = "";
  public subtype: string = "";
  public state: string = "empty";
  public path: string = "";
  public volume: number = 100;

  constructor() {}

  public toJson = (): JsonSound => {
    return {
      type: this.type,
      subtype: this.subtype,
      state: this.state,
      path: this.path,
      volume: this.volume,
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