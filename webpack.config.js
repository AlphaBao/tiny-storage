const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  entry: './index.js',
  output: {
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc',
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  }
};
