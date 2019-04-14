module.exports = {
  root: true,
  env: { es6: true, amd: true, node: true, browser: true, 'jest': true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-case-declarations': 'off',
    'comma-dangle': ['off', 'always'],
    semi: ['warn', 'never'],
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: { jsx: true },
  },
}
