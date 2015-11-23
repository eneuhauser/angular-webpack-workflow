/**
 * This files configures webpack for the given environment.
 */

// Node
const path = require('path');

// NPM
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Webpack Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Settings for the babel-loader.
 * @see https://github.com/babel/babel-loader
 * @see https://babeljs.io/docs/plugins/#presets
 */
const babelLoader = 'babel-loader?presets[]=es2015&presets[]=stage-1';

/**
 * Function to take options to build the webpack configuration.
 * @param options can be expressed as either ...rest or individual arguments.
 */
module.exports = function makeWebPackConfig(/* options */) {

  const opts = assign({
    build: false,
    test: false,
    typescript: true,
    baseDir: path.normalize(__dirname + '/../..'),
    server: {
      port: '4200'
    }
  }, Array.prototype.slice.call(arguments, 0));

  return {
    context: opts.baseDir,
    entry: entry(opts),
    output: output(opts),
    module: {
      loaders: loaders(opts),
      preLoaders: preLoaders(opts)
    },
    resolve: resolve(opts),
    devtool: devtool(opts),
    devServer: devServer(opts),
    plugins: plugins(opts),
    postcss: postcss(opts)
  };

};


/** @see http://webpack.github.io/docs/configuration.html#entry */
function entry(opts) {
  // Karma will set this during test build
  if(opts.test) { return {}; }

  const ext = opts.typescript ? '.ts' : '.js';
  return [ './client/styles/app.scss', './client/app' + ext ];
}

/** @see http://webpack.github.io/docs/configuration.html#output */
function output(opts) {
  // Karma will set this during test build
  if(opts.test) { return {}; }

  return {
    path: path.resolve(opts.baseDir, 'dist'),
    publicPath: '/assets/',
    filename: opts.build ? '[name].[hash].js' : '[name].bundle.js'
  };
}

/** @see http://webpack.github.io/docs/configuration.html#module-loaders */
function loaders(opts) {
  const loaders = [];

  if(opts.typescript) {
    /**
     * Compiles typescript files into ES6, then compiles ES6 to ES5 with Babel.
     * @see https://github.com/TypeStrong/ts-loader
     * @see https://github.com/babel/babel-loader
     */
    loaders.push({
      test: /\.tsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [babelLoader, 'ts-loader']
    });
  }

  /**
   * Compiles ES6 JS into ES5.
   * @see https://github.com/babel/babel-loader
   */
  loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: babelLoader
  });

  /**
   * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
   * Rename the file using the asset hash
   * Pass along the updated reference to your code
   * You can add here any file extension you want to get copied to your output
   * @see https://github.com/webpack/file-loader
   */
  loaders.push({
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'file'
  });

  /**
   * Allow loading html through js.
   * @see https://github.com/webpack/raw-loader
   */
  loaders.push({
    test: /\.html$/,
    loader: 'raw'
  });

  if(!opts.test) {
    /**
    * Use style-loader in development for hot-loading.
    * @see https://github.com/webpack/style-loader
    */
    loaders.push({
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'postcss-loader',
        'sass-loader?includePaths[]=' + path.resolve(opts.baseDir, './client/styles')
      ].join('!'))
    });
  }

  return loaders;
}

/** @see http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders */
function preLoaders(opts) {
  const preloaders = [];

  if(opts.test) {
    /**
     * ISPARTA LOADER
     * Instrument JS files with Isparta for subsequent code coverage reporting
     * Skips node_modules and files that end with .test.js
     * @see https://github.com/ColCh/isparta-instrumenter-loader
     */
    preloaders.push({
      test: opts.typescript ? /\.[jt]sx?$/ : /\.jsx?$/,
      exclude: [
        /node_modules/,
        opts.typescript ? /\.test\.[jt]sx?$/ : /\.test\.jsx?$/
      ],
      loader: 'isparta-instrumenter'
    });
  }

  return preloaders;
}

/** @see http://webpack.github.io/docs/configuration.html#resolve */
function resolve(opts) {
  const extensions = ['', '.webpack.js', '.web.js', '.js', '.scss'];
  if(opts.typescript) {
    extensions.push('.ts');
    extensions.push('.tsx');
  }

  return {
    extensions: extensions
  };
}

/** @see http://webpack.github.io/docs/configuration.html#devtool */
function devtool(opts) {
  if(opts.test) { return 'inline-source-map'; }

  return opts.build ? 'source-map' : 'eval';
}

/** @see http://webpack.github.io/docs/configuration.html#devserver */
function devServer(opts) {
  const server = {
    port: opts.server.port,
    contentBase: './public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  if(isObject(opts.server.proxy)) {
    server.proxy = {};
    server.proxy[opts.server.proxy.path] = {
      target: opts.server.proxy,
      secure: false
    };
  }
  return server;
}

/** @see http://webpack.github.io/docs/configuration.html#plugins */
function plugins(opts) {
  const plugins = [];

  /**
   * Extract css files
   * @see https://github.com/webpack/extract-text-webpack-plugin
   */
  plugins.push(new ExtractTextPlugin('[name].css', {
    disable: !opts.build || opts.test
  }));

  if(opts.build) {

    /**
     * Identifies common modules and put them into a commons chunk
     * @see https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons.js"));

    /**
     * Identifies common modules and put them into a commons chunk
     * @see https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons.css"));

    /**
     * Only emit files when there are no errors
     * @see http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
     */
    plugins.push(new webpack.NoErrorsPlugin());

    /**
     * Dedupe modules in the output
     * @see http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
     */
    plugins.push(new webpack.optimize.DedupePlugin());

    /**
     * Minify all javascript, switch loaders to minimizing mode
     * @see http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    plugins.push(new webpack.optimize.UglifyJsPlugin());

  }

  /**
    * Assign the module and chunk ids by occurrence count. Ids that are used
    * often get lower (shorter) ids. This make ids predictable, reduces to
    * total file size and is recommended.
    * @see http://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
    */
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());

  return plugins;
}

/** @see */
function postcss(opts) {
  return [

    /**
     * Add vendor prefixes to your css
     * @see https://github.com/postcss/autoprefixer-core
     */
    autoprefixer({
      browsers: ['last 2 versions']
    })

  ];
}

/* ***** HELPERS ***** */

/**
 * Similar to Object.assign in ES6. Needed a new function because Object.assign
 * is not working in the npm script. This does have additional features:
 *
 * - Creates new instaces of objects and arrays from the source
 * - Does a deep clone
 * - Allows sources to be passed in either "Rest" or as an array
 *
 */
function assign(/*target, ...sources*/) {
  var sources = Array.prototype.slice.call(arguments, 0);
  const target = sources.shift() || {};
  if(sources.length === 1 && Array.isArray(sources[0])) {
    sources = sources[0];
  }
  sources.forEach(function(source) {
    if(!isObject(source)) { return true; }

    Object.keys(source).forEach(function(prop) {
      if(!source.hasOwnProperty(prop)) { return true; }

      const value = source[prop];
      if(Array.isArray(value)) {
        target[prop] = Array.prototype.slice.call(value, 0);
      } else if(isObject(value)) {
        if(!isObject(target[prop])) {
          target[prop] = {};
        }
        assign(target[prop], value);
      } else {
        target[prop] = value;
      }
    });
  });
  return target;
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}
