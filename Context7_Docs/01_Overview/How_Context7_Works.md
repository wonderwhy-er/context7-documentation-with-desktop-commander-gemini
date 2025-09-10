# How Context7 Works

Context7 operates as a Model Context Protocol (MCP) server, acting as an intermediary between Large Language Models (LLMs) and up-to-date code documentation and examples.

## Core Functionality

When a user interacts with an LLM through an MCP-compatible client (like Cursor, Claude Code, etc.) and includes a directive such as `use context7` in their prompt, the following process occurs:

1.  **Prompt Interception**: The MCP client detects the `use context7` directive.
2.  **Request to Context7**: The client sends a request to the Context7 MCP server. This request typically includes the user's query and potentially information about the libraries or topics they are interested in.
3.  **Documentation Fetching**: Context7, using its internal mechanisms, fetches the most current, version-specific documentation and relevant code examples for the requested libraries or topics. This information is sourced directly from the original maintainers and repositories.
4.  **Context Injection**: Context7 then injects this freshly retrieved, accurate documentation and code into the LLM's context window. This happens before the LLM processes the user's original prompt.
5.  **Enhanced LLM Response**: With the injected context, the LLM now has access to precise and current information, allowing it to generate more accurate, relevant, and working code or answers, free from hallucinations or outdated data.

## Benefits of this Workflow

This workflow ensures that LLMs perform optimally by:

-   **Eliminating Outdated Information**: Always providing the latest documentation.
-   **Reducing Hallucinations**: Grounding the LLM's responses in real, existing APIs and practices.
-   **Improving Code Quality**: Leading to functional and modern code examples.
-   **Streamlining Developer Workflow**: Removing the need for manual tab-switching to search for documentation.

Context7's ability to pull and inject real-time documentation directly into the LLM's context is what makes it a powerful tool for developers and anyone working with LLMs for code generation and technical queries.
