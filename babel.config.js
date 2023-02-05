module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ],
    plugins: [
      // ['@babel/plugin-syntax-decorators',{ decoratorsBeforeExport: true }],
      ["babel-plugin-transform-typescript-metadata"],
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }]

    ]
};