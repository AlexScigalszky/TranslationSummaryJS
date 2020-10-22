import { Options } from './options';
import { TranslationSummary } from './translation-summay';

const options = new Options();

options.folderPath = './docs';
options.filePattern = '_...md$';
options.filePatternForReplace = '_param.md';
options.fileExtension = '.md';
options.extractLanguage = (file: string): string => {
    return file.substring(file.length - 5, file.length - 3);
};
options.replaceExtension = (file: string, lang: string, pattern: string, fileExtension: string): string => {
    return file.replace(fileExtension, pattern.replace('param', lang));
};

const helper = new TranslationSummary(options);
const summary = helper.getSummary();

console.table(summary);
