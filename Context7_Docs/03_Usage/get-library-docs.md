---
tags: [tool, usage, get-library-docs]
---

# get-library-docs

### Tool Description

The `get-library-docs` tool is used to fetch specific documentation for a library using its unique Context7-compatible library ID. This tool is the primary mechanism for LLMs to retrieve up-to-date documentation on demand.

### Parameters

-   `context7CompatibleLibraryID` (required): The exact, unique ID of the library as recognized by Context7 (e.g., `/mongodb/docs`, `/vercel/next.js`). This ID is typically obtained from the `resolve-library-id` tool.
-   `topic` (optional): A string specifying a particular topic or section within the library's documentation to focus on (e.g., "routing", "hooks", "authentication"). This helps to narrow down the returned context for the LLM.
-   `tokens` (optional, default 5000): The maximum number of tokens to return in the documentation response. Values less than 1000 are automatically increased to 1000 to ensure a minimum useful size.

### Example Usage

```
// LLM's internal thought process
const nextJsDocs = context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "middleware",
  tokens: 2000
});
// nextJsDocs will contain relevant documentation about Next.js middleware
```
