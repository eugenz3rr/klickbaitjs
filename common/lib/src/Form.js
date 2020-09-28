import Console from "./Console";
export default class Form extends Console {
    /**
     *
     * @param module
     * @param id
     * @param formFile
     */
    constructor(module, id, formFile) {
        super(module.moduleManager.fileSystem);
        /**
         *
         */
        this.id = '';
        /**
         *
         */
        this.location = '';
        // Execute the form to get the 
        this.form = formFile(module, id);
        this.module = module;
        this.id = this.form.info.id;
        this.location = this.form.info.location;
        this.submit({}).then(this.log);
    }
    /**
     *
     */
    async loadValues() {
        let values = {};
        values = await this.fileSystem.readJSON(`${this.module.path}/values/form.${this.id}.json`);
        try {
        }
        catch (error) {
            await this.fileSystem.write(`${this.module.path}/values/form.${this.id}.json`, JSON.stringify({}));
            /*
             * At this point we know that there is nothing in the fileSysem about this file.
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
     *
     */
    async build() {
        let values = await this.loadValues();
        return this.form.build(values);
    }
    ;
    /**
     *
     * @param values
     */
    async validate(values) {
        this.form.validate(values);
    }
    ;
    /**
     *
     * @param values
     */
    async submit(values) {
        this.form.submit(values);
        this.fileSystem.write(`${this.module.path}/values/form.${this.id}.json`, JSON.stringify(values));
    }
    ;
}
