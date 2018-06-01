const requireFromString = require('require-from-string')

module.exports = function (content) {
  return requireFromString(content, this.resourcePath)
}
