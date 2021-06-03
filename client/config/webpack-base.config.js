const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin');
const project = require('./project.config');

const { globals } = project;
const { __DEV__ } = globals;
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

const plugins = [
  new ObsoleteWebpackPlugin({
    nme: 'obsolete',
    promptnNonTargetBrowser: true,
    template:
      '<style>#content { text-align: center; background-color: #f7f7f7; color: #cc0000;} #obsoleteClose {font-size: x-large; color: #cc0000;} #download-link {text-decoration: underline;} </style></style><div id="content">Your web browser is unsupported. Please upgrade to the latest <a id="download-link" target="_blank" rel="noopener noreferrer" href="https://www.whatismybrowser.com">version.</a> <button id="obsoleteClose" aria-label="close">&times;</button></div>',
  }),
];

module.exports = {
  output,
  ...optimization,
  plugins,
  module: { rules: loaders },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [project.paths.client(), 'node_modules'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
};
