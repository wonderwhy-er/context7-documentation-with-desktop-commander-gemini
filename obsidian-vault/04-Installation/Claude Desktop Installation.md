# Claude Desktop Installation

## 🖥️ Installing Context7 MCP in Claude Desktop

### Remote Server Configuration
1. Open Claude Desktop
2. Navigate to Settings > Connectors
3. Add Custom Connector:
   - Name: `Context7`
   - URL: `https://mcp.context7.com/mcp`
   - Headers: `CONTEXT7_API_KEY: YOUR_API_KEY`

### Local Server Configuration
1. Open Claude Desktop developer settings
2. Edit `claude_desktop_config.json`:

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

### Configuration File Location
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Testing
1. Restart Claude Desktop
2. Test with: "Help me with React hooks. use context7"
3. Verify current documentation is retrieved

#claude-desktop #installation #mcp #anthropic