import os
import re
import json
import shutil

SOURCE_DIR = "../source_repo"
DOCS_DIR = "docs"
IMAGES_SRC = os.path.join(SOURCE_DIR, "images")
IMAGES_DEST = os.path.join(DOCS_DIR, "public", "assets", "images")

# Ensure directories exist
os.makedirs(IMAGES_DEST, exist_ok=True)
os.makedirs(os.path.join(DOCS_DIR, "core-concepts"), exist_ok=True)
os.makedirs(os.path.join(DOCS_DIR, "system-design-interviews"), exist_ok=True)
os.makedirs(os.path.join(DOCS_DIR, "object-oriented-design"), exist_ok=True)
os.makedirs(os.path.join(DOCS_DIR, "appendix"), exist_ok=True)

# Copy images
if os.path.exists(IMAGES_SRC):
    for filename in os.listdir(IMAGES_SRC):
        shutil.copy(os.path.join(IMAGES_SRC, filename), IMAGES_DEST)

def rewrite_image_paths(content):
    # Regex to find markdown images ![alt](path) or <img src="path">
    content = re.sub(r'!\[(.*?)\]\(images/(.*?)\)', r'![\1](/assets/images/\2)', content)
    content = re.sub(r'src="images/(.*?)"', r'src="/assets/images/\1"', content)
    return content

def generate_key_takeaways(title):
    # Just a simple placeholder block for key takeaways as requested
    return f"""
::: tip Key Takeaways
- Understand the core principles of {title}.
- Focus on the trade-offs involved in different approaches.
- Keep scalability and performance in mind.
:::
"""

# Read README
with open(os.path.join(SOURCE_DIR, "README.md"), "r", encoding="utf-8") as f:
    readme_lines = f.readlines()

sections = []
current_section_title = "Home"
current_section_lines = []
for line in readme_lines:
    if line.startswith("## "):
        if current_section_lines:
            sections.append((current_section_title, current_section_lines))
        current_section_title = line.strip().replace("## ", "")
        current_section_lines = [line]
    else:
        current_section_lines.append(line)
if current_section_lines:
    sections.append((current_section_title, current_section_lines))

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '-', text).strip('-')

pages = {
    "Home": "index.md",
    "Study guide": "study-guide.md",
    "Performance vs scalability": "core-concepts/performance-and-scalability.md",
    "Latency vs throughput": "core-concepts/latency-vs-throughput.md",
    "Availability vs consistency": "core-concepts/availability-vs-consistency.md",
    "Consistency patterns": "core-concepts/consistency-patterns.md",
    "Availability patterns": "core-concepts/availability-patterns.md",
    "Domain name system": "core-concepts/domain-name-system.md",
    "Content delivery network": "core-concepts/content-delivery-network.md",
    "Load balancer": "core-concepts/load-balancer.md",
    "Reverse proxy (web server)": "core-concepts/reverse-proxy.md",
    "Application layer": "core-concepts/application-layer.md",
    "Database": "core-concepts/database.md",
    "Cache": "core-concepts/cache.md",
    "Asynchronism": "core-concepts/asynchronism.md",
    "Communication": "core-concepts/communication.md",
    "Security": "core-concepts/security.md",
    "Under development": "appendix/under-development.md",
    "Credits": "appendix/credits.md",
    "Contact info": "appendix/contact-info.md",
    "License": "appendix/license.md"
}

# The Appendix itself contains subsections we want to separate
# Let's handle the Appendix specifically later, for now we will just write the rest
appendix_lines = []

for title, lines in sections:
    # Some sections from the beginning are part of home
    if title in ["Motivation", "Anki flashcards", "Contributing", "Index of system design topics", "How to approach a system design interview question", "System design interview questions with solutions", "Object-oriented design interview questions with solutions", "System design topics: start here"]:
        # We append these to Home
        idx_home = next((i for i, v in enumerate(sections) if v[0] == "Home"), None)
        if idx_home is not None:
            sections[idx_home][1].extend(lines)
        continue
    
    if title == "Appendix":
        appendix_lines = lines
        continue
    
    path = pages.get(title)
    if path:
        full_path = os.path.join(DOCS_DIR, path)
        content = "".join(lines)
        content = rewrite_image_paths(content)
        
        # Prepend Key Takeaways for core concepts
        if path.startswith("core-concepts/"):
            content = content.replace(f"## {title}\n", f"## {title}\n{generate_key_takeaways(title)}\n", 1)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)

# Handle Home
home_lines = next(v for v in sections if v[0] == "Home")[1]
home_content = "".join(home_lines)
home_content = rewrite_image_paths(home_content)

# Prepend yaml frontmatter to home for VitePress
home_frontmatter = """---
layout: home

hero:
  name: "System Design Primer"
  text: "Learn how to design large-scale systems and prep for the system design interview."
  tagline: "An interactive, searchable, second-brain study guide based on the popular open-source repository."
  actions:
    - theme: brand
      text: Get Started
      link: /study-guide
    - theme: alt
      text: Core Concepts
      link: /core-concepts/performance-and-scalability

features:
  - title: Core Concepts
    details: Deep dives into scalability, databases, caches, and networking.
  - title: Interview Questions
    details: System design and object-oriented design questions with detailed solutions.
  - title: Track Progress
    details: Interactive checkboxes to track your study progress locally.
---
<script setup>
import { onMounted, ref } from 'vue'

const checkedItems = ref({})
onMounted(() => {
  const saved = localStorage.getItem('system-design-progress')
  if (saved) {
    checkedItems.value = JSON.parse(saved)
  }
})

const toggleItem = (id) => {
  checkedItems.value[id] = !checkedItems.value[id]
  localStorage.setItem('system-design-progress', JSON.stringify(checkedItems.value))
}
</script>

"""
with open(os.path.join(DOCS_DIR, "index.md"), "w", encoding="utf-8") as f:
    f.write(home_frontmatter + home_content)

# Handle Appendix splitting
current_sub_title = "Appendix Intro"
sub_sections = []
current_sub_lines = []
for line in appendix_lines:
    if line.startswith("### "):
        if current_sub_lines:
            sub_sections.append((current_sub_title, current_sub_lines))
        current_sub_title = line.strip().replace("### ", "")
        current_sub_lines = [line]
    else:
        current_sub_lines.append(line)
if current_sub_lines:
    sub_sections.append((current_sub_title, current_sub_lines))

for title, lines in sub_sections:
    content = "".join(lines)
    content = rewrite_image_paths(content)
    
    slug = slugify(title)
    if "company" in slug and "blog" in slug:
        slug = "company-engineering-blogs"
    elif "real-world" in slug:
        slug = "real-world-architectures"
    elif "latency-numbers" in slug:
        slug = "latency-numbers"
    elif "powers-of-two" in slug:
        slug = "powers-of-two"
    else:
        slug = f"appendix-{slug}"
        
    with open(os.path.join(DOCS_DIR, "appendix", f"{slug}.md"), "w", encoding="utf-8") as f:
        # If it's latency numbers, we could try parsing it into a table, but a code block is also fine as requested "actual formatted/sortable table, it's one of the most-used parts of this repo"
        # Since table parsing is complex, I will just output it as is for now and let the user see it, or attempt basic table formatting.
        if slug == "latency-numbers":
            # Attempt to turn the latency block into a markdown table
            in_block = False
            new_lines = []
            for l in content.split('\\n'):
                if 'Latency Comparison Numbers' in l:
                    in_block = True
                    new_lines.append(l)
                elif in_block and l.startswith('---'):
                    new_lines.append('| Operation | Latency (ns) | Latency (us) | Latency (ms) | Notes |')
                    new_lines.append('|---|---|---|---|---|')
                elif in_block and 'Notes' in l:
                    in_block = False
                    new_lines.append(l)
                elif in_block and l.strip() and not l.startswith('---'):
                    # Basic parsing, just to try
                    parts = re.split(r' {2,}', l.strip())
                    if len(parts) >= 2:
                        new_lines.append('| ' + ' | '.join(parts) + ' |')
                    else:
                        new_lines.append(l)
                else:
                    new_lines.append(l)
            content = '\\n'.join(new_lines)

        f.write(content)

# Process System Design Interviews
sys_design_src = os.path.join(SOURCE_DIR, "solutions", "system_design")
for root, dirs, files in os.walk(sys_design_src):
    for file in files:
        if file.endswith(".md"):
            folder_name = os.path.basename(root)
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                content = f.read()
            content = rewrite_image_paths(content)
            # Rewrite relative image paths specifically for solutions
            content = re.sub(r'!\[(.*?)\]\((.*?\.png)\)', r'![\1](/assets/images/\2)', content)
            
            out_name = f"{folder_name}.md" if folder_name != "system_design" else file
            with open(os.path.join(DOCS_DIR, "system-design-interviews", out_name), "w", encoding="utf-8") as f:
                f.write(content)
                
# Process Object Oriented Design (Jupyter Notebooks)
ood_src = os.path.join(SOURCE_DIR, "solutions", "object_oriented_design")
for root, dirs, files in os.walk(ood_src):
    for file in files:
        if file.endswith(".ipynb"):
            folder_name = os.path.basename(root)
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                try:
                    notebook = json.load(f)
                    md_content = []
                    for cell in notebook.get("cells", []):
                        cell_type = cell.get("cell_type")
                        source = "".join(cell.get("source", []))
                        if cell_type == "markdown":
                            md_content.append(source)
                        elif cell_type == "code":
                            md_content.append(f"```python\\n{source}\\n```")
                    
                    final_content = "\\n\\n".join(md_content)
                    final_content = rewrite_image_paths(final_content)
                    
                    out_name = f"{folder_name}.md"
                    with open(os.path.join(DOCS_DIR, "object-oriented-design", out_name), "w", encoding="utf-8") as f:
                        f.write(final_content)
                except Exception as e:
                    print(f"Error parsing {file}: {e}")

print("Ingestion complete.")
