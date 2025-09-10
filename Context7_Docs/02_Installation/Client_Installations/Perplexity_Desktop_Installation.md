---
tags: [installation, mcp, context7, perplexity]
---

# Perplexity Desktop Installation

This document provides instructions on how to install and configure Context7 for use with **Perplexity Desktop**.

See [Local and Remote MCPs for Perplexity](https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity) for more information.

1. Navigate `Perplexity` > `Settings`
2. Select `Connectors`.
3. Click `Add Connector`.
4. Select `Advanced`.
5. Enter Server Name: `Context7`
6. Paste the following JSON in the text area:

```json
{
  "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"],
  "command": "npx",
  "env": {}
}
```

7. Click `Save`.
