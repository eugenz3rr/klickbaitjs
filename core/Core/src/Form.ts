import Console from "./Console";
import Module from "./Module/Module";

/**
 * Form interface.
 */
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

/**
 * Form class.
 */
export default class Form extends Console {

  /**
   * The form id.
   */
  public id: string = '';
  
  /**
   * @deprecated
   */
  public location: string = '';
  
  /**
   * Current module.
   */
  public module: Module;

  /**
   * Raw form info.
   */
  private form: FormInterface;

  /**
   * Last changed info.
   */
  public changed: number = 0;

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
  constructor(module: Module, id: string, formFile: any) {
    super(module.fileSystemManager);

    // Execute the form to get the 
    this.form = formFile(module, id);
    this.module = module;

    this.id = this.form.info.id;
    this.location = this.form.info.location;
  }

  /**
   * A function to load saved form values.
   */
  public async loadValues() {
    let values: Object = {};

    try {
      values = await this.fileSystemManager.readJSON(`${this.module.path}values/form.${this.id}.json`);
    } catch (error) {
      await this.fileSystemManager.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify({}));

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
   * A function used to build the render array.
   */
  public async build() {

    // Load form values.
    let values = await this.loadValues();

    // Build form with
    return this.form.build(values);
  };

  /**
   * A function used to validate form input.
   *
   * @param values
   *   Expects an array or object.
   */
  public async validate(values: any) {
    this.form.validate(values);
  };

  /**
   * A function used to submit the manipulated inout.
   *
   * @param values
   *   Expects an array or object.
   */
  public async submit(values: any) {
    values = this.form.submit(values);
    await this.fileSystemManager.write(`${this.module.path}values/form.${this.id}.json`, JSON.stringify(values));
  };
}