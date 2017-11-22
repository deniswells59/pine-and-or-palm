'use strict';

let merge = require('webpack-merge');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let common = require('./webpack.config.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
