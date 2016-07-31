import autoprefixer from 'autoprefixer';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import postcssSimpleVars from 'postcss-simple-vars';
import webpack from 'webpack';
import cssGlobalVariables from './src/constants/cssGlobalVariables';

let environment = process.env.NODE_ENV;
let commonConfiguration = {
  entry: {
    bundle: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: './build',
    filename: "[name]-[hash].js",
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  postcss() {
    return [
      autoprefixer,
      postcssSimpleVars({ variables: cssGlobalVariables })
    ];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(environment) }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/static/index.tmpl.html"
    })
  ]
};

let productionConfiguration = {
  module: {
    loaders: [
      ...commonConfiguration.module.loaders,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1', 'postcss'])
      }
    ]
  },
  plugins: [
    ...commonConfiguration.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css"),
    new CleanPlugin('build')
  ]
};

let developmentConfiguration = {
  module: {
    loaders: [
      ...commonConfiguration.module.loaders,
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1', 'postcss']
      }
    ]
  },
  plugins: [
    ...commonConfiguration.plugins,
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    inline: true
  }
};

let configuration;
switch (environment) {
  case 'production':
    configuration = Object.assign({}, commonConfiguration, productionConfiguration);
    break;
  default:
    configuration = Object.assign({}, commonConfiguration, developmentConfiguration);
}

export default configuration;
