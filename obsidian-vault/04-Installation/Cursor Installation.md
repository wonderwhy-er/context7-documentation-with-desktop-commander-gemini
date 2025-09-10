# Cursor Installation

## 🎯 Installing Context7 MCP in Cursor

### One-Click Installation (Recommended)
[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=context7&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB1cHN0YXNoL2NvbnRleHQ3LW1jcCJdfQ%3D%3D)

### Manual Configuration
1. Open Cursor Settings
2. Navigate to `Cursor Settings` → `MCP`
3. Add new global MCP server
4. Paste configuration:

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

### Verification
1. Restart Cursor
2. Test with: "Create a React component. use context7"
3. Verify Context7 activates in the response

#cursor #installation #mcp #setup