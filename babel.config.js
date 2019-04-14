module.exports = {
  "env": {
    "test": {
      "presets": ['@babel/env', '@babel/react'],
      "plugins": [
        "babel-plugin-dynamic-import-node"
      ]
    }
  },
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'syntax-dynamic-import'
  ]
}
