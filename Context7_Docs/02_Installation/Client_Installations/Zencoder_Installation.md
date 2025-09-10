---
tags: [installation, mcp, context7, zencoder]
---

# Zencoder Installation

This document provides instructions on how to install and configure Context7 for use with **Zencoder**.

To configure Context7 MCP in Zencoder, follow these steps:

1. Go to the Zencoder menu (...)
2. From the dropdown menu, select Agent tools
3. Click on the Add custom MCP
4. Add the name and server configuration from below, and make sure to hit the Install button

```json
{
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
}
```

Once the MCP server is added, you can easily continue using it.
