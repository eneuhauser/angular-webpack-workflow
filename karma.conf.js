/** @see http://karma-runner.github.io/0.12/config/configuration-file.html */
module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: basePath,

    /** @see https://npmjs.org/browse/keyword/karma-adapter */
    frameworks: [
      /** @see https://github.com/karma-runner/karma-jasmine */
      'jasmine'
    ],

    /** @see https://npmjs.org/browse/keyword/karma-reporter */
    reporters: [

      /**
       * Set reporter to print detailed results to console.
       * @see https://github.com/mlex/karma-spec-reporter
       */
      'spec',

      /**
       * Output code coverage files.
       * @see https://github.com/karma-runner/karma-coverage
       */
      'coverage'
    ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      // Grab all files in the app folder that contain .spec.
      'config/test.config.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'config/test.config.js': ['webpack', 'sourcemap']
    },

    /** @see https://npmjs.org/browse/keyword/karma-launcher */
    browsers: [ 'PhantomJS' ],

    autoWatch: false,
    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },

    webpack: require('./config/webpack/webpack.test'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
};
