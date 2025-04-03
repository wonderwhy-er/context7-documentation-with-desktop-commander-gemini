#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchProjects, fetchPackageDocumentation } from "./lib/api.js";
import { formatProjectsList } from "./lib/utils.js";

// Create server instance
const server = new McpServer({
  name: "Context7",
  description: "Retrieves documentation for packages.",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register Context7 tools
server.tool(
  "list-available-packages",
  "Lists all packages from Context7. The package names can be used with 'get-package-documentation' to retrieve documentation.",
  async () => {
    const projects = await fetchProjects();

    if (!projects) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve packages data from Context7",
          },
        ],
      };
    }

    // Filter projects to only include those with state "finalized"
    const finalizedProjects = projects.filter((project) => project.version.state === "finalized");

    if (finalizedProjects.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No finalized documentation packages available",
          },
        ],
      };
    }

    const projectsText = formatProjectsList(finalizedProjects);

    return {
      content: [
        {
          type: "text",
          text: projectsText,
        },
      ],
    };
  }
);

server.tool(
  "get-package-documentation",
  "Retrieves documentation for a specific package from Context7. Use 'list-available-packages' first to see what's available.",
  {
    packageName: z
      .string()
      .describe(
        "Name of the package/library to retrieve documentation for (e.g., 'upstash-redis', 'nextjs'). Must match exactly a package name from 'list-available-packages'."
      ),
    topic: z
      .string()
      .describe(
        "Specific topic within the package to focus the documentation on (e.g., 'hooks', 'routing')."
      ),
    tokens: z
      .number()
      .min(5000)
      .optional()
      .describe(
        "Maximum number of tokens of documentation to retrieve (default: 5000).Higher values provide more comprehensive documentation but use more context window."
      ),
  },
  async ({ packageName, tokens = 5000, topic = "" }) => {
    const documentationText = await fetchPackageDocumentation(packageName, tokens, topic);

    if (!documentationText) {
      return {
        content: [
          {
            type: "text",
            text: "Documentation not found or not finalized for this package. Verify you've provided a valid package name exactly as listed by the 'list-available-packages' tool.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: documentationText,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Context7 Documentation MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
