module.exports = {
  root: true,
  env: {
    amd: true,
    node: true,
  },
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-case-declarations': 'off',
    'comma-dangle': ['off', 'always'],
    semi: ['warn', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
