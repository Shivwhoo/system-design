import os
import re

docs_dir = "/home/shivwhoo/system design primer/study-site/docs"

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Find /assets/images/http... and replace with http...
            new_content = content.replace("/assets/images/http", "http")
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)

print("Fixed http images.")
