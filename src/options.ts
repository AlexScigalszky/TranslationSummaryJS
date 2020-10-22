import { Defaults } from './default';

export class Options {
    folderPath: string;
    filePattern: string;
    filePatternForReplace: string;
    fileExtension: string;
    extractLanguage: (file: string) => string;
    replaceExtension: (file: string, lang: string, pattern: string, fileExtension: string) => string;
    default: Defaults;

    constructor() {
        this.default = new Defaults();
        this.folderPath = './docs';
        this.filePattern = '_...md$';
        this.filePatternForReplace = '_param.md';
        this.fileExtension = '.md';
        this.extractLanguage = this.default.extractLanguageByDefault;
        this.replaceExtension = this.default.replaceExtensionByDefault;
    }
}
