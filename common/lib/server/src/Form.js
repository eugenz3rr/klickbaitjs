import Console from "./Console";
export default class Form extends Console {
    constructor(module, id, formFile) {
        super();
        this.id = '';
        this.location = '';
        // Execute the form to get the 
        this.form = formFile(module, id);
        this.module = module;
        this.id = this.form.info.id;
        this.location = this.form.info.location;
        this.submit({}).then(this.log);
    }
    async loadValues() {
        let values = '';
        values = await this.readFileSync(`${this.module.path}/values/form.${this.id}.json`);
        try {
        }
        catch (error) {
            await this.saveValues(JSON.stringify({}));
            values = await this.readFileSync(`${this.module.path}/values/form.${this.id}.json`);
        }
        if (values === undefined)
            return {};
        return values;
    }
    ;
    async saveValues(values) {
        await this.writeFileSync(`${this.module.path}/values/form.${this.id}.json`, values);
    }
    ;
    async build() {
        let values = await this.loadValues();
        return this.form.build(values);
    }
    ;
    async validate(values) {
        this.form.validate(values);
    }
    ;
    async submit(values) {
        this.form.submit(values);
        this.saveValues(JSON.stringify(values));
    }
    ;
}
