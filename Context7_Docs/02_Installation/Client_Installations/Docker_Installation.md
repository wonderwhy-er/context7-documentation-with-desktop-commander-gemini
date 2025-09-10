---
tags: [installation, mcp, context7, docker]
---

# Docker Installation

This document provides instructions on how to install and configure Context7 using **Docker**.

If you prefer to run the MCP server in a Docker container:

## 1. Build the Docker Image:

First, create a `Dockerfile` in the project root (or anywhere you prefer). The full content of the Dockerfile can be found in [Dockerfile](../../_Attachments/Dockerfile.md).

Then, build the image using a tag (e.g., `context7-mcp`). **Make sure Docker Desktop (or the Docker daemon) is running.** Run the following command in the same directory where you saved the `Dockerfile`:

```bash
docker build -t context7-mcp .
```

## 2. Configure Your MCP Client:

Update your MCP client's configuration to use the Docker command.

_Example for a `cline_mcp_settings.json`:_

```json
{
  "mcpServers": {
    "Сontext7": {
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "command": "docker",
      "args": ["run", "-i", "--rm", "context7-mcp"],
      "transportType": "stdio"
    }
  }
}
```

_Note: This is an example configuration. Please refer to the specific examples for your MCP client (like Cursor, VS Code, etc.) earlier in this README to adapt the structure (e.g., `mcpServers` vs `servers`). Also, ensure the image name in `args` matches the tag used during the `docker build` command._
