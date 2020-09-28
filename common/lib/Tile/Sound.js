export default class Sound {
    constructor() {
        this.type = "";
        this.subtype = "";
        this.state = "empty";
        this.path = "";
        this.volume = 100;
        this.toJson = () => {
            return {
                type: this.type,
                subtype: this.subtype,
                state: this.state,
                path: this.path,
                volume: this.volume,
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
    }
}
