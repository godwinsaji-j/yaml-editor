function isRefLine(text) {
  return text.includes('$ref:');
}

function extractRef(lineText) {
  const match = lineText.match(/\$ref:\s*['"](.+?)['"]/);
  return match ? match[1] : null;
}

function findSiblingMetadata(lines, refLineIndex) {
  let absoluteRef = null;
  let pointer = null;

  for (let i = refLineIndex + 1; i < lines.length; i++) {
    const text = lines[i].trim();
    if (text.startsWith('absoluteRef:')) {
      absoluteRef = text.split(':')[1].trim().replace(/^["']|["']$/g, '');
    }
    if (text.startsWith('pointer:')) {
      pointer = text.split(':')[1].trim().replace(/^["']|["']$/g, '');
    }
    if (absoluteRef && pointer) break;
  }

  return { absoluteRef, pointer };
}

module.exports = { isRefLine, extractRef, findSiblingMetadata };