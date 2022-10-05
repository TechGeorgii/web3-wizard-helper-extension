const { merge } = require('webpack-merge');
const base = require('./webpack.common');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
});
