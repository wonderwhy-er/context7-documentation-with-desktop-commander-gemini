---
tags: [installation, mcp, context7, bun, deno]
---

# Bun or Deno Installation

This document provides instructions on how to install and configure Context7 using **Bun or Deno**.

Use these alternatives to run the local Context7 MCP server with other runtimes. These examples work for any client that supports launching a local MCP server via command + args.

## Bun

```json
{
  "mcpServers": {
    "context7": {
      "command": "bunx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

## Deno

```json
{
  "mcpServers": {
    "context7": {
      "command": "deno",
      "args": [
        "run",
        "--allow-env=NO_DEPRECATION,TRACE_DEPRECATION",
        "--allow-net",
        "npm:@upstash/context7-mcp"
      ]
    }
  }
}
```
