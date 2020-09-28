import Console from "./Console";
export default class Info extends Console {
    /**
     *
     * @param module
     * @param info
     */
    constructor(module, info) {
        super(module.fileSystem);
        /**
         *
         */
        this.name = '';
        /**
         *
         */
        this.description = '';
        /**
         *
         */
        this.group = '';
        /**
         *
         */
        this.type = '';
        /**
         *
         */
        this.version = '';
        /**
         *
         */
        this.dependencies = [];
        // Match all items.
        this.name = this.fallback(info, 'name', 'undefined');
        this.description = this.fallback(info, 'description', 'undefined');
        this.group = this.fallback(info, 'group', 'undefined');
        this.type = this.fallback(info, 'type', 'undefined');
        this.version = this.fallback(info, 'version', 'undefined');
        this.dependencies = this.fallback(info, 'dependencies', []);
    }
}
