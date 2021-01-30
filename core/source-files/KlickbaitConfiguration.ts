import DefaultFileSystem from "./DefaultFileSystem";

interface FileSystems {
    publicFileSystem: Object;
    privateFileSystem: Object;
    applicationFileSystem: Object;
}

export default class KlickbaitConfiguration {
    public name: string = 'Klickbait';

    public publicFileSystem: Object | undefined;
    public privateFileSystem: Object | undefined;
    public applicationFileSystem: Object | undefined;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * A function that sets all values with custom code.
     */
    public async initialize() {
        this.publicFileSystem = new DefaultFileSystem();
        this.privateFileSystem = new DefaultFileSystem();
        this.applicationFileSystem = new DefaultFileSystem();
    }
}