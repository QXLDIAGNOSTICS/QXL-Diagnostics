import os
import re

src_dir = "src"

def replace_in_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content
        # Replace variations while preserving exact casing conventions
        new_content = re.sub(r'NABL[ -][Cc]ertified', 'NABL Accredited', new_content)
        new_content = re.sub(r'NABL[ -][Cc]ertification', 'NABL Accreditation', new_content)
        new_content = re.sub(r'nabl[ -]certified', 'nabl-accredited', new_content)
        new_content = re.sub(r'NABL Certified Lab', 'NABL Accredited Lab', new_content)
        new_content = re.sub(r'NABL certified lab', 'NABL accredited lab', new_content)
        new_content = re.sub(r'certified laboratory', 'accredited laboratory', new_content, flags=re.IGNORECASE)
        new_content = re.sub(r'certified lab', 'accredited lab', new_content, flags=re.IGNORECASE)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error updating {filepath}: {e}")

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.txt', '.py', '.md')):
            filepath = os.path.join(root, file)
            replace_in_file(filepath)

# Also update public/llms.txt
if os.path.exists("public/llms.txt"):
    replace_in_file("public/llms.txt")

print("Completed NABL Accredited global replacement.")
