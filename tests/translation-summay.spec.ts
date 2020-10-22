const ts = require('../src/translation-summary');

describe('only one file', () => {
    const files = ['one.md'];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages.length).toBe(0);
    });

    test('getNativeFiles', () => {
        const languages = helper.getNativeFiles(files);
        expect(languages.length).toBe(1);
    });

    test('fileSummary', () => {
        const languages = helper.getNativeFiles(files);
        const summary = helper.fileSummary(files, files[0], languages);
        expect(summary.file).toBe('one.md');
    });
});

describe('with two files (a translation)', () => {
    const files = ['one.md', 'one_es.md'];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages).toEqual(['es']);
    });

    test('getNativeFiles', () => {
        const nativeFiles = helper.getNativeFiles(files);
        expect(nativeFiles).toEqual(['one.md']);
    });

    test('fileSummary', () => {
        const languages = helper.searchLanguages(files);
        const summary = helper.fileSummary(files, 'one.md', languages);
        expect(summary.file).toBe('one.md');
        expect(summary['es']).toEqual('exists');
    });
});

describe('with two files (just one with translation)', () => {
    const files = ['one.md', 'one_es.md', 'two.md'];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages).toEqual(['es']);
    });

    test('getNativeFiles', () => {
        const nativeFiles = helper.getNativeFiles(files);
        expect(nativeFiles).toEqual(['one.md', 'two.md']);
    });

    test('fileSummary', () => {
        const languages = helper.searchLanguages(files);
        let summary = helper.fileSummary(files, 'one.md', languages);
        expect(summary.file).toBe('one.md');
        expect(summary['es']).toEqual('exists');
        summary = helper.fileSummary(files, 'two.md', languages);
        expect(summary.file).toBe('two.md');
        expect(summary['es']).toEqual('missing translation');
    });
});

describe('with two files (just one with translation (es, en))', () => {
    const files = ['one.md', 'one_es.md', 'two.md', 'two_en.md'];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages).toEqual(['es', 'en']);
    });

    test('getNativeFiles', () => {
        const nativeFiles = helper.getNativeFiles(files);
        expect(nativeFiles).toEqual(['one.md', 'two.md']);
    });

    test('fileSummary', () => {
        const languages = helper.searchLanguages(files);
        let summary = helper.fileSummary(files, 'one.md', languages);
        expect(summary.file).toBe('one.md');
        expect(summary['es']).toEqual('exists');
        expect(summary['en']).toEqual('missing translation');
        summary = helper.fileSummary(files, 'two.md', languages);
        expect(summary.file).toBe('two.md');
        expect(summary['en']).toEqual('exists');
        expect(summary['es']).toEqual('missing translation');
    });
});

describe('with two files (full translated (es, en))', () => {
    const files = ['one.md', 'one_es.md', 'one_en.md', 'two.md', 'two_es.md', 'two_en.md'];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages).toEqual(['es', 'en']);
    });

    test('getNativeFiles', () => {
        const nativeFiles = helper.getNativeFiles(files);
        expect(nativeFiles).toEqual(['one.md', 'two.md']);
    });

    test('fileSummary', () => {
        const languages = helper.searchLanguages(files);
        let summary = helper.fileSummary(files, 'one.md', languages);
        expect(summary.file).toBe('one.md');
        expect(summary['es']).toEqual('exists');
        expect(summary['en']).toEqual('exists');
        summary = helper.fileSummary(files, 'two.md', languages);
        expect(summary.file).toBe('two.md');
        expect(summary['en']).toEqual('exists');
        expect(summary['es']).toEqual('exists');
    });
});

describe('with two files (full translated (es, en)) in folders', () => {
    const files = [
        'docs/one.md',
        'docs/one_es.md',
        'docs/one_en.md',
        'docs/folder/two.md',
        'docs/folder/two_es.md',
        'docs/folder/two_en.md',
    ];
    const helper = new ts.TranslationSummary();

    test('searchLanguages', () => {
        const languages = helper.searchLanguages(files);
        expect(languages).toEqual(['es', 'en']);
    });

    test('getNativeFiles', () => {
        const nativeFiles = helper.getNativeFiles(files);
        expect(nativeFiles).toEqual(['docs/one.md', 'docs/folder/two.md']);
    });

    test('fileSummary', () => {
        const languages = helper.searchLanguages(files);
        let summary = helper.fileSummary(files, 'docs/one.md', languages);
        expect(summary.file).toBe('docs/one.md');
        expect(summary['es']).toEqual('exists');
        expect(summary['en']).toEqual('exists');
        summary = helper.fileSummary(files, 'docs/folder/two.md', languages);
        expect(summary.file).toBe('docs/folder/two.md');
        expect(summary['en']).toEqual('exists');
        expect(summary['es']).toEqual('exists');
    });
});
