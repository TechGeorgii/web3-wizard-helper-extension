const { merge } = require('webpack-merge');
const base = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'production',

  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(true),
    }),
  ],
});
