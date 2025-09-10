---
tags: [installation, mcp, context7, rovodev]
---

# Rovo Dev CLI Installation

This document provides instructions on how to install and configure Context7 for use with **Rovo Dev CLI**.

Edit your Rovo Dev CLI MCP config by running the command below -

```bash
acli rovodev mcp
```

Example config -

## Remote Server Connection

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

## Local Server Connection

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
