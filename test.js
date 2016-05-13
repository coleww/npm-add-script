var tap = require('tap')
var fs = require('fs')
var exec = require('child_process').exec

var npmAddScript = require('./')

// THESE //T/W/O// THREE TESTS DO NOT LIKE EACH OTHER, NOT ONE BIT I TELL YOOOOOOO

var funkies = [testWithExistingScriptsEntry, testWithNoScriptsEntry, testWithAScriptsClash, testWithAScriptsClashUsingForce, testWithnoPackage] // this is officially convoluted

function testIt () {
  if (funkies.length) funkies.pop()(testIt, function () {})
}

testIt()

function testWithExistingScriptsEntry (cb, err) {
  tap.test('does the thing with existing script', function (t) {
    t.plan(2)

    fs.writeFileSync('SAFEpackage.json', fs.readFileSync('package.json'))

    try {
      npmAddScript({key: 'testy', value: 'node pseudo_test.js'})
      t.ok(fs.readFileSync('package.json').toString().match('"testy": "node pseudo_test.js"'), 'adds the stuff')
      exec('npm run testy', function (error, stdout, stderr) {
        t.ok(!error, 'runs the added script')
        fs.unlinkSync('package.json')
        fs.renameSync('SAFEpackage.json', 'package.json')
        cb()
      })
    } catch (e) {
      fs.unlinkSync('package.json')
      fs.renameSync('SAFEpackage.json', 'package.json')
      err()
    }
  })
}

function testWithNoScriptsEntry (cb, err) {
  tap.test('does the thing with no scripts', function (t) {
    t.plan(2)

    fs.writeFileSync('superSAFEpackage.json', fs.readFileSync('package.json'))
    fs.unlinkSync('package.json')
    fs.writeFileSync('package.json', fs.readFileSync('empty.json'))

    try {
      npmAddScript({key: 'testy', value: 'node pseudo_test.js'})

      t.ok(fs.readFileSync('package.json').toString().match('"testy": "node pseudo_test.js"'), 'adds the stuff')

      exec('npm run testy', function (error, stdout, stderr) {
        t.ok(!error, 'runs the added script')
        fs.unlinkSync('package.json')
        fs.renameSync('superSAFEpackage.json', 'package.json')
        cb()
      })
    } catch (e) {

      fs.unlinkSync('package.json')
      fs.renameSync('superSAFEpackage.json', 'package.json')
      err()
    }
  })
}

function testWithAScriptsClash (cb, err) {
  tap.test('does the thing with duplicate scripts', function (t) {
    t.plan(1)

    fs.writeFileSync('superDuperSAFEpackage.json', fs.readFileSync('package.json'))
    try {
      npmAddScript({key: 'test', value: 'node pseudo_test.js'})
      err()
    } catch (e) {
      t.ok(fs.readFileSync('package.json').toString().match('"test": "standard && node test.js"'), 'does not override the old stuff, instead it throws an error')
      fs.unlinkSync('package.json')
      fs.renameSync('superDuperSAFEpackage.json', 'package.json')
      cb()
    }
  })
}

function testWithAScriptsClashUsingForce (cb, err) {
  tap.test('using --force, replaces an existing script', function (t) {
    t.plan(2)

    fs.writeFileSync('SAFEpackage.json', fs.readFileSync('package.json'))

    try {
      npmAddScript({key: 'test', value: 'node replaced_test.js', force: true})
      t.ok(fs.readFileSync('package.json').toString().match('"test": "node replaced_test.js"'), 'adds the stuff')
      exec('npm run test', function (error, stdout, stderr) {
        t.ok(!error, 'runs the added script')
        fs.unlinkSync('package.json')
        fs.renameSync('SAFEpackage.json', 'package.json')
        cb()
      })
    } catch (e) {
      fs.unlinkSync('package.json')
      fs.renameSync('SAFEpackage.json', 'package.json')
      err()
    }
  })
}

function testWithnoPackage (cb, err) {
  tap.test('does the thing with no package', function (t) {
    t.plan(1)

    fs.writeFileSync('superDuperSAFEpackage.json', fs.readFileSync('package.json'))
    fs.unlinkSync('package.json')
    try {
      npmAddScript({key: 'test', value: 'node pseudo_test.js'})
      err()
    } catch (e) {
      t.ok(true, 'throws a helpful error if no package.json exists')
      fs.renameSync('superDuperSAFEpackage.json', 'package.json')
      cb()
    }
  })
}
