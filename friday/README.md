# Friday README

## Overview
Friday is a **VS Code extension** designed to be an AI-powered **code helper**. It integrates **local LLM models** (such as `qwen2.5-coder`) via **Ollama** to provide intelligent coding assistance directly within VS Code. The extension allows developers to chat with an AI assistant for help with coding problems, debugging, and suggestions.

## Features
- **AI-Powered Code Assistance**: Get real-time coding help using locally installed models.
- **Seamless VS Code Integration**: Works directly within VS Code's UI.
- **Local Model Support**: Uses `qwen2.5-coder` or other LLMs via **Ollama**.
- **Webview Interface**: Chat with the AI assistant in a dedicated panel.
- **Privacy-Focused**: No cloud API calls—everything runs locally.


## Requirements
- **VS Code** (Latest version recommended)
- **Ollama** (Installed and running)
- **qwen2.5-coder** model (or another compatible LLM)

### Installing Ollama
1. **Download and install Ollama**: [https://ollama.com/download](https://ollama.com/download)
2. **Verify installation**: Run `ollama --version`
3. **Pull the required model**:
   ```sh
   ollama pull qwen2.5-coder
   ```
4. **Start Ollama**:
   ```sh
   ollama serve
   ```

## Extension Settings
This extension contributes the following settings:

- `friday.enable`: Enable/disable the extension.
- `friday.model`: Choose the local LLM model (default: `qwen2.5-coder`).
- `friday.apiUrl`: Custom Ollama API URL (default: `http://localhost:11434`).

## Usage
1. **Install the extension** in VS Code.
2. **Start Ollama** (`ollama serve`).
3. **Activate Friday**:
   - Open Command Palette (`Ctrl+Shift+P`)
   - Run `Friday: Activate`
4. **Chat with the AI**: Enter a prompt in the webview and receive AI-generated responses.


## Release Notes
### 1.0.0
- Initial release with local LLM support via Ollama.

### 1.1.0
- Added customizable model selection.
- Improved webview styling.

## For More Information
- [Ollama Documentation](https://ollama.com/docs)
- [VS Code API Docs](https://code.visualstudio.com/api)

**Enjoy coding with Friday! 🚀**

