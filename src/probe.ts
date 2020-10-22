import { TranslationSummary } from './translation-summay';

const helper = new TranslationSummary();
const summary = helper.getSummary();

console.table(summary);
