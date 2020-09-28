import Console from "../../Console";
import Container from "./Container";
import FileSystem from "../../FileSystem";

export default class ContainerManager extends Console {
    public containers: Container[] = [];
    public fileSystem: FileSystem;

    constructor(fileSystem: FileSystem) {
        super(fileSystem);
        this.fileSystem = fileSystem;
    }
}