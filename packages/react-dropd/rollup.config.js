import path from 'path'
const { createRollupConfig } = require('../../util')

export default createRollupConfig({
  external: ['react', 'prop-types'],
  dirname: __dirname,
  input: path.join(__dirname, '/index.js'),
})
