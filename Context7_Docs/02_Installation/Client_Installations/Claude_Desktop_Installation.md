---
tags: [installation, mcp, context7, claudedesktop]
---

# Claude Desktop Installation

This document provides instructions on how to install and configure Context7 for use with **Claude Desktop**.

## Remote Server Connection

Open Claude Desktop and navigate to Settings > Connectors > Add Custom Connector. Enter the name as `Context7` and the remote MCP server URL as `https://mcp.context7.com/mcp`.

## Local Server Connection

Open Claude Desktop developer settings and edit your `claude_desktop_config.json` file to add the following configuration. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```
