import os

repo_root = "/Users/fiberta/work/desktop-commander-gemini"
obsidian_vault_root = os.path.join(repo_root, "Context7_Docs")
convert_script = os.path.join(repo_root, "convert_links.py")

for root, _, files in os.walk(obsidian_vault_root):
    for file in files:
        if file.endswith(".md"):
            filepath = os.path.join(root, file)
            print(f"Processing: {filepath}")
            # Execute the conversion script for each markdown file
            os.system(f"python3 {convert_script} \"{filepath}\" \"{obsidian_vault_root}\"")
