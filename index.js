var jsonfile = require('jsonfile')

function ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError (name) {
  this.name = 'ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError'
  this.message = 'My friend:\n  it seems as though the script entry you have specified,\n  "' + name + '"\n  is already present in the package.json file,\n  of your current working directory.\n  Please try again,\n  or amend this egregious error.\nThank You.'
}

ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError.prototype = new Error()
ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError.prototype.constructor = ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError

function YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error (name) {
  this.name = 'YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error'
  this.message = 'My friend:\n  it seems as though your current working directory\n  does not contain a package.json file,\n  and is therefore not a Node.js project.\n  Please run npm init,\n  in order to amend this tremendous violation.\nThank You.'
}

YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error.prototype = new Error()
YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error.prototype.constructor = YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error

module.exports = function (script) {
  try {
    var packaged = jsonfile.readFileSync('package.json')
    if (!packaged.scripts) packaged.scripts = {}
    if (!script.force && packaged.scripts[script.key]) {
      throw new ThatScriptsEntryAlreadyExistsThereInThePackageDotJsonMyFriendError(script.key)
    }
    packaged.scripts[script.key] = script.value
    jsonfile.writeFileSync('package.json', packaged, {spaces: 2})
  } catch (e) {
    if (e.message === 'ENOENT, no such file or directory \'package.json\'') {
      throw new YouDoNotAppearToBeInANodeProjectPerhapsUShouldRun_npm_init_error()
    } else {
      throw e
    }
  }
}
