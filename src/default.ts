export class Defaults {
    public extractLanguageByDefault(file: string): string {
        return file.substring(file.length - 5, file.length - 3);
    }

    public replaceExtensionByDefault(file: string, lang: string, pattern: string, fileExtension: string): string {
        return file.replace(fileExtension, pattern.replace('param', lang));
    }
}
