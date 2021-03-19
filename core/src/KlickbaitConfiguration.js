import DefaultFileSystem from "./DefaultFileSystem";
// @ts-ignore
import Installer from "./Installer";
export default class KlickbaitConfiguration {
    constructor() {
        this.name = 'Klickbait';
    }
    /**
     * A function that sets all values with custom code.
     */
    async initialize() {
        this.publicFileSystem = new DefaultFileSystem();
        this.privateFileSystem = new DefaultFileSystem();
        this.applicationFileSystem = new DefaultFileSystem();
        let installer = new Installer(this.publicFileSystem);
        await installer.install();
    }
}
