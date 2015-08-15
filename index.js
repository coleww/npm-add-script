var fs = require('fs')

function ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError () {
  this.name = 'ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError'
  this.message = 'My friend:\n  it seems as though the script entry you have specified,\n  is already present in the package.json file,\n  of your current working directory.\n  Please try again,\n  or amend this egregious error.\nThank You.'
}

ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError.prototype = new Error()
ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError.prototype.constructor = ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError

function splicey (stir, idx, rem, insert) {
  return (stir.slice(0, idx) + insert + stir.slice(idx + Math.abs(rem)))
}

module.exports = function (script) {
  var scripty = '"' + script.key + '": "' + script.value + '"'
  try {
    var packaged = fs.readFileSync('package.json').toString()
    var newPackage
    var scriptMatch = packaged.match('"scripts":')
    if (scriptMatch) { // already a scripts entry in this package.

      var scrips = packaged.slice(scriptMatch.index)
      scrips = scrips.slice(0, scrips.match('}').index)
      if (scrips.match(script.key)) {
        throw new ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError()
      } else {
        newPackage = splicey(packaged, scriptMatch.index + 17, 0, scripty + ',\n    ')
      }

    } else { // we gotta make a scripts entry, oh gosh, wow
      var scriptys = '\"scripts\": {\n    ' + scripty + '\n  },\n  '
      // just insert it first in the list...or wherever the name entry was.
      // if there is no name entry for some reason, goes to the catch block which will fix it
      newPackage = splicey(packaged, packaged.match('"name":').index, 0, scriptys)
    }
    fs.writeFileSync('package.json', newPackage)
  } catch (e) {
    if (e.name === 'ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError') {
      throw e
    } else {
      console.log('whoops you are not in a node project, cmon now.')
      console.log('run npm init first, yo!')
    }
  }
}
