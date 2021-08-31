import Console from "../../Console";
import Region from "./Region";
import FileSystemManager from "../../FileSystem/Manager";

export default class RegionManager extends Console {

    /**
     * A list of registered regions.
     */
    public regions: Region[] = [];

    /**
     * Constructor.
     *
     * @param fileSystemManager
     *   Expects the file system manager.
     */
    constructor(fileSystemManager: FileSystemManager) {
        super(fileSystemManager);
    }
}