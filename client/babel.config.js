module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          targets: {
            browsers: [
              'last 2 versions',
              'not dead',
              'not <2%', // Added to allow edge to lag behind like it does anyways. https://rally1.rallydev.com/#/detail/defect/375874816892?fdp=true
              'last 4 Edge versions',
            ],
            esmodules: false,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { regenerator: true }],
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
