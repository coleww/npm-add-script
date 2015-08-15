var tap = require('tap')

var npmAddScript = require('./')

tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(npmAddScript('world'), 'hello world', 'does it')
})
