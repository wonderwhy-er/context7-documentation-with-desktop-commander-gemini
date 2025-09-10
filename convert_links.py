import re
import os

def convert_obsidian_links(filepath, base_dir):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find Obsidian links: [[filepath|displaytext]] or [[filepath]]
    # Group 1: full path (potentially with spaces and special chars)
    # Group 2: display text (if '|' is present)
    pattern = re.compile(r'\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]')

    def replace_link(match):
        full_link_target = match.group(1).strip()
        display_text = match.group(2)
        
        # Determine the file extension. Obsidian links often omit .md
        # Assume .md if no extension is present
        if not os.path.splitext(full_link_target)[1]:
            full_link_target += ".md"

        # Calculate the relative path from the current file's directory to the target file
        # This is crucial for GitHub compatibility
        current_file_dir = os.path.dirname(filepath)
        # Construct the absolute path to the target file based on the base_dir of the vault
        abs_target_path = os.path.join(base_dir, full_link_target)
        
        # Ensure the target file exists before trying to calculate relative path.
        # If it doesn't exist, we might have a broken link or a new file not yet created.
        # For this script, we'll assume valid targets for conversion.
        # In a real pre-commit hook, you might want to log warnings for non-existent files.
        
        relative_path = os.path.relpath(abs_target_path, current_file_dir)
        
        # Normalize path separators for consistency (forward slashes for URLs)
        relative_path = relative_path.replace('\\\\', '/') # Escape backslashes for replace operation

        if display_text:
            return f'[{display_text}]({relative_path})'
        else:
            # Use the actual filename (without .md) from the target path as display text
            # if no display text was provided. This mimics Obsidian's default behavior.
            display_text = os.path.basename(full_link_target)
            if display_text.endswith(".md"):
                display_text = display_text[:-3] # Remove .md extension
            return f'[{display_text}]({relative_path})'

    new_content = pattern.sub(replace_link, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == '__main__':
    import sys
    # For command line execution: python convert_links.py <FILEPATH> <BASE_DIR>
    if len(sys.argv) == 3:
        file_to_convert = sys.argv[1]
        vault_base_dir = sys.argv[2]
        if convert_obsidian_links(file_to_convert, vault_base_dir):
            print(f"Successfully converted links in: {file_to_convert}")
        else:
            print(f"No links converted or file not modified: {file_to_convert}")
    else:
        print("Usage: python convert_links.py <FILEPATH> <BASE_DIR>")
        sys.exit(1)
