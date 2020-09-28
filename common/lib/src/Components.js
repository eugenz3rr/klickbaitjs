import Console from "./Console";
import Form from "./Form";
export default class Components extends Console {
    constructor(module, components) {
        super(module.fileSystem);
        this.forms = [];
        this.module = module;
        this.load(this.fallback(components, 'forms', [])).then(() => {
            this.log('Regions loaded.');
        }).catch(err => {
            this.log('Fatal error loading the forms.');
        });
    }
    async load(forms) {
        for (let i = 0; i < forms.length; i++) {
            const location = forms[i];
            const contents = this.fileSystem.read(`${this.module.path}/${location}`);
            if (contents !== undefined) {
                new Form(this.module, this.module.id, eval(contents));
            }
            else {
                this.log(`${this.module.moduleManager.path}/${location} => not found.`);
            }
        }
    }
}
