---
tags: [installation, mcp, context7, cline]
---

# Cline Installation

This document provides instructions on how to install and configure Context7 for use with **Cline**.

You can easily install Context7 through the [Cline MCP Server Marketplace](https://cline.bot/mcp-marketplace) by following these instructions:

1.  Open **Cline**.
2.  Click the hamburger menu icon (☰) to enter the **MCP Servers** section.
3.  Use the search bar within the **Marketplace** tab to find _Context7_.
4.  Click the **Install** button.

Or you can directly edit MCP servers configuration:

1.  Open **Cline**.
2.  Click the hamburger menu icon (☰) to enter the **MCP Servers** section.
3.  Choose **Remote Servers** tab.
4.  Click the **Edit Configuration** button.
5.  Add context7 to `mcpServers`:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "type": "streamableHttp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```
