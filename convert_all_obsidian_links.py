#!/usr/bin/env python3
"""
Batch convert all Obsidian-style [[]] links to GitHub-compatible relative markdown links.

Usage:
    python convert_all_obsidian_links.py [vault_path] [--test]
    
Options:
    --test    Test mode - show conversions without modifying files
"""

import os
import sys
import argparse
from pathlib import Path
from convert_obsidian_links import convert_file, find_obsidian_vault_root


def find_all_markdown_files(vault_path):
    """Find all markdown files in the vault."""
    vault_path = Path(vault_path)
    markdown_files = []
    
    for root, dirs, files in os.walk(vault_path):
        # Skip .obsidian directory
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(Path(root) / file)
    
    return markdown_files


def convert_all_files(vault_path, test_mode=False):
    """Convert all markdown files in the vault."""
    vault_path = Path(vault_path)
    
    if not vault_path.exists():
        print(f"Error: Vault path does not exist: {vault_path}")
        return False
    
    # Verify it's an Obsidian vault
    if not (vault_path / '.obsidian').exists():
        print(f"Error: Not an Obsidian vault (no .obsidian folder found): {vault_path}")
        return False
    
    # Find all markdown files
    markdown_files = find_all_markdown_files(vault_path)
    
    if not markdown_files:
        print("No markdown files found in vault.")
        return True
    
    print(f"Found {len(markdown_files)} markdown files to process...")
    
    converted_files = 0
    total_conversions = 0
    
    for file_path in sorted(markdown_files):
        print(f"\n{'='*60}")
        result = convert_file(file_path, test_mode=test_mode)
        if result:
            converted_files += 1
    
    print(f"\n{'='*60}")
    if test_mode:
        print(f"🧪 Test complete: Would convert links in {converted_files} out of {len(markdown_files)} files")
    else:
        print(f"✅ Conversion complete: Updated {converted_files} out of {len(markdown_files)} files")
    
    return True


def main():
    parser = argparse.ArgumentParser(description="Convert all Obsidian links to GitHub-compatible relative links")
    parser.add_argument("vault_path", nargs='?', default="obsidian-vault", 
                       help="Path to the Obsidian vault directory (default: obsidian-vault)")
    parser.add_argument("--test", action="store_true", 
                       help="Test mode - show conversions without modifying files")
    
    args = parser.parse_args()
    
    success = convert_all_files(args.vault_path, test_mode=args.test)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
