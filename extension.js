const vscode = require('vscode');

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.copyMetaDataRef', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'yaml') return;

      const document = editor.document;
      const lines = document.getText().split('\n');
      const cursorLine = editor.selection.active.line;
      const indentLevel = lines[cursorLine].search(/\S/);
      const metadata = {};

      for (let i = cursorLine + 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const lineIndent = line.search(/\S/);
        if (lineIndent <= indentLevel) break; // Only consider children

        const match = line.trim().match(/^(\w+):\s*(["']?.+["']?)$/);
        if (match) {
          let [_, key, value] = match;
          value = value.replace(/^["']|["']$/g, ''); // Remove quotes
          metadata[key] = value;
        }
      }

      if (Object.keys(metadata).length > 0) {
        vscode.env.clipboard.writeText(JSON.stringify(metadata, null, 2));
        vscode.window.showInformationMessage(`Copied metadata for "${lines[cursorLine].trim()}"`);
      } else {
        vscode.window.showWarningMessage('No metadata found under this key.');
      }
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };