const { extractRef, isRefLine, findSiblingMetadata } = require('./utils');
const { metadataMap } = require('./metadataMap');

function processYamlLines(lines) {
  lines.forEach((lineText, index) => {
    if (isRefLine(lineText)) {
      const refPath = extractRef(lineText);
      const siblingMeta = findSiblingMetadata(lines, index);
      metadataMap[index] = {
        absoluteRef: siblingMeta.absoluteRef || refPath,
        pointer: siblingMeta.pointer || refPath.replace(/^#/, ''),
      };
    }
  });
}

module.exports = { processYamlLines };