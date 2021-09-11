// @ts-ignore
import CordovaPromiseFS from 'cordova-promise-fs';
// @ts-ignore
import promiscuous from "promiscuous";
import FileSystemInterface from "./FileSystemInterface";
import CacheFileSystem from "./CacheFileSystem";

export default class PermanentFileSystem implements FileSystemInterface {
  public id: string = 'permanent';
  public weight: number = 100;
  public fileSystem: FileSystemInterface = new CacheFileSystem();

  /**
   * @inheritDoc
   */
  public async initialize() {
    await new Promise(resolve => {
      document.addEventListener('deviceready', async () => {
        this.fileSystem = CordovaPromiseFS({
          persistent: true, // or false
          storageSize: 1024 * 1024 * 1024, // storage size in bytes, default 20MB
          concurrency: 3, // how many concurrent uploads/downloads?
          Promise: promiscuous,
          fileSystem: cordova.file.dataDirectory
        });

        resolve();
      });
      resolve();
    });
  }

  async copy(options: any = {}): Promise<any> {
    return await this.fileSystem.copy(options.source, options.destination);
  }

  async create(options: any = {}): Promise<any> {
    return await this.fileSystem.create(options.filename);
  }

  async dir(options: any = {}): Promise<any> {
    return await this.fileSystem.dir(options.path);
  }

  async ensure(options: any = {}): Promise<any> {
    return await this.fileSystem.ensure(options.path);
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
    return await this.fileSystem.move(options.source, options.destination);
  }

  async moveDir(options: any = {}): Promise<any> {
    return await this.fileSystem.moveDir(options.source, options.destination);
  }

  async read(options: any = {}): Promise<any> {
    console.log("yea reading from this cause not found", options)
    //return await this.fileSystem.read(options.filename);
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    //return await fetch('https://api.ipify.org?format=json');
  }

  async readJSON(options: any = {}): Promise<any> {
    return await this.fileSystem.readJSON(options.filename);
  }

  async remove(options: any = {}): Promise<any> {
    return await this.fileSystem.remove(options.filename);
  }

  async removeDir(options: any = {}): Promise<any> {
    return await this.fileSystem.removeDir(options.path);
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
    return await this.fileSystem.write(options.filename, options.data);
  }
}