import { FileHelper } from './file.helper';
import { FileSummary } from './models/file-summary.model';
import { Options } from './options';

export class TranslationSummary {
    constructor(private options: Options = new Options()) {}

    public searchLanguages(files: string[]): string[] {
        const regex = new RegExp(this.options.filePattern);
        const data = files.filter((f) => regex.test(f)).map((f) => this.options.extractLanguage(f));
        return [...Array.from(new Set<string>(data))];
    }

    public fileSummary(files: string[], file: string, languages: string[]): FileSummary {
        const langs = languages.map((lang) => {
            const includes = files.includes(
                this.options.replaceExtension(
                    file,
                    lang,
                    this.options.filePatternForReplace,
                    this.options.fileExtension,
                ),
            );
            return {
                [lang]: includes ? 'exists' : 'missing translation',
            };
        });

        return Object.assign({ file }, ...langs);
    }

    public getNativeFiles(files: string[]): string[] {
        const regex = new RegExp(this.options.filePattern);
        return files.filter((f) => !regex.test(f));
    }

    public getSummary(): FileSummary[] {
        const fileHelper = new FileHelper(this.options);
        var files = fileHelper.getFileNames(this.options.folderPath);
        const languages = this.searchLanguages(files);
        const nativeFiles = this.getNativeFiles(files);
        const result = nativeFiles.map((file: string) => this.fileSummary(files, file, languages));
        return result;
    }
}
