---
tags: [installation, mcp, context7, amazonq]
---

# Amazon Q Developer CLI Installation

This document provides instructions on how to install and configure Context7 for use with **Amazon Q Developer CLI**.

Add this to your Amazon Q Developer CLI MCP configuration file. See [Amazon Q Developer CLI docs](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line-mcp-configuration.html) for more details.

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
