const webpackFactory = require('./webpack.factory');
const projectConfig = require('../config');

// Passed in as the config file for testing
module.exports = webpackFactory(projectConfig, {
  build: false,
  test: true
});
