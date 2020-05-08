const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack-base.config');
const project = require('./project.config');

const { compiler_linter: __LINT__, globals, argv } = project;
const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    writeToDisk: true,
    contentBase: project.paths.dist(),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        project.paths.dist(),
        path.join(__dirname, '/archive'),
      ],
    }),
    new MiniCSSExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].css',
    }),
    new webpack.DefinePlugin({ ...globals, ARGV: JSON.stringify(argv) }),
    new WebpackMd5Hash(),
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: project.paths.client('index.html'),
    }),
    new StyleLintPlugin({
      configFile: project.paths.base('stylelint.config.js'),
      context: project.paths.client(),
      files: '**/*.css',
      emitErrors: false,
    }),
    new CopyPlugin([{ from: 'public/*', to: '[name].[ext]', flatten: true }]),
  ],
});

if (__LINT__) {
  webpackConfig.module.rules.push({
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    exclude: /src\/static/,
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
}

module.exports = webpackConfig;