import os
import re

docs_dir = "/home/shivwhoo/system design primer/study-site/docs"

link_mappings = {
    r'solutions/system_design/([^/]+)/README\.md': r'/system-design-interviews/\1',
    r'solutions/object_oriented_design/([^/]+)/[^.]+\.ipynb': r'/object-oriented-design/\1',
    r'#performance-vs-scalability': r'/core-concepts/performance-and-scalability',
    r'#latency-vs-throughput': r'/core-concepts/latency-vs-throughput',
    r'#availability-vs-consistency': r'/core-concepts/availability-vs-consistency',
    r'#cap-theorem': r'/core-concepts/availability-vs-consistency#cap-theorem',
    r'#consistency-patterns': r'/core-concepts/consistency-patterns',
    r'#availability-patterns': r'/core-concepts/availability-patterns',
    r'#domain-name-system': r'/core-concepts/domain-name-system',
    r'#content-delivery-network': r'/core-concepts/content-delivery-network',
    r'#load-balancer': r'/core-concepts/load-balancer',
    r'#reverse-proxy-web-server': r'/core-concepts/reverse-proxy',
    r'#application-layer': r'/core-concepts/application-layer',
    r'#database': r'/core-concepts/database',
    r'#cache': r'/core-concepts/cache',
    r'#asynchronism': r'/core-concepts/asynchronism',
    r'#communication': r'/core-concepts/communication',
    r'#security': r'/core-concepts/security',
}

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in link_mappings.items():
                new_content = re.sub(pattern, replacement, new_content)
            
            # Fix duplicate back-links inside solutions
            new_content = re.sub(r'\.\./scaling_aws/README', r'/system-design-interviews/scaling_aws', new_content)
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)

print("Fixed internal links.")
