const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack-base.config');
const project = require('./project.config');

const { globals, argv } = project;

// run server locally so it can be accessed by other devices on network
let devServerHost;
if (typeof argv.host === 'string') {
  devServerHost = argv.host;
} else {
  const os = require('os');
  devServerHost = os.networkInterfaces()['Ethernet'][1].address;
}
const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: devServerHost,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    writeToDisk: true,
    contentBase: project.paths.dist(),
  },
  plugins: [
    // delete all files in dist dir before build
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        project.paths.dist(),
        path.join(__dirname, '/archive'),
      ],
    }),
    // extract css into separate files per JS file
    new MiniCSSExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].css',
    }),
    // define global constants at compile time
    new webpack.DefinePlugin({ ...globals, ARGV: JSON.stringify(argv) }),
    // create html files following template
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: project.paths.client('index.html'),
    }),
    // display css linting errors during build
    new StyleLintPlugin({
      configFile: project.paths.base('stylelint.config.js'),
      context: project.paths.client(),
      files: '**/*.css',
    }),
    // move public files to dist dir
    new CopyPlugin({ patterns: [{ from: 'public/*', to: '[name].[ext]' }] }),
  ],
});

// display linting warnings during build
webpackConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'eslint-loader',
      options: {
        configFile: project.paths.base('.eslintrc.js'),
        emitWarning: true,
      },
    },
  ],
});

module.exports = webpackConfig;
