<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=clawpilot.clawpilot"><img src="https://img.shields.io/badge/VS_Code_Marketplace-007ACC?style=flat&logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace"></a>
  <a href="https://github.com/abhiramvishal/clawpilot"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://discord.gg/clawpilot"><img src="https://img.shields.io/badge/Join%20Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Join Discord"></a>
</p>

# ClawPilot

> Your AI-Powered Dev Team, Right in Your Editor — Local Models First.

ClawPilot is a VS Code extension that brings autonomous AI coding assistance to your editor. Built on the open-source Roo Code foundation, ClawPilot is designed with **local-first AI** in mind — run models on your own machine with full privacy, or connect any provider you choose.

---

## Local Models — First Class Support

ClawPilot prioritizes running AI locally. Zero data leaves your machine when using local inference:

| Provider                      | How to use                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| **Ollama**                    | Install [Ollama](https://ollama.com), pull any model, set base URL to `http://localhost:11434` |
| **LM Studio**                 | Run [LM Studio](https://lmstudio.ai), load a model, set base URL to `http://localhost:1234`    |
| **LiteLLM**                   | Point ClawPilot at your [LiteLLM](https://litellm.ai) proxy URL                                |
| **Any OpenAI-compatible API** | Use the "OpenAI Compatible" provider with your custom base URL and API key                     |

Switch providers any time from the API Profiles panel — no restart required.

---

## What Can ClawPilot Do?

- **Generate code** from natural language descriptions and specs
- **Refactor & debug** existing code with full file access
- **Write & update** documentation
- **Answer questions** about your codebase
- **Automate** repetitive tasks end-to-end
- **Use MCP Servers** for extended tool capabilities
- **Run in multiple modes** tailored to different tasks

---

## Modes

ClawPilot adapts to how you work:

- **Code** — everyday coding, edits, and file operations
- **Architect** — plan systems, specs, and migrations
- **Ask** — fast answers, explanations, and documentation lookup
- **Debug** — trace issues, add logs, isolate root causes
- **Custom Modes** — build specialized personas for your team or workflow

---

## Supported Providers

**Local / Self-hosted:**
Ollama · LM Studio · LiteLLM · Any OpenAI-compatible endpoint

**Cloud (bring your own API key):**
Anthropic · OpenAI · OpenRouter · Google Gemini · AWS Bedrock · Google Vertex AI · Mistral · DeepSeek · xAI · Moonshot · Qwen · SambaNova · Fireworks · Vercel AI Gateway · MiniMax · Baseten · Requesty · Unbound · VS Code LM API

---

## Quick Start

1. Install **ClawPilot** from the VS Code Marketplace
2. Open the ClawPilot panel from the activity bar
3. Choose a provider:
    - For local: start Ollama or LM Studio, select it in API Profiles
    - For cloud: select a provider and paste your API key
4. Start a task — describe what you want to build or fix

---

<details>
  <summary>🌐 Available languages</summary>

- [English](README.md)
- [Català](locales/ca/README.md)
- [Deutsch](locales/de/README.md)
- [Español](locales/es/README.md)
- [Français](locales/fr/README.md)
- [हिंदी](locales/hi/README.md)
- [Bahasa Indonesia](locales/id/README.md)
- [Italiano](locales/it/README.md)
- [日本語](locales/ja/README.md)
- [한국어](locales/ko/README.md)
- [Nederlands](locales/nl/README.md)
- [Polski](locales/pl/README.md)
- [Português (BR)](locales/pt-BR/README.md)
- [Русский](locales/ru/README.md)
- [Türkçe](locales/tr/README.md)
- [Tiếng Việt](locales/vi/README.md)
- [简体中文](locales/zh-CN/README.md)
- [繁體中文](locales/zh-TW/README.md)

</details>

---

## Resources

- **[GitHub Issues](https://github.com/abhiramvishal/clawpilot/issues):** Report bugs and track development.
- **[Feature Requests](https://github.com/abhiramvishal/clawpilot/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop):** Share ideas with the developers.
- **[Discord Server](https://discord.gg/clawpilot):** Join the community for real-time help and discussion.

---

## Local Setup & Development

1. **Clone** the repo:

```sh
git clone https://github.com/abhiramvishal/clawpilot.git
```

2. **Install dependencies**:

```sh
pnpm install
```

3. **Run the extension**:

### Development Mode (F5)

Press `F5` (or go to **Run** → **Start Debugging**) in VSCode. This opens a new VS Code window with ClawPilot running.

- Changes to the webview appear immediately.
- Changes to the core extension hot-reload automatically.

### Build & Install as VSIX

```sh
pnpm install:vsix [-y] [--editor=<command>]
```

Or manually:

```sh
pnpm vsix
code --install-extension bin/clawpilot-<version>.vsix
```

---

We use [changesets](https://github.com/changesets/changesets) for versioning. Check `CHANGELOG.md` for release notes.

---

## Disclaimer

**Please note** that ClawPilot does **not** make any representations or warranties regarding any code, models, or other tools provided or made available in connection with ClawPilot, any associated third-party tools, or any resulting outputs. You assume **all risks** associated with the use of any such tools or outputs; such tools are provided on an **"AS IS"** and **"AS AVAILABLE"** basis. You are solely responsible for your use of any such tools or outputs.

---

## Contributing

Contributions are welcome! Get started by reading our [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

[Apache 2.0 © 2025 ClawPilot](./LICENSE)

---

**Enjoy ClawPilot!** Whether running local models for full privacy or connecting cloud providers for maximum capability, we can't wait to see what you build. Happy coding!
