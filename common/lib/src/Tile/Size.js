export default class Size {
    constructor(width = 150, height = 150) {
        this.heightToString = () => {
            return `${this.height}px`;
        };
        this.widthToString = () => {
            return `${this.width}px`;
        };
        this.toJson = () => {
            return {
                width: this.width,
                height: this.height,
            };
        };
        this.width = width;
        this.height = height;
    }
}
