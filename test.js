var tap = require('tap')
var fs = require('fs')
var exec = require('child_process').exec

var npmAddScript = require('./')

// THESE TWO TESTS DO NOT LIKE EACH OTHER, NOT ONE BIT I TELL YOOOOOOO

// testWithExistingScriptsEntry(testWithNoScriptsEntry)
testWithNoScriptsEntry()
function testWithExistingScriptsEntry (cb) {
  tap.test('does the thing with existing script', function (t) {
    t.plan(2)

    fs.writeFileSync('SAFEpackage.json', fs.readFileSync('package.json'))

    try {
      npmAddScript({key: 'testy', value: 'node pseudo_test.js'})

      t.ok(fs.readFileSync('package.json').toString().match('"testy": "node pseudo_test.js",'), 'adds the stuff')

      exec('npm run testy', function (error, stdout, stderr) {
        t.ok(!error, 'runs the added script')
        fs.unlinkSync('package.json')
        fs.renameSync('SAFEpackage.json', 'package.json')
      })
    } catch (e) {
      fs.unlinkSync('package.json')
      fs.renameSync('SAFEpackage.json', 'package.json')
    } finally {
      cb()
    }
  })
}

function testWithNoScriptsEntry () {
  tap.test('does the thing with no scripts', function (t) {
    t.plan(2)

    fs.writeFileSync('superSAFEpackage.json', fs.readFileSync('package.json'))
    fs.unlinkSync('package.json')
    fs.writeFileSync('package.json', fs.readFileSync('empty.json'))

    try {
      npmAddScript({key: 'testy', value: 'node pseudo_test.js'})

      t.ok(fs.readFileSync('package.json').toString().match('"testy": "node pseudo_test.js"'), 'adds the stuff')

      exec('npm run testy', function (error, stdout, stderr) {
        t.equal(error, 'runs the added script')
        fs.unlinkSync('package.json')
        fs.renameSync('superSAFEpackage.json', 'package.json')
      })
    } catch (e) {
      fs.unlinkSync('package.json')
      fs.renameSync('superSAFEpackage.json', 'package.json')
    }
  })
}
