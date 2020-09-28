import Theme from './Theme';
import Tile from './Tile';
import Color from './Tile/Color';
import ModuleManager from './ModuleManager';
export default class Settings {
    constructor(fileSystem) {
        this.themes = [
            new Theme('Default'),
            new Theme('Casual'),
            new Theme('God'),
            new Theme('Custom', true)
        ];
        this.selectedTheme = 2;
        this.overlapSounds = false;
        this.tutorial = false;
        this.disclaimer = true;
        this.tilesPerRow = 3;
        this.defaultTile = new Tile();
        this.modified = 0;
        this.toJson = () => {
            let JsonThemes = [];
            for (let i = 0; i < this.themes.length; i++) {
                JsonThemes.push(this.themes[i].toJson());
            }
            return {
                themes: JsonThemes,
                selectedTheme: this.selectedTheme,
                defaultTile: this.defaultTile.toJson(),
                overlapSounds: this.overlapSounds,
                tutorial: this.tutorial,
                disclaimer: this.disclaimer,
                tilesPerRow: this.tilesPerRow,
            };
        };
        this.load = async () => {
            let settings;
            try {
                let settingsExists = await this.fileSystem.exists("settings.json");
                if (!settingsExists) {
                    await this.save();
                }
                settings = await this.fileSystem.readJSON("settings.json");
                // Clear current themes.
                this.themes = [];
            }
            catch (error) {
                return;
            }
            try {
                for (let i = 0; i < settings.themes.length; i++) {
                    let themeRaw = settings.themes[i];
                    let theme = new Theme(themeRaw.name, themeRaw.editable);
                    theme.primary = new Color(0, 0, 0, 0, themeRaw.primary);
                    theme.secondary = new Color(0, 0, 0, 0, themeRaw.secondary);
                    theme.accent = new Color(0, 0, 0, 0, themeRaw.accent);
                    theme.error = new Color(0, 0, 0, 0, themeRaw.error);
                    theme.info = new Color(0, 0, 0, 0, themeRaw.info);
                    theme.success = new Color(0, 0, 0, 0, themeRaw.success);
                    theme.warning = new Color(0, 0, 0, 0, themeRaw.warning);
                    theme.font = new Color(0, 0, 0, 0, themeRaw.font);
                    theme.background = new Color(0, 0, 0, 0, themeRaw.background);
                    this.themes.push(theme);
                }
                this.selectedTheme = settings.selectedTheme;
                this.defaultTile.id = settings.defaultTile.id;
                this.defaultTile.path = settings.defaultTile.path;
                this.defaultTile.name = settings.defaultTile.name;
                this.defaultTile.type = settings.defaultTile.type;
                this.defaultTile.backgroundColor.r = settings.defaultTile.colors.background.r;
                this.defaultTile.backgroundColor.g = settings.defaultTile.colors.background.g;
                this.defaultTile.backgroundColor.b = settings.defaultTile.colors.background.b;
                this.defaultTile.backgroundColor.a = settings.defaultTile.colors.background.a;
                this.defaultTile.fontColor.r = settings.defaultTile.colors.font.r;
                this.defaultTile.fontColor.g = settings.defaultTile.colors.font.g;
                this.defaultTile.fontColor.b = settings.defaultTile.colors.font.b;
                this.defaultTile.fontColor.a = settings.defaultTile.colors.font.a;
                this.defaultTile.image.type = settings.defaultTile.image.type;
                this.defaultTile.image.subtype = settings.defaultTile.image.subtype;
                this.defaultTile.image.state = settings.defaultTile.image.state;
                this.defaultTile.image.path = settings.defaultTile.image.path;
                this.defaultTile.image.size.width = settings.defaultTile.image.size.width;
                this.defaultTile.image.size.height = settings.defaultTile.image.size.height;
                this.defaultTile.sound.type = settings.defaultTile.sound.type;
                this.defaultTile.sound.subtype = settings.defaultTile.sound.subtype;
                this.defaultTile.sound.state = settings.defaultTile.sound.state;
                this.defaultTile.sound.path = settings.defaultTile.sound.path;
                this.defaultTile.sound.volume = settings.defaultTile.sound.volume;
                this.overlapSounds = settings.overlapSounds;
                this.tutorial = settings.tutorial;
                this.disclaimer = settings.disclaimer;
                this.tilesPerRow = settings.tilesPerRow;
            }
            catch (error) {
                console.log("Sorry could not load settings.");
                console.log(error);
            }
        };
        this.save = async () => {
            try {
                // Save this tile.
                await this.fileSystem.create('settings.json');
                await this.fileSystem.write('settings.json', this.toJson());
            }
            catch (error) {
                console.log(error);
            }
        };
        this.theme = () => {
            return this.themes[this.selectedTheme].toTheme();
        };
        this.fileSystem = fileSystem;
        this.moduleManager = new ModuleManager(fileSystem, '/modules');
        this.themes[1].primary = new Color(5, 4, 4, 1);
        this.themes[1].secondary = new Color(46, 28, 43, 1);
        this.themes[1].accent = new Color(209, 214, 0, 1);
        this.themes[1].font = new Color(255, 255, 255, 1);
        this.themes[1].background = new Color(0, 0, 0, 1);
        this.themes[1].error = new Color(255, 115, 0, 1);
        this.themes[1].info = new Color(70, 70, 70, 1);
        this.themes[1].success = new Color(70, 180, 70, 1);
        this.themes[1].warning = new Color(209, 214, 0, 1);
        this.themes[2].primary = new Color(5, 4, 4, 1);
        this.themes[2].secondary = new Color(46, 28, 43, 1);
        this.themes[2].accent = new Color(209, 214, 0, 1);
        this.themes[2].font = new Color(255, 255, 255, 1);
        this.themes[2].background = new Color(0, 0, 0, 1);
        this.themes[2].error = new Color(255, 115, 0, 1);
        this.themes[2].info = new Color(70, 70, 70, 1);
        this.themes[2].success = new Color(70, 180, 70, 1);
        this.themes[2].warning = new Color(209, 214, 0, 1);
    }
}
