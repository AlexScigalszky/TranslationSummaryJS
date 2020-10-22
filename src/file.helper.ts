import * as fs from 'fs';
import * as pathLib from 'path';
import { Options } from './options';

export class FileHelper {
    constructor(private options: Options = new Options()) {}

    public getFileNames(path: string): string[] {
        const entries = fs.readdirSync(path, { withFileTypes: true });
        const folders = entries.filter((folder) => folder.isDirectory());
        const files = this.getFilesInDirectory(entries, path);

        for (const folder of folders) {
            const newPath = `${path}/${folder.name}`;
            files.push(...this.getFileNames(newPath));
        }
        return files;
    }

    private getFilesInDirectory(entries: fs.Dirent[], path: string): string[] {
        return entries
            .filter((file) => !file.isDirectory() && file.name.endsWith(this.options.fileExtension))
            .map((file) => pathLib.join(path, file.name));
    }
}
