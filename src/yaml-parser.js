const YAML = require('yaml');
const { setLineMeta, clearMeta } = require('./metadata-store');

function parseAndStoreMetadata(docText) {
  clearMeta();
  const doc = YAML.parseDocument(docText);

  // @ts-ignore
  const items = doc.contents?.items || [];
  items.forEach((item, idx) => {
    const line = item.range?.[0] || idx;
    const pointer = `/${item?.key?.value || 'unknown'}`;
    const absoluteRef = `#${pointer}`;
    setLineMeta(line, pointer, absoluteRef);
  });
}

module.exports = { parseAndStoreMetadata };