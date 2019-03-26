const { smart } = require('webpack-merge');
const common = require('./webpack.config');

const config = {
  devtool: 'inline-source-map',
  mode: 'development',
};

module.exports = smart(common, config);
