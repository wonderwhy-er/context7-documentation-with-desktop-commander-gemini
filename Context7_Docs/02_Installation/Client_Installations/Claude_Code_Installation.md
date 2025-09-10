---
tags: [installation, mcp, context7, claudecode]
---

# Claude Code Installation

This document provides instructions on how to install and configure Context7 for use with **Claude Code**.

Run this command. See [Claude Code MCP docs](https://docs.anthropic.com/en/docs/claude-code/mcp) for more info.

## Claude Code Remote Server Connection

```sh
claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: YOUR_API_KEY"
```

## Claude Code Local Server Connection

```sh
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```
