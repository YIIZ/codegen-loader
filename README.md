# code-loader
Evaluate js(in Node) and export as source code.


## Usage

app.js
```js
import { buildInfo } from '!!code-loader!./macro'
console.log(buildInfo) // 1.0.0#184a33
```

macro.js
```js
const { version } = require('./package.json')
const hash = require('child_process').execSync('git rev-parse HEAD')
const info = `${version}#${hash.slice(0, 6)}`

module.exports = `
export const buildInfo = ${JSON.stringify(info)}
`
```
