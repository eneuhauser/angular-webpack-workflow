/**
 * Similar to Object.assign in ES6. Needed a new function because Object.assign
 * is not working in the npm script. This does have additional features:
 *
 * - Creates new instaces of objects and arrays from the source
 * - Does a deep clone
 * - Allows sources to be passed in either "Rest" or as an array
 *
 */

var isObject = require('isObject');

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

module.exports = assign;
