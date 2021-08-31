import Console from "../../Console";
import Region from "./Region";
import FileSystemManager from "../../FileSystem/Manager";

export default class RegionManager extends Console {
    public regions: Region[] = [];

    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);
    }
}