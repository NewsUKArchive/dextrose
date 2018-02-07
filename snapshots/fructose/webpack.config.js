/* eslint-disable global-require */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../index.web.js')
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.ios.js', '.android.js'],
    mainFields: ['module', 'main']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
