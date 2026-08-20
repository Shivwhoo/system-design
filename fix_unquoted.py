import os
import re

docs_dir = "/home/shivwhoo/system design primer/study-site/docs"

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Find href=something and replace with href="something"
            # It should not replace if it's already quoted.
            # Example: href=http://... -> href="http://..."
            new_content = re.sub(r'href=([^\s>"]+)', r'href="\1"', content)
            new_content = re.sub(r'src=([^\s>"]+)', r'src="\1"', new_content)
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)

print("Fixed unquoted attributes.")
