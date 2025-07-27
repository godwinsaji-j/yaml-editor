const vscode = require('vscode');
const { metadataMap } = require('./metadataMap');

function handleCopyCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const currentLine = editor.selection.active.line;
  const refMeta = metadataMap[currentLine];

  if (refMeta) {
    const formatted = JSON.stringify(refMeta, null, 2);
    vscode.env.clipboard.writeText(formatted);
  } else {
    vscode.window.showInformationMessage('No metadata found for this line.');
  }
}

module.exports = { handleCopyCommand };