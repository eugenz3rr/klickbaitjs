import FileSystemInterface from "./FileSystemInterface";

export default class CacheFileSystem implements FileSystemInterface {

  public id: string = 'cache';
  public weight: number = 0;
  public localStorage = window.localStorage;

  /**
   * @inheritDoc
   */
  public async initialize() {}

  async copy(options: any = {}): Promise<any> {
    let item = this.localStorage.getItem(options.source);

    if (!item) {
      return 'ignore';
    }

    this.localStorage.setItem(options.destination, item);
    return true;
  }

  async create(options: any = {}): Promise<any> {
    this.localStorage.setItem(options.path, '');
    return true;
  }

  async dir(options: any = {}): Promise<any> {
    this.localStorage.setItem(options.path, '');
    return true;
  }

  async ensure(options: any = {}): Promise<any> {
    this.localStorage.setItem(options.path, '');
    return true;
  }

  async exists(options: any = {}): Promise<any> {
    return Object.keys(this.localStorage).includes(options.filename);
  }

  async file(options: any = {}): Promise<any> {
    return this.localStorage.getItem(options.filename)
  }

  async list(options: any = {}): Promise<any> {
    let {path, optionString} = options;

    let keys = Object.keys(this.localStorage);
    // @ts-ignore
    let values = [];

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      if (!key.includes(path)) {
        continue;
      }

      // Continue if extension is detected.
      if (optionString.includes('d')) {
        let source = key.split('/');

        // Filter array from empty entries.
        source = source.filter(item => item);

        let target = path.split('/');

        // Filter array from empty entries.
        target = target.filter((item: any) => item);

        if (source.length > target.length) {
          let isFile = source[target.length].split('.').length > 1;
          // @ts-ignore
          source = '/' + source.splice(0, target.length + 1).join('/') + '/';
          // @ts-ignore
          if (!isFile && !values.includes(source)) values.push(source);
        }
      }

      // Continue if extension is detected.
      if (optionString.includes('f')) {
        let source = key.split('/');

        // Filter array from empty entries.
        source = source.filter(item => item);

        let target = path.split('/');

        // Filter array from empty entries.
        target = target.filter((item: any) => item);

        if (source.length === (target.length + 1)) {
          let isFile = source[target.length].split('.').length > 1;
          // @ts-ignore
          source = '/' + source.splice(0, target.length + 1).join('/');
          if (isFile && !values.includes(source)) values.push(source);
        }
      }
    }

    return values;
  }

  async move(options: any = {}): Promise<any> {
    let item = this.localStorage.getItem(options.source);
    this.localStorage.removeItem(options.source);

    if (!item) {
      return 'ignore';
    }

    this.localStorage.setItem(options.destination, item);
    return true;
  }

  async moveDir(options: any = {}): Promise<any> {
    let items = Object.keys(this.localStorage);

    items.filter((item) => {
      return item.search(options.source) === 0
    })

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let value: any = this.localStorage.getItem(item);

      item.replace(options.source, options.destination);
      this.localStorage.setItem(item, value);
    }

    return true;
  }

  async read(options: any = {}): Promise<any> {
    return this.localStorage.getItem(options.filename);
  }

  async readJSON(options: any = {}): Promise<any> {
    let value: any = this.localStorage.getItem(options.filename);
    return JSON.parse(value);
  }

  async remove(options: any = {}): Promise<any> {
    this.localStorage.removeItem(options.filename)
    return true;
  }

  async removeDir(options: any = {}): Promise<any> {
    let items = Object.keys(this.localStorage);

    items.filter((item) => {
      return item.search(options.path) === 0
    })

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      this.localStorage.removeItem(item)
    }
    return true;
  }

  async toDataURL(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async toInternalURL(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async toUrl(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async write(options: any = {}): Promise<any> {
    this.localStorage.setItem(options.filename, options.data);
    return true;
  }
}