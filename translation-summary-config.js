module.exports = {
    folderPath: './docs',
    filePattern: '_...md$',
    filePatternForReplace: '_param1.md',
    fileExtension: '.md',
    extractLanguage: (file) => {
        return file.substring(file.length - 5, file.length - 3);
    },
    replaceExtension: (file, lang, pattern, fileExtension) => {
        return file.replace(fileExtension, pattern.replace('param1', lang));
    },
};
