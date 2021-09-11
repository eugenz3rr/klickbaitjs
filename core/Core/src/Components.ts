import Console from "./Console";
import Form from "./Form";
import Module from "./Module/Module";

/**
 * A class for components.
 */
export default class Components extends Console {
  public module: Module;
  public forms: Form[] = [];

  constructor(module: Module, components: any) {
    super(module.fileSystemManager);

    this.module = module;
    
    this.load(this.fallback(components, 'forms', [])).then(() => {
      this.log('Regions loaded.')
    }).catch(err => {
      this.log('Fatal error loading the forms.');
    });
  }

  public async load(forms: string[]) {
    for (let i = 0; i < forms.length; i++) {

      const location: string = forms[i];
      this.log(`Reading > ${this.module.path}${location}`);
      const contents: string = await this.fileSystemManager.read(`${this.module.path}${location}`);

      if (contents !== undefined) {
        this.forms.push(new Form(this.module, this.module.id, eval(contents)));
      }
      else {
        this.log(`${this.module.path}${location} => not found.`);
      }
    }
  }
}