const webpackFactory = require('./webpack.factory');
const projectConfig = require('../config');

// Passed in as the config file for packaging for distribution
module.exports = webpackFactory(projectConfig, {
  build: true,
  test: false
});
