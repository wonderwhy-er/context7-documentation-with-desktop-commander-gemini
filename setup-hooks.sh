#!/bin/bash
# Setup script to configure git hooks for automatic Obsidian link conversion

echo "🔧 Setting up git hooks for Obsidian link conversion..."

# Get the directory of this script (repository root)
REPO_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Configure git to use our custom hooks directory
echo "📁 Configuring git hooks directory..."
git config core.hooksPath .githooks

# Make sure the pre-commit hook is executable
chmod +x "$REPO_ROOT/.githooks/pre-commit"

echo "✅ Git hooks configured successfully!"
echo ""
echo "📝 What happens now:"
echo "   • When you commit changes to obsidian-vault/*.md files"
echo "   • The pre-commit hook will automatically convert [[]] links to relative markdown links"
echo "   • The converted files will be re-staged automatically"
echo "   • Your commit will include the GitHub-compatible links"
echo ""
echo "🧪 To test the conversion manually:"
echo "   python3 convert_all_obsidian_links.py obsidian-vault --test"
echo ""
echo "🔄 To convert all files now:"
echo "   python3 convert_all_obsidian_links.py obsidian-vault"
