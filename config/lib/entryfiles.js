export default function(entry, file) {
  const name = file.substr(0, file.indexOf('.'));

  entry[name] = file;

  return entry;
}
