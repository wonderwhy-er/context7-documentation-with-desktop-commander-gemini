---
tags: [installation, mcp, context7, jetbrains]
---

# JetBrains AI Assistant Installation

This document provides instructions on how to install and configure Context7 for use with **JetBrains AI Assistant**.

See [JetBrains AI Assistant Documentation](https://www.jetbrains.com/help/ai-assistant/configure-an-mcp-server.html) for more details.

1. In JetBrains IDEs, go to `Settings` -> `Tools` -> `AI Assistant` -> `Model Context Protocol (MCP)`
2. Click `+ Add`.
3. Click on `Command` in the top-left corner of the dialog and select the As JSON option from the list
4. Add this configuration and click `OK`

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

5. Click `Apply` to save changes.
6. The same way context7 could be added for JetBrains Junie in `Settings` -> `Tools` -> `Junie` -> `MCP Settings`
