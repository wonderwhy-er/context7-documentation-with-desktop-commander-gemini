#!/usr/bin/env python3
"""
Convert Obsidian-style [[]] links to GitHub-compatible relative markdown links.

Usage:
    python convert_obsidian_links.py <file_path> [--test]
    
Options:
    --test    Test mode - show conversions without modifying files
"""

import re
import os
import sys
import argparse
from pathlib import Path


def find_obsidian_vault_root(file_path):
    """Find the root of the Obsidian vault by looking for .obsidian folder."""
    current_path = Path(file_path).parent
    while current_path != current_path.parent:
        if (current_path / '.obsidian').exists():
            return current_path
        current_path = current_path.parent
    return None


def convert_obsidian_link_to_relative(match, source_file_path, vault_root):
    """
    Convert a single Obsidian link to a relative GitHub markdown link.
    
    Args:
        match: Regex match object for [[link]]
        source_file_path: Path to the file containing the link
        vault_root: Path to the vault root directory
    
    Returns:
        str: Converted markdown link
    """
    full_match = match.group(0)
    link_content = match.group(1)
    
    # Handle links with custom display text: [[path|display text]]
    if '|' in link_content:
        file_path, display_text = link_content.split('|', 1)
    else:
        file_path = link_content
        display_text = Path(file_path).name
    
    # Convert file path to actual file path
    target_path = vault_root / f"{file_path}.md"
    
    # If target doesn't exist with .md, try without extension
    if not target_path.exists():
        target_path = vault_root / file_path
        if target_path.is_dir():
            # If it's a directory, look for README.md or index.md
            readme_path = target_path / "README.md"
            index_path = target_path / "index.md"
            if readme_path.exists():
                target_path = readme_path
            elif index_path.exists():
                target_path = index_path
            else:
                # Default to the directory name with .md
                target_path = vault_root / f"{file_path}.md"
    
    if not target_path.exists():
        print(f"Warning: Target file not found: {target_path}")
        return full_match  # Keep original if target doesn't exist
    
    # Calculate relative path from source to target
    source_dir = Path(source_file_path).parent
    try:
        relative_path = os.path.relpath(target_path, source_dir)
        # Convert backslashes to forward slashes for cross-platform compatibility
        relative_path = relative_path.replace('\\', '/')
        
        # URL encode spaces and special characters
        relative_path = relative_path.replace(' ', '%20')
        
        return f"[{display_text}]({relative_path})"
    except ValueError as e:
        print(f"Error calculating relative path: {e}")
        return full_match


def convert_obsidian_links_in_text(text, source_file_path, vault_root):
    """
    Convert all Obsidian-style links in text to GitHub-compatible relative links.
    
    Args:
        text: The text content to convert
        source_file_path: Path to the file containing the text
        vault_root: Path to the vault root directory
    
    Returns:
        tuple: (converted_text, list_of_conversions)
    """
    # Regex to match [[content]] where content doesn't contain []
    pattern = r'\[\[([^\[\]]+)\]\]'
    conversions = []
    
    def replacement_func(match):
        original = match.group(0)
        converted = convert_obsidian_link_to_relative(match, source_file_path, vault_root)
        if original != converted:
            conversions.append((original, converted))
        return converted
    
    converted_text = re.sub(pattern, replacement_func, text)
    return converted_text, conversions


def convert_file(file_path, test_mode=False):
    """
    Convert Obsidian links in a single file.
    
    Args:
        file_path: Path to the file to convert
        test_mode: If True, only show what would be converted without modifying
    
    Returns:
        bool: True if conversions were made (or would be made), False otherwise
    """
    file_path = Path(file_path)
    
    if not file_path.exists():
        print(f"Error: File not found: {file_path}")
        return False
    
    if not file_path.suffix.lower() == '.md':
        print(f"Skipping non-markdown file: {file_path}")
        return False
    
    # Find vault root
    vault_root = find_obsidian_vault_root(file_path)
    if not vault_root:
        print(f"Error: Could not find Obsidian vault root for file: {file_path}")
        return False
    
    print(f"Processing: {file_path}")
    print(f"Vault root: {vault_root}")
    
    # Read file content
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return False
    
    # Convert links
    converted_content, conversions = convert_obsidian_links_in_text(
        original_content, file_path, vault_root
    )
    
    # Show conversions
    if conversions:
        print(f"\nFound {len(conversions)} Obsidian links to convert:")
        for i, (original, converted) in enumerate(conversions, 1):
            print(f"  {i}. {original}")
            print(f"     → {converted}")
        
        if not test_mode:
            # Write converted content back to file
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(converted_content)
                print(f"\n✅ Successfully converted {len(conversions)} links in {file_path}")
            except Exception as e:
                print(f"Error writing file: {e}")
                return False
        else:
            print(f"\n🧪 Test mode: Would convert {len(conversions)} links in {file_path}")
        
        return True
    else:
        print("No Obsidian-style links found to convert.")
        return False


def main():
    parser = argparse.ArgumentParser(description="Convert Obsidian links to GitHub-compatible relative links")
    parser.add_argument("file_path", help="Path to the markdown file to convert")
    parser.add_argument("--test", action="store_true", help="Test mode - show conversions without modifying files")
    
    args = parser.parse_args()
    
    success = convert_file(args.file_path, test_mode=args.test)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
