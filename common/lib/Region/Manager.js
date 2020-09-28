import Console from "../Console";
export default class RegionManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.regions = [];
        this.fileSystem = fileSystem;
    }
}
