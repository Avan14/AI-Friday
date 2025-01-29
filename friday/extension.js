const vscode = require("vscode");
const axios = require("axios");  

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(' "Friday" is active!');

  const disposable = vscode.commands.registerCommand("friday.active", function () {
    const panel = vscode.window.createWebviewPanel(
      "friday",
      "Friday",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage(async (message) => {
      if (message.command === "ask") {
        const userPrompt = message.prompt;
        let response = "No response";

        try {
          response = await getLLMResponse(userPrompt);  // Call local LLM
        } catch (e) {
          response = `Error: ${e.message}`;
        }

        panel.webview.postMessage({ command: "response", response });
      }
    });

    context.subscriptions.push(disposable);
  });
}

async function getLLMResponse(prompt) {
  try {
    const result = await axios.post("http://localhost:11434/api/generate", {
      model: "qwen2.5-coder",  // Change this if using a different model
      prompt: prompt
    });
    return result.data.response;  // Modify based on API response format
  } catch (error) {
    throw new Error("Failed to get response from local LLM: " + error.message);
  }
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; margin: 1rem; }
        #prompt { width:100%; box-sizing:border-box; }
        #response { width:100%; box-sizing:border-box; border-top: 1px solid #ccc; padding: 0.5rem; margin-top: 1rem; }
      </style>
      <title>Friday</title>
    </head>
    <body>
      <h1>Friday</h1>
      <p>Friday is a personal assistant for coding.</p>
      <textarea id="prompt" placeholder="Type your question here"></textarea>
      <button id="askbutton">Ask</button>
      <div id="response"></div>
      <script>
        const vscode = acquireVsCodeApi();
        document.getElementById('askbutton').addEventListener('click', () => {
          const prompt = document.getElementById('prompt').value;
          vscode.postMessage({ command: 'ask', prompt });
        });

        window.addEventListener('message', (event) => {
          const message = event.data;
          if (message.command === 'response') {
            document.getElementById('response').innerText = message.response;
          }
        });
      </script>
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
