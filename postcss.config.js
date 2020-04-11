module.exports = () => {
  const importPaths = [];
  return {
    sourceMap: true,
    plugins: {
      autoprefixer: {},
      'postcss-import': { path: importPaths },
      'postcss-preset-env': {
        autoprefixer: { grid: true },
        features: { 'nesting-rules': true },
        browsers: [
          'last 2 versions',
          'not dead',
          'not <2%', // Added to allow edge to lag behind like it does anyways. https://rally1.rallydev.com/#/detail/defect/375874816892?fdp=true
          'last 4 Edge versions',
        ],
        stage: 3,
      },
      'postcss-apply': {},
      'postcss-nesting': {},
      'postcss-color-mod-function': {},
      'postcss-focus-within': {},
      'postcss-reporter': {},
      'postcss-custom-media': {},
      cssnano: {},
      'postcss-url': { url: 'inline', fallback: 'copy' },
    },
  };
};
