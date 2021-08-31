import Console from "../../Console";
export default class RegionManager extends Console {
    constructor(fileSystemManager) {
        super(fileSystemManager);
        this.regions = [];
    }
}
