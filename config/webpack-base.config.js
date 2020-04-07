require('@babel/polyfill');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const project = require('./project.config');

const { globals } = project;
const { __DEV__ } = globals;
const entry = ['@babel/polyfill', project.paths.client('index.jsx')];
const output = {
  filename: 'static/js/[name].[hash].js',
  chunkFilename: 'static/js/[name].[chunkhash].js',
  publicPath: '/',
  path: project.paths.dist(),
};
// Style Loaders
const styleLoaders = () => {
  return [
    {
      loader: MiniCSSExtractPlugin.loader,
      options: { hmr: __DEV__, reloadAll: true },
    },
    {
      loader: 'css-loader',
      options: { sourceMap: true, importLoaders: 1, import: false },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: { path: path.join(__dirname, '/postcss.config.js') },
      },
    },
  ].filter(Boolean);
};
const optimization = {
  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()],
  },
  performance: { hints: false },
};
const loaders = [
  {
    test: /\.(js|jsx)$/,
    include: [/shared/, project.paths.client()],
    exclude: /node_modules|static/,
    loader: 'babel-loader',
  },
  { test: /\.css$/, exclude: /src\/static/, use: styleLoaders() },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  {
    // Raw text loader
    test: /\.(txt|cer)$/,
    use: 'raw-loader',
    // is this correct or should it be in bracckers
  },
  // File loaders
  {
    test: /\.woff(2)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './font/[hash].[ext]',
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=static/[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
  },
  {
    test: /\.otf(\?.*)?$/,
    loader:
      'file-loader?prefix=fonts/&name=static/[path][name].[ext]&limit=10000&mimetype=font/opentype',
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=static/[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=static/[path][name].[ext]',
  },
  {
    test: /\.gif(\?.*)?$/,
    loader: 'file-loader',
    options: { name: '[path][name].[ext]' },
  },
  {
    test: /\.(png|jpg|ico)$/,
    include: /src(\/|\\)images/,
    loader: 'url-loader',
    options: { limit: 8192, name: 'static/images/[name].[hash].[ext]' },
  },
];
module.exports = {
  entry,
  output,
  ...optimization,
  module: { rules: loaders },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [project.paths.client(), project.paths.static(), 'node_modules'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
};
