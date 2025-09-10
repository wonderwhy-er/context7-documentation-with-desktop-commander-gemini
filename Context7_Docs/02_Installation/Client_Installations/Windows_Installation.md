---
tags: [installation, mcp, context7, windows]
---

# Windows Specific Configuration

This document provides instructions on how to install and configure Context7 on **Windows** operating systems.

The configuration on Windows is slightly different compared to Linux or macOS (Cline is used in the example). The same principle applies to other editors; refer to the configuration of `command` and `args`.

```json
{
  "mcpServers": {
    "github.com/upstash/context7-mcp": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```
