#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const pkg = require('../package.json');
const cliOptions = require('./options.js');
const ts = require('../lib/translation-summary');
const tso = require('../lib/options');
console.log('version:', pkg.version);

// check if a new version of ncu is available and print an update notification
const notifier = updateNotifier({ pkg })
if (notifier.update && notifier.update.latest !== pkg.version) {
    notifier.notify({ defer: false, isGlobal: true })
}


const commandLineArgs = require('command-line-args');
const options = commandLineArgs(cliOptions);

var tsConfig = null;

if (options.config) {
    tsConfig = require(`${process.cwd()}/${options.config}`);
}

const tsOptions = new tso.Options(tsConfig);
const helper = new ts.TranslationSummary(tsOptions);
const summary = helper.getSummary();
console.table(summary);
