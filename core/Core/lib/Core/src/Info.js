import Console from "./Console";
export default class Info extends Console {
    /**
     * Constructor.
     *
     * @param module {Module}
     * @param info {Object}
     */
    constructor(module, info) {
        super(module.fileSystemManager);
        /**
         * Contains the module name.
         */
        this.name = '';
        /**
         * Contains the module description.
         */
        this.description = '';
        /**
         * Defines in what group the module belongs. (core, theme)
         */
        this.group = '';
        /**
         * Defines what the module implements on a very basic level.
         */
        this.type = '';
        /**
         * Defines the current version of the module.
         */
        this.version = '';
        /**
         * Defines the module dependencies.
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
