// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";
import FileSystemInterface from "./FileSystemInterface";
import CacheFileSystem from "./CacheFileSystem";

export default class ReadOnlyCacheFileSystem implements FileSystemInterface {

  public id: string = 'readonly';
  public weight: number = 50;
  public fileSystem: FileSystemInterface = new CacheFileSystem();

  /**
   * @inheritDoc
   */
  public async initialize() {
    await new Promise(resolve => {
      document.addEventListener('deviceready', async () => {
        this.fileSystem = CordovaPromiseFS({
          persistent: true, // or false
          storageSize: 20 * 1024 * 1024, // storage size in bytes, default 20MB
          concurrency: 3, // how many concurrent uploads/downloads?
          Promise: promiscuous,
          fileSystem: cordova.file.applicationDirectory
        });

        resolve();
      });
      resolve();
    });
  }

  async copy(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async create(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async dir(options: any = {}): Promise<any> {
    return await this.fileSystem.dir(options.path);
  }

  async ensure(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async exists(options: any = {}): Promise<any> {
    return await this.fileSystem.exists(options.filename);
  }

  async file(options: any = {}): Promise<any> {
    return await this.fileSystem.file(options.filename);
  }

  async list(options: any = {}): Promise<any> {
    return await this.fileSystem.list(options.path, options.optionString);
  }

  async move(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async moveDir(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async read(options: any = {}): Promise<any> {
    return await this.fileSystem.read(options.filename);
  }

  async readJSON(options: any = {}): Promise<any> {
    return await this.fileSystem.readJSON(options.filename);
  }

  async remove(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async removeDir(options: any = {}): Promise<any> {
    return 'ignore';
  }

  async toDataURL(options: any = {}): Promise<any> {
    return await this.fileSystem.toDataURL(options.filename);
  }

  async toInternalURL(options: any = {}): Promise<any> {
    return await this.fileSystem.toInternalURL(options.filename);
  }

  async toUrl(options: any = {}): Promise<any> {
    return await this.fileSystem.toUrl(options.filename);
  }

  async write(options: any = {}): Promise<any> {
    return 'ignore';
  }
}