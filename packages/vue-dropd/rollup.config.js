import path from 'path'
import vue from 'rollup-plugin-vue'
const createConfig = require('../../createConfig').default

export default createConfig({
  plugins: [vue()],
  external: ['vue'],
  dirname: __dirname,
  input: path.join(__dirname, '/index.vue'),
})
