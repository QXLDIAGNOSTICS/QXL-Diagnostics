import os
import re

src_dir = "src"

def process_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content
        
        # Replace "/tests/" with "/" for URLs
        new_content = re.sub(r'https://www\.qxldiagnostics\.com/tests/', 'https://www.qxldiagnostics.com/', new_content)
        new_content = re.sub(r'`/tests/\${', '`/${', new_content)
        new_content = re.sub(r'"/tests/', '"/', new_content)
        new_content = re.sub(r"'/tests/", "'/", new_content)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated URL paths in: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            filepath = os.path.join(root, file)
            process_file(filepath)

print("Finished removing /tests/ prefix across the entire application.")
