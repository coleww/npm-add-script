var fs = require('fs')

function splicey (stir, idx, rem, insert) {
  return (stir.slice(0, idx) + insert + stir.slice(idx + Math.abs(rem)))
};

module.exports = function (script) {
  var scripty = '"' + script.key + '": "' + script.value + '"'
  // console.log('script', scripty)
  try {
    var packaged = fs.readFileSync('package.json').toString()
    // console.log('packd', packaged)
    var newPackage
    var scriptMatch = packaged.match('"scripts":')
    // console.log('smatch', scriptMatch)
    if (scriptMatch) { // already a scripts entry in this package.
      newPackage = splicey(packaged, scriptMatch.index + 17, 0, scripty + ',\n    ')
    } else { // we gotta make a scripts entry, oh gosh, wow
      var scriptys = '\"scripts\": {\n    ' + scripty + '\n  },\n  '
      // just insert it first in the list...or wherever the name entry was.
      // if there is no name entry for some reason, goes to the catch block which will fix it
      newPackage = splicey(packaged, packaged.match('"name":').index, 0, scriptys)
      console.log(packaged, packaged.match('"name":').index, 0, scriptys)
      console.log(splicey(packaged, packaged.match('"name":').index, 0, scriptys))
    }
    // console.log('new', newPackage)
    fs.writeFileSync('package.json', newPackage)
  } catch (e) {
    // console.log('whoops you are not in a node project, cmon now.')
    // console.log('run npm init first, yo!')
  }
}
