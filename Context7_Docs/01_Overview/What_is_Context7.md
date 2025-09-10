# What is Context7?

Context7 is a Model Context Protocol (MCP) server designed to enhance the capabilities of Large Language Models (LLMs) by providing them with up-to-date and version-specific documentation and code examples directly from reliable sources.

## The Problem Without Context7

Traditional LLMs often rely on outdated or generic information about the libraries and frameworks they are asked to generate code for. This can lead to:

- Outdated code examples based on old training data.
- Hallucinated APIs that do not exist.
- Generic answers for old package versions.

## The Solution With Context7

Context7 solves these problems by:

- Pulling up-to-date, version-specific documentation and code examples directly from the source.
- Placing this relevant information directly into the LLM's prompt.

This means you get:

- Working code answers.
- No tab-switching to search for documentation.
- No hallucinated APIs that don't exist.
- No outdated code generation.

## How it Works in Practice

By adding `use context7` to your prompt in an MCP-compatible client, Context7 fetches the necessary up-to-date code examples and documentation right into your LLM's context. For example:

```txt
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7
```

This enables the LLM to provide highly accurate and relevant responses based on the latest available information.
