import Console from "../../Console";
import Region from "./Region";
import FileSystem from "../../FileSystem";

export default class RegionManager extends Console {
    public regions: Region[] = [];
    public fileSystem: FileSystem;

    constructor(fileSystem: FileSystem) {
        super(fileSystem);
        this.fileSystem = fileSystem;
    }
}