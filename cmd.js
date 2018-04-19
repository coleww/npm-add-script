#!/usr/bin/env node

var npmAddScript = require('./')

var argv = require('yargs')
  .alias('h', 'help')
  .help('help')
  .usage('--~~===////|||||NPM-ADD-SCRIPT|||||\\\\\\\\\\===~~--\n           - add scripts to yr package.json\'s!')
  .example('npmAddScript -k test -v "node test.js"')
  .alias('k', 'key')
  .alias('v', 'value')
  .boolean('f')
  .alias('f', 'force')
  .boolean('r')
  .alias('r', 'root')
  .describe('k', 'the name of your script')
  .describe('v', 'your script')
  .describe('f', 'force overwrite if script key already exists')
  .describe('r', 'will add the key in the package.json in the parent project')
  .demand('k')
  .demand('v')
  .argv

try {
  npmAddScript({key: argv.k, value: argv.v, force: argv.f})
  process.stdout.write('ADDED ' + argv.k + ' TO YOUR PACKAGE dot JSON')
  process.stdout.write('\n')
  process.exit()
} catch (e) {
  process.stdout.write('Encounted a wild ' + e.name + '!!!\nThis error is carrying a note that reads as follows:\n------------\n' + e.message)
  process.stdout.write('\n')
  process.exit(1)
}
