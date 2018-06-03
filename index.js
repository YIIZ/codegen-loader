// refs
// https://stackoverflow.com/a/17585470/1793548
// https://github.com/floatdrop/require-from-string
const Module = require('module')
const path = require('path')

module.exports = function (code) {
  const filename = this.resourcePath

  const m = new Module(filename)
  m.filename = filename
  m.paths = Module._nodeModulePaths(path.dirname(filename))
  m._compile(code, filename)

  // watch
  const dep = ({ children }) => {
    for (const m of children) {
      // TODO fix update after dep crash
      this.addDependency(m.filename)
      // clear cache
      // https://stackoverflow.com/a/11477602/1793548
      delete require.cache[m.filename]
      if (m.children.length) dep(m)
    }
  }
  dep(m)

  const result = m.exports
  if (typeof result !== 'string') throw new Error('exports must be a string')
  return result
}
