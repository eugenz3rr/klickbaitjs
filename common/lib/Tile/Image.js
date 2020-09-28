import Size from "./Size";
export default class Image {
    constructor() {
        this.type = "";
        this.subtype = "";
        this.state = "empty";
        this.path = "";
        this.toJson = () => {
            return {
                type: this.type,
                subtype: this.subtype,
                state: this.state,
                path: this.path,
                size: this.size.toJson(),
            };
        };
        this.pathTo = () => {
            let pathAsArray = this.path.split('/');
            pathAsArray.pop();
            return pathAsArray.join('/');
        };
        this.contentType = () => {
            return `${this.type}/${this.subtype}`;
        };
        this.size = new Size();
    }
}
