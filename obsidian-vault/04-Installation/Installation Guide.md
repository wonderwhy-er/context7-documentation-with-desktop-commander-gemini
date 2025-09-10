# Installation Guide

## 🚀 Quick Start Installation

Context7 MCP can be installed in multiple ways depending on your development environment and preferences.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **MCP-Compatible Client**: Cursor, VS Code, Claude Desktop, or others
- **Internet Connection**: Required for documentation fetching

### Optional Requirements
- **Context7 API Key**: For higher rate limits (get yours at [context7.com/dashboard](https://context7.com/dashboard))

## 🎯 Installation Methods

### 1. One-Click Installation (Recommended)

#### For Cursor IDE
[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=context7&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB1cHN0YXNoL2NvbnRleHQ3LW1jcCJdfQ%3D%3D)

Click the button above for instant installation in Cursor.

#### For VS Code
[Install in VS Code (npx)](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22context7%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40upstash%2Fcontext7-mcp%40latest%22%5D%7D)

### 2. Manual Configuration

#### Configuration File Locations
Different clients store MCP configuration in different locations:

| Client | Configuration File |
|--------|-------------------|
| Cursor | `~/.cursor/mcp.json` |
| VS Code | User settings → `mcp` section |
| Claude Desktop | `claude_desktop_config.json` |
| Windsurf | Windsurf MCP config |

### 3. Smithery Installation (Universal)
Use Smithery for automatic installation across any MCP client:

```bash
npx -y @smithery/cli@latest install @upstash/context7-mcp --client <CLIENT_NAME> --key <YOUR_SMITHERY_KEY>
```

Get your Smithery key at [smithery.ai](https://smithery.ai/server/@upstash/context7-mcp).

## ⚙️ Configuration Options

### Transport Methods
Context7 MCP supports multiple transport protocols:

#### Local Server (stdio)
Best for: Local development, direct integration

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

#### Remote Server (HTTP)
Best for: Team deployments, containerized environments

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

#### Server-Sent Events (SSE)
Best for: Real-time applications, streaming responses

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/sse",
      "type": "streamableHttp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

## 🔧 Alternative Runtime Support

### Using Bun
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

### Using Deno
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
```## 🐳 Docker Installation

### Building Docker Image
If you prefer containerized deployment:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install Context7 MCP globally
RUN npm install -g @upstash/context7-mcp

# Default command
CMD ["context7-mcp"]
```

### Docker Configuration
```json
{
  "mcpServers": {
    "context7": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "context7-mcp"],
      "transportType": "stdio"
    }
  }
}
```

## 🖥️ Platform-Specific Installation

### Windows Installation
Configuration differs slightly on Windows:

```json
{
  "mcpServers": {
    "context7": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"],
      "disabled": false
    }
  }
}
```

### macOS/Linux Installation
Standard Unix configuration:

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

## ✅ Verification Steps

### 1. Check Installation
After installation, verify Context7 is available in your IDE:

1. **Open your MCP-compatible client**
2. **Look for MCP server status** (usually in settings or status bar)
3. **Verify "Context7" appears** in the list of available servers
4. **Check for any error messages** in logs

### 2. Test Basic Functionality
Try a simple query to test the installation:

```
Create a simple React component. use context7
```

Expected behavior:
- Context7 should activate automatically
- Current React documentation should be fetched
- Generated code should use modern React patterns

### 3. Troubleshoot Common Issues
If Context7 doesn't work:

1. **Check Node.js version**: Must be 18.0.0+
2. **Verify network access**: Context7 needs internet connectivity
3. **Review configuration**: Ensure JSON syntax is correct
4. **Check logs**: Look for specific error messages

## 🔑 API Key Configuration

### Getting an API Key
1. Visit [context7.com/dashboard](https://context7.com/dashboard)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key for configuration

### Setting Up API Key
API keys can be configured in multiple ways:

#### Via Configuration File
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

#### Via Environment Variable
```bash
export CONTEXT7_API_KEY="your-api-key-here"
```

#### Via HTTP Headers (Remote Server)
```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## 🔄 Updating Context7

### Automatic Updates
When using `npx` with the `-y` flag, Context7 automatically updates to the latest version.

### Manual Updates
To force an update:

```bash
npm install -g @upstash/context7-mcp@latest
```

### Version Pinning
To use a specific version:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@1.0.0", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

---

*Choose the installation method that best fits your development environment and workflow.*

#installation #setup #configuration #mcp #context7

## See Also
- [[Cursor Installation]] - Cursor-specific setup
- [[VS Code Installation]] - VS Code-specific setup  
- [[Claude Desktop Installation]] - Claude Desktop setup
- [[08-Troubleshooting/Installation Problems]] - Installation troubleshooting