const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getHtmlPlugins = (filenames) =>
  filenames.map((file) => new HtmlWebpackPlugin({
    filename: `${file}.html`,
    chunks: [file],
    cache: false
  }));

module.exports = {
  entry: {
    background: path.resolve('src/scripts/background/index.ts'),
    contentscript: path.resolve('src/scripts/content/index.ts'),
    devtools: path.resolve('src/pages/devtools/index.ts'),
    newtab: path.resolve('src/pages/newtab/index.tsx'),
    options: path.resolve('src/pages/options/index.tsx'),
    panel: path.resolve('src/pages/panel/index.tsx'),
    popup: path.resolve('src/pages/popup/index.tsx'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.(tsx|.ts)?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['devtools', 'newtab', 'options', 'panel', 'popup'])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
