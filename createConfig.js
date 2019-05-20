const path = require('path')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const commonjs = require('rollup-plugin-commonjs')
const terser = require('rollup-plugin-terser').terser
const eslint = require('rollup-plugin-eslint').eslint
const resolve = require('rollup-plugin-node-resolve')
const sassVariablesToObject = require('rollup-plugin-sass-variables')

const formats = ['es', 'cjs']

const createConfig = opts => ({
  input: opts.input,
  external: [...(opts.external || [])],
  plugins: [
    postcss({ plugins: [] }),
    sassVariablesToObject(),
    babel({
      sourcemap: false,
      exclude: 'node_modules/**',
    }),
    eslint({
      include: opts.input,
      configFile: path.join(opts.dirname, '/.eslintrc.js'),
    }),
    // things might get complicated starting here...
    // please leave at current location.
    resolve({
      module: false,
      dedupe: ['react'],
      modulesOnly: false,
    }),
    commonjs({
      exclude: path.join(opts.dirname, '/**'),
      namedExports: {
        'node_modules/react/index.js': ['React'],
      },
    }),
    terser({ sourcemap: true }),
    ...(opts.plugins || []),
  ],
  output: [
    ...formats.map(format => ({
      format,
      file: path.join(opts.dirname, `/dist/index.${format}.js`),
      sourcemap: false,
    })),
    ...(opts.output || []),
  ],
})

module.exports.default = createConfig
