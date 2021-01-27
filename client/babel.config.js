module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          targets: {
            esmodules: false,
          },
          corejs: 3,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { regenerator: true, corejs: 3 }],
      'add-module-exports',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      'react-hot-loader/babel',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-template-literals',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  };
};
