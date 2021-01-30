import DefaultFileSystem from "./DefaultFileSystem";
export default class KlickbaitConfiguration {
    constructor(name) {
        this.name = 'Klickbait';
        this.name = name;
    }
    /**
     * A function that sets all values with custom code.
     */
    async initialize() {
        this.publicFileSystem = new DefaultFileSystem();
        this.privateFileSystem = new DefaultFileSystem();
        this.applicationFileSystem = new DefaultFileSystem();
    }
}
