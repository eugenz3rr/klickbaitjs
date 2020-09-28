import Console from "./Console";
import Module from "./Module/Module";

interface FormInterface {
  info: {
    title: string,
    description: string,
    id: string,
    tab: string,
    location: string
  },
  build: Function,
  validate: Function,
  submit: Function,
}

export default class Form extends Console {

  /**
   * 
   */
  public id: string = '';
  
  /**
   * 
   */
  public location: string = '';
  
  /**
   * 
   */
  public module: Module;

  /**
   * 
   */
  private form: FormInterface;

  /**
   *
   */
  public changed: number = 0;

  /**
   * 
   * @param module
   * @param id
   * @param formFile
   */
  constructor(module: Module, id: string, formFile: any) {
    super(module.fileSystem);

    // Execute the form to get the 
    this.form = formFile(module, id);
    this.module = module;

    this.id = this.form.info.id;
    this.location = this.form.info.location;
  }

  /**
   * 
   */
  public async loadValues() {
    let values: Object = {};

    try {
      values = await this.fileSystem.readJSON(`${this.module.path}values/form.${this.id}.json`);
    } catch (error) {
      await this.fileSystem.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify({}));

      /*
       * At this point we know that there is nothing in the fileSystem about this file.
       * So it's ok to set value empty.
       */
      values = {};
    }

    if (values === undefined) return {};
    return values;
  };

  /**
   * 
   */
  public async build() {
    let values = await this.loadValues();
    return this.form.build(values);
  };

  /**
   * 
   * @param values 
   */
  public async validate(values: any) {
    this.form.validate(values);
  };

  /**
   * 
   * @param values 
   */
  public async submit(values: any) {
    values = this.form.submit(values);
    await this.fileSystem.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify(values));
  };
}