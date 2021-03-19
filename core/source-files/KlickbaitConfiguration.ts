import DefaultFileSystem from "./DefaultFileSystem";
// @ts-ignore
import Installer from "./Installer";

interface FileSystems {
    publicFileSystem: Object;
    privateFileSystem: Object;
    applicationFileSystem: Object;
}

export default class KlickbaitConfiguration {
    public name: string = 'Klickbait';

    public publicFileSystem: DefaultFileSystem | undefined;
    public privateFileSystem: DefaultFileSystem | undefined;
    public applicationFileSystem: DefaultFileSystem | undefined;

    /**
     * A function that sets all values with custom code.
     */
    public async initialize() {
        this.publicFileSystem = new DefaultFileSystem();
        this.privateFileSystem = new DefaultFileSystem();
        this.applicationFileSystem = new DefaultFileSystem();

        let installer = new Installer(this.publicFileSystem);
        await installer.install();
    }
}