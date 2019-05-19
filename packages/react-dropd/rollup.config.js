import path from 'path'
const { createConfig } = require('../../createConfig')

export default createConfig({
  external: ['react', 'prop-types'],
  dirname: __dirname,
  input: path.join(__dirname, '/index.js'),
})
