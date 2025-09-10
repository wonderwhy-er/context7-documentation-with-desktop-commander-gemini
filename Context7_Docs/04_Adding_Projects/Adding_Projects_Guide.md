---
tags: [projects, configuration, context7]
---

# Adding Projects to Context7

Context7 allows you to add your favorite libraries and frameworks to help developers get up-to-date documentation directly in their coding environment.

## Quick Submission

The easiest way to add a library is through our web interface:

**[Submit a Library →](https://context7.com/add-library?tab=github)**

Simply provide the GitHub repository URL and Context7 will automatically parse and index the project's documentation.

## Advanced Configuration with `context7.json`

For more control over how Context7 parses and presents your library, you can add a `context7.json` file to the root of your repository. This file works similar to `robots.txt` and tells Context7 how to handle your project.

### Configuration Fields

Here's an example `context7.json` file with all available options:

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "Upstash Ratelimit",
  "description": "Ratelimiting library based on Upstash Redis",
  "folders": [],
  "excludeFolders": ["src"],
  "excludeFiles": [],
  "rules": ["Use Upstash Redis as a database", "Use single region set up"],
  "previousVersions": [
    {
      "tag": "v1.2.1",
      "title": "version 1.2.1"
    }
  ]
}
```

> **💡 Pro Tip**: Including the `$schema` field enables autocomplete, validation, and helpful tooltips in modern code editors like VS Code, making it easier to create and maintain your configuration.

#### Field Descriptions

- **`projectTitle`** (string): The display name for your project in Context7. This overrides the default repository name.

- **`description`** (string): A brief description of what your library does. This helps coding agents understand the purpose of your project.

- **`folders`** (array): Specific folder paths to include when parsing documentation. If empty, Context7 will scan the entire repository for relevant documentation files. Supports regex patterns and requires full paths.

- **`excludeFolders`** (array): Folder paths to exclude from documentation parsing. Useful for excluding source code directories, build folders, or other non-documentation content. Supports regex patterns and requires full paths.

- **`excludeFiles`** (array): Specific file names to exclude from documentation parsing. Only include the filename (not the path). Useful for excluding files like `CHANGELOG.md`, license files, or other non-documentation content that might not be relevant for coding agents. Regex patterns are not supported.

- **`rules`** (array): Best practices or important guidelines that coding agents should follow when using your library. These appear as recommendations in the documentation context provided to coding agents.

- **`previousVersions`** (array): Information about previous versions of your library that should also be available in Context7.
  - **`tag`**: The Git tag or version identifier
  - **`title`**: Human-readable version name

### Default Exclusions

If you don't specify `excludeFiles` or `excludeFolders` in your `context7.json`, Context7 uses these default patterns:

#### Default Excluded Files

```
CHANGELOG.md, changelog.md, CHANGELOG.mdx, changelog.mdx
LICENSE.md, license.md
CODE_OF_CONDUCT.md, code_of_conduct.md
```

#### Default Excluded Folders

```
*archive*, *archived*, old, docs/old, *deprecated*, *legacy*
*previous*, *outdated*, *superseded*
i18n/zh*, i18n/es*, i18n/fr*, i18n/de*, i18n/ja*, i18n/ko*
i18n/ru*, i18n/pt*, i18n/it*, i18n/ar*, i18n/hi*, i18n/tr*
i18n/nl*, i18n/pl*, i18n/sv*, i18n/vi*, i18n/th*
zh-cn, zh-tw, zh-hk, zh-mo, zh-sg
```

These defaults help ensure that coding agents receive relevant, current documentation without outdated or non-technical content.

## Who Can Add Configuration?

- **Library authors**: Add `context7.json` directly to your repository
- **Contributors**: Submit pull requests to add or update the configuration
- **Community members**: Propose improvements to how popular libraries are parsed

## Best Practices

1. **Keep descriptions concise**: Aim for one clear sentence that explains your library's purpose to coding agents
2. **Exclude irrelevant folders**: Use `excludeFolders` to avoid indexing source code, tests, or build artifacts
3. **Add helpful rules**: Include common gotchas or best practices that coding agents should know when generating code
4. **Maintain version history**: Keep important previous versions accessible for projects that need older APIs

## Adding a Version

To add a new version to your existing library:

1. **Add version to the `context7.json` file**: Update the `previousVersions` array with your new version:

   ```json
   "previousVersions": [
     {
       "tag": "v2.0.0",
       "title": "version 2.0.0"
     }
   ]
   ```

   > **Note**: The `tag` value must exactly match an existing Git tag in your GitHub repository.

2. **Refresh your library**: Go to your library page on Context7 and trigger a refresh to index the new version.

## Need Help?

If you encounter issues or need assistance adding your project, please [report an issue](https://context7.com/add-library?tab=github) or reach out to our community.
