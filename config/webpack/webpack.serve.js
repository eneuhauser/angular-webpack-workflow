const webpackFactory = require('./webpack.factory');
const projectConfig = require('../config');

// Used by the webpack-dev-server to serve the files
module.exports = webpackFactory(projectConfig, {
  build: false,
  test: false
});
