require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname);
var assetsPath = path.resolve(projectRootPath, './dest');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    common: ['./src/index.js'],
  },
  externals: ['react', 'react-router', 'classnames'],
  output: {
    path: assetsPath,
    filename: 'lib.js',
    chunkFilename: 'lib.js',
    publicPath: '/dest/',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
            'css-loader?-autoprefixer&modules&importLoaders=2&localIdentName=_[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded',
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer&importLoaders=1!postcss-loader'),
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'base64-inline-loader?limit=50000&name=[name].[ext]',
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss', '.json', '.jsx'],
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('lib.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),

    webpackIsomorphicToolsPlugin,
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|zh-tw)$/),
  ],
  node: {
    fs: 'empty',
  },
};
