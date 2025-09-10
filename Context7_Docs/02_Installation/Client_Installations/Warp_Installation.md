---
tags: [installation, mcp, context7, warp]
---

# Warp Installation

This document provides instructions on how to install and configure Context7 for use with **Warp**.

See [Warp Model Context Protocol Documentation](https://docs.warp.dev/knowledge-and-collaboration/mcp#adding-an-mcp-server) for details.

1.  Navigate `Settings` > `AI` > `Manage MCP servers`.
2.  Add a new MCP server by clicking the `+ Add` button.
3.  Paste the configuration given below:

```json
{
  "Context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"],
    "env": {},
    "working_directory": null,
    "start_on_launch": true
  }
}
```

4.  Click `Save` to apply the changes.
