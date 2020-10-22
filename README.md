# TranslationSummaryJS

View a summary of missing translation files into a folder


This library will help you to find missing translation files into a folder `docs`

## Output

<p> <img src="./assets/capture.png" alt="capture" /> </p>


## How to use

node (JS)
```javascript
const ts = require('@translation-summary/core');

const helper = new ts.TranslationSummary();
const summary = helper.getSummary();

console.table(summary);
```

## Show data in console

```typescript
import { TranslationSummary } from './translation-summay';

const helper = new TranslationSummary();
const summary = helper.getSummary();

console.table(summary);
```

# Result model

```typescript
export interface FileSummary {
    file: string;
    [key: string]: string;
}
```

# Options

You can define options for files, extensions and replace functions that the library need it.

```typescript
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
```


## Avaliables options

| Option         | Description                                                                                                                 | Default     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `folderPath`         | Folder where start to search docs files                                                                               | `./docs`    |
| `filePattern`         | Regular expression as string used to find native files                                                               | `_...md$`   |
| `filePatternForReplace` | Regular expression with a `param` string witch will be replaced be language key                                    | `_param.md` |
| `fileExtension`    | File extension for docs files (empty string will take all files)                                                        | `.md`       |
| `extractLanguage`        | Function that return a language from a filename (e: `doc_en.md` must return `en`)                                 |             |
| `replaceExtension`        | Function that replace a native filename for a especific language filename (e: `doc.md` must return `doc_en.d`)   |             |
