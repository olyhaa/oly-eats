const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.config');

const { globals } = project;
const { __DEV__ } = globals;
const output = {
  filename: 'static/js/[name].[contenthash].js',
  chunkFilename: 'static/js/[name].[chunkhash].js',
  publicPath: '/',
  path: project.paths.dist(),
};
// Style Loaders
const styleLoaders = () => {
  return [
    {
      loader: MiniCSSExtractPlugin.loader,
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
    emitOnErrors: false,
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
          name: './font/[contenthash].[ext]',
          mimetype: 'application/font-woff',
        },
      },
    ],
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: 'static/[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2',
        },
      },
    ],
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          prefix: 'fonts/',
          name: 'static/[path][name].[ext]',
          limit: 10000,
          mimetype: 'font/opentype',
        },
      },
    ],
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix: 'fonts/',
          name: 'static/[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
    ],
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          prefix: 'fonts/',
          name: 'static/[path][name].[ext]',
        },
      },
    ],
  },
  {
    test: /\.gif(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|ico)$/,
    include: /src(\/|\\)images/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/images/[name].[contenthash].[ext]',
        },
      },
    ],
  },
];

const plugins = [];

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
