#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const pkg = require('../package.json');
console.log('version:', pkg.version);
console.log('');

// check if a new version of ncu is available and print an update notification
const notifier = updateNotifier({ pkg })
if (notifier.update && notifier.update.latest !== pkg.version) {
    notifier.notify({ defer: false, isGlobal: true })
}

const ts = require('../lib/translation-summary');
const helper = new ts.TranslationSummary();
const summary = helper.getSummary();
console.table(summary);