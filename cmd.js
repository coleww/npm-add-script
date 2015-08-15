#!/usr/bin/env node

var npmAddScript = require('./')

var argv = require('yargs')
  .alias('h', 'help')
  .help('help')
  .usage('--~~===////|||||NPM-ADD-SCRIPT|||||\\\\\\\\\\===~~--\n           - add scripts to yr package.json\'s!')
  .example('npmAddScript -k test -v "node test.js"')
  .alias('k', 'key')
  .alias('v', 'value')
  .describe('k', 'the name of your script')
  .describe('v', 'your script')
  .demand('k')
  .demand('v')
  .argv

try {
  npmAddScript({key: argv.k, value: argv.v})
  process.stdout.write('ADDED ' + argv.k + ' TO YOUR PACKAGE dot JASON')
  process.stdout.write('\n')
  process.exit()
} catch (e) {
  process.stdout.write('Encounted a wild ' + e.name + '!!!\nThis error is carrying a note that reads as follows:\n------------\n' + e.message)
  process.stdout.write('\n')
  process.exit(1)
}
