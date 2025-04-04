#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchProjects, fetchLibraryDocumentation } from "./lib/api.js";
import { formatProjectsList } from "./lib/utils.js";

// Create server instance
const server = new McpServer({
  name: "Context7",
  description: "Retrieves documentation and code examples for software libraries.",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register Context7 tools
server.tool(
  "list-available-docs",
  "Lists all available library documentation from Context7. The library names can be used with 'get-library-documentation' to retrieve documentation.",
  async () => {
    const projects = await fetchProjects();

    if (!projects) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve library documentation data from Context7",
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
            text: "No finalized documentation libraries available",
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
  "get-library-documentation",
  "Retrieves documentation for a specific library from Context7. Use 'list-available-docs' first to see what's available.",
  {
    libraryName: z
      .string()
      .describe(
        "Name of the library to retrieve documentation for (e.g., 'upstash-redis', 'nextjs'). Must match exactly a library name from 'list-available-docs'."
      ),
    topic: z
      .string()
      .optional()
      .describe(
        "Specific topic within the library to focus the documentation on (e.g., 'hooks', 'routing')."
      ),
    tokens: z
      .number()
      .min(5000)
      .optional()
      .describe(
        "Maximum number of tokens of documentation to retrieve (default: 5000).Higher values provide more comprehensive documentation but use more context window."
      ),
  },
  async ({ libraryName, tokens = 5000, topic = "" }) => {
    const documentationText = await fetchLibraryDocumentation(libraryName, tokens, topic);

    if (!documentationText) {
      return {
        content: [
          {
            type: "text",
            text: "Documentation not found or not finalized for this library. Verify you've provided a valid library name exactly as listed by the 'list-available-docs' tool.",
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
