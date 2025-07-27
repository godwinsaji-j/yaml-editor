const lineMetadata = new Map();

function setLineMeta(line, pointer, absoluteRef) {
  lineMetadata.set(line, { pointer, absoluteRef });
}

function getLineMeta(line) {
  return lineMetadata.get(line);
}

function clearMeta() {
  lineMetadata.clear();
}

module.exports = { setLineMeta, getLineMeta, clearMeta };