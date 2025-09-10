---
tags: [installation, mcp, context7, augmentcode]
---

# Augment Code Installation

This document provides instructions on how to install and configure Context7 for use with **Augment Code**.

To configure Context7 MCP in Augment Code, you can use either the graphical interface or manual configuration.

## A. Using the Augment Code UI

1.  Click the hamburger menu.
2.  Select **Settings**.
3.  Navigate to the **Tools** section.
4.  Click the **+ Add MCP** button.
5.  Enter the following command:

    ```
    npx -y @upstash/context7-mcp@latest
    ```

6.  Name the MCP: **Context7**.
7.  Click the **Add** button.

Once the MCP server is added, you can start using Context7's up-to-date code documentation features directly within Augment Code.

## B. Manual Configuration

1.  Press Cmd/Ctrl Shift P or go to the hamburger menu in the Augment panel
2.  Select Edit Settings
3.  Under Advanced, click Edit in settings.json
4.  Add the server configuration to the `mcpServers` array in the `augment.advanced` object

```json
"augment.advanced": {
  "mcpServers": [
    {
      "name": "context7",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  ]
}
```

Once the MCP server is added, restart your editor. If you receive any errors, check the syntax to make sure closing brackets or commas are not missing.
