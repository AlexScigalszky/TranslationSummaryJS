import { Options } from './options';
import { TranslationSummary } from './translation-summary';

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

// const ts = require('../src/translation-summary');
// const files = ['docs/readme.md', `docs/readme_es.md`];
//         const helper = new ts.TranslationSummary();
//         const languages = helper.getNativeFiles(files);
//         const summary = helper.fileSummary(files, files[0], languages);
//         console.debug('summary', summary);
//         console.debug('summary', languages);