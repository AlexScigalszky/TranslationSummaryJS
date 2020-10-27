import { Defaults } from './default';

export class Options {
    folderPath: string;
    filePattern: string;
    filePatternForReplace: string;
    fileExtension: string;
    extractLanguage: (file: string) => string;
    replaceExtension: (file: string, lang: string, pattern: string, fileExtension: string) => string;
    default: Defaults;

    constructor(config: any = null) {
        this.default = new Defaults();
        this.folderPath = './docs';
        this.filePattern = '_...md$';
        this.filePatternForReplace = '_param.md';
        this.fileExtension = '.md';
        this.extractLanguage = this.default.extractLanguageByDefault;
        this.replaceExtension = this.default.replaceExtensionByDefault;

        if (config) {
            if (config.default) {
                this.default = config.default;
            }
            if (config.folderPath) {
                this.folderPath = config.folderPath;
            }
            if (config.filePattern) {
                this.filePattern = config.filePattern;
            }
            if (config.filePatternForReplace) {
                this.filePatternForReplace = config.filePatternForReplace;
            }
            if (config.fileExtension) {
                this.fileExtension = config.fileExtension;
            }
            if (config.extractLanguage) {
                this.extractLanguage = config.extractLanguage;
            }
            if (config.replaceExtension) {
                this.replaceExtension = config.replaceExtension;
            }
        }
    }
}
