import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Project } from "./lib/types.js";

const CONTEXT7_BASE_URL = "https://context7.com";

// Create server instance
const server = new McpServer({
  name: "context7",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function for making Context7 API requests
async function makeContext7Request<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error making Context7 API request:", error);
    return null;
  }
}

// Helper function for formatting projects
function formatProject(project: Project): string {
  return `Title: ${project.settings.title}\n Package name to fetch context: ${project.settings.project}\n`;
}

// Register context7 tools
server.tool(
  "see-available-packages",
  "See the list of packages that are finalized and available to fetch their context",
  async () => {
    const packagesUrl = `${CONTEXT7_BASE_URL}/api/projects`;
    const packagesData = await makeContext7Request<Project[]>(packagesUrl);

    if (!packagesData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve packages data",
          },
        ],
      };
    }

    const projects = packagesData || [];
    if (projects.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No packages available",
          },
        ],
      };
    }

    const formattedProjects = projects.map(formatProject);
    const projectsText = `${formattedProjects.length} available packages:\n\n${formattedProjects.join("\n")}`;

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
  "get-package-context",
  "Get a specific package's context based on it's documentation",
  {
    packageName: z.string().describe("Name of the package to retrieve context for"),
    tokens: z.number().min(5000).optional().describe("Number of tokens to retrieve context for"),
    topic: z.string().optional().describe("Topic of search to rerank context for"),
  },
  async ({ packageName, tokens = 5000, topic = "" }) => {
    try {
      let contextURL = `${CONTEXT7_BASE_URL}/${packageName}/llm.txt`;
      const params = [];

      if (tokens) {
        params.push(`tokens=${tokens}`);
      }
      if (topic) {
        params.push(`topic=${encodeURIComponent(topic)}`);
      }

      if (params.length > 0) {
        contextURL += `?${params.join("&")}`;
      }

      const response = await fetch(contextURL);

      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [
              {
                type: "text",
                text: "Project not found or not finalized.",
              },
            ],
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      if (!text || text === "No content available" || text === "No context data available") {
        return {
          content: [
            {
              type: "text",
              text: "No context data available",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching package context:", error);
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve context for project: ${packageName}`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Context7 MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
