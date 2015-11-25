function isObject(value) {
  return value !== null && typeof value === 'object';
}

module.exports = isObject;
