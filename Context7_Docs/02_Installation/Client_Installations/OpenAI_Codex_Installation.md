---
tags: [installation, mcp, context7, opencodeai]
---

# OpenAI Codex Installation

This document provides instructions on how to install and configure Context7 for use with **OpenAI Codex**.

See [OpenAI Codex](https://github.com/openai/codex) for more information.

Add the following configuration to your OpenAI Codex MCP server settings:

```toml
[mcp_servers.context7]
args = ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
command = "npx"
```
