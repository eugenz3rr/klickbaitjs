import Console from "../../Console";
import Page from "./Page";
export default class PageManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.pages = [];
        this.fileSystem = fileSystem;
        this.defaultPage = '';
        // Alter the default page.
        this.alterEvent('manager.page.defaultPage', this.defaultPage);
        this.alterEvent('manager.page', this);
        if (this.defaultPage === '' && this.pages.length !== 0) {
            this.page = this.pages[0];
        }
        else if (this.defaultPage !== '') {
            this.page = new Page(this.fileSystem, this);
            this.open(this.defaultPage);
        }
        else {
            this.page = new Page(this.fileSystem, this);
        }
    }
    open(id) {
        for (let i = 0; i < this.pages.length; i++) {
            const page = this.pages[i];
            if (page.id === id) {
                this.page = page;
                break;
            }
        }
        this.alterEvent('manager.page.open', this.pages);
    }
    ;
}
