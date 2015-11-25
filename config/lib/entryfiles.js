function entryFiles(entry, file) {
  var name = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));

  entry[name] = file;
  return entry;
}

module.exports = entryFiles;
