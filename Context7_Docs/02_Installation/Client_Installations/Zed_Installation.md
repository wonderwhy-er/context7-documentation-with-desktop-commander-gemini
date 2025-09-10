---
tags: [installation, mcp, context7, zed]
---

# Zed Installation

This document provides instructions on how to install and configure Context7 for use with **Zed**.

It can be installed via [Zed Extensions](https://zed.dev/extensions?query=Context7) or you can add this to your Zed `settings.json`. See [Zed Context Server docs](https://zed.dev/docs/assistant/context-servers) for more info.

```json
{
  "context_servers": {
    "Context7": {
      "command": {
        "path": "npx",
        "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
      },
      "settings": {}
    }
  }
}
```
