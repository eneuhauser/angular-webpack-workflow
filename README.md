# Angular 1.x WebPack + TypeScript + Babel workflow

This workflow serves as a starting point for building Angular 1.x applications using WebPack and TypeScript. Should be noted that apart from the pre-installed angular package, this workflow is pretty much generic.

Forked from [angular-webpack-workflow](https://github.com/Foxandxss/angular-webpack-workflow), which is a direct port of the amazing [react workflow](https://github.com/cesarandreu/web-app) of [Cesar Andreu](https://github.com/cesarandreu). New testing features inspired by [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).

## Features

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.js.
* TypeScript support to ES6, then transpiled with babel.js.
* SASS support.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting and asset minification.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm run-scripts.

## Installation

To use it, just clone this repo and install the npm dependencies:

```shell
$ git clone https://github.com/eneuhauser/angular-webpack-workflow my_app
$ cd my_app
$ npm install
```

## Scripts

All scripts are run with `npm run [script]`, for example: `npm run test`.

* `build` - generate a minified build to dist folder
* `dev` - start development server, try it by opening `http://localhost:8080/`
* `test` - run all tests
* `test:live` - continuously run unit tests watching for changes

See what each script does by looking at the `scripts` section in [package.json](./package.json).

## Usage

To install new packages:

```shell
$ npm install [package] --save
$ tsd install [package] --save
```

*`tsd` requires that you have it installed globally `npm install -g tsd`.*

## Example and tutorial

To see how to structure an Angular 1.x application using this workflow, please check [this demo](https://github.com/Foxandxss/GermanWords-ng1-webpack).

Also, there is an article in [angular-tips](http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/)
