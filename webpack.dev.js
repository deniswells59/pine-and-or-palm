'use strict';

let merge = require('webpack-merge');
let webpack = require('webpack');
let common = require('./webpack.config.js');

module.exports = merge(common, {
  devServer: {
    hot: true
  }
});
