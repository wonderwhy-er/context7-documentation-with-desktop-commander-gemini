---
tags: [tool, usage, resolve-library-id]
---

# resolve-library-id

### Tool Description

The `resolve-library-id` tool is used to convert a general library name (e.g., "React", "Vue.js", "Next") into a Context7-compatible library ID. This ID is then used by the `get-library-docs` tool to fetch specific documentation.

### Parameters

-   `libraryName` (required): The common or general name of the library you wish to search for. Context7 will attempt to resolve this into its internal ID format.

### Example Usage

While direct invocation of this tool by a user is not typical (it's usually handled by the LLM in the background), an LLM might use it conceptually like this:

```
// LLM's internal thought process
const libraryID = context7.resolve_library_id({ libraryName: "Next.js" });
// libraryID might become "/vercel/next.js"
```
