'use strict';

let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'public/build/');
let APP_DIR = path.resolve(__dirname, 'src/');

let allPlugins = [];

if(process.env.NODE_ENV === 'dev') {
  allPlugins.push(new webpack.HotModuleReplacementPlugin());
}

let config = {
  entry: {
    main: [
      'babel-polyfill',
      APP_DIR
    ],
  },
  output: {
    path: BUILD_DIR,
    publicPath:'http://localhost:3000/build/',
    filename: 'bundle.js'
  },
  module : {
   loaders : [
     {
       test : /\.jsx?/,
       include : APP_DIR,
       loader : 'babel-loader'
     },
     {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     }
   ]
 }
};

module.exports = config;
