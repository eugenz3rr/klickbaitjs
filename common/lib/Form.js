import Console from "./Console";
/**
 * Form class.
 */
export default class Form extends Console {
    /**
     * Form constructor.
     *
     * @param module
     *   Expects the current module.
     * @param id
     *   Expects the form id.
     * @param formFile
     *   Expects the raw form file data.
     */
    constructor(module, id, formFile) {
        super(module.fileSystem);
        /**
         * The form id.
         */
        this.id = '';
        /**
         * @deprecated
         */
        this.location = '';
        /**
         * Last changed info.
         */
        this.changed = 0;
        // Execute the form to get the 
        this.form = formFile(module, id);
        this.module = module;
        this.id = this.form.info.id;
        this.location = this.form.info.location;
    }
    /**
     * A function to load saved form values.
     */
    async loadValues() {
        let values = {};
        try {
            values = await this.fileSystem.readJSON(`${this.module.path}values/form.${this.id}.json`);
        }
        catch (error) {
            await this.fileSystem.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify({}));
            /*
             * At this point we know that there is nothing in the fileSystem about this file.
             * So it's ok to set value empty.
             */
            values = {};
        }
        if (values === undefined)
            return {};
        return values;
    }
    ;
    /**
     * A function used to build the render array.
     */
    async build() {
        // Load form values.
        let values = await this.loadValues();
        // Build form with
        return this.form.build(values);
    }
    ;
    /**
     * A function used to validate form input.
     *
     * @param values
     *   Expects an array or object.
     */
    async validate(values) {
        this.form.validate(values);
    }
    ;
    /**
     * A function used to submit the manipulated inout.
     *
     * @param values
     *   Expects an array or object.
     */
    async submit(values) {
        values = this.form.submit(values);
        await this.fileSystem.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify(values));
    }
    ;
}
