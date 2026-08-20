import{_ as n,o as t,c as o,a3 as s}from"./chunks/framework.B5WAEDB7.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/lru_cache.md","filePath":"object-oriented-design/lru_cache.md"}'),l={name:"object-oriented-design/lru_cache.md"};function i(r,e,a,d,u,f){return t(),o("div",null,[...e[0]||(e[0]=[s(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design an LRU cache\\n\\n## Constraints and assumptions</p><ul><li><p>What are we caching?</p><ul><li>We are caching the results of web queries</li></ul></li><li><p>Can we assume inputs are valid or do we have to validate them?</p><ul><li>Assume they&#39;re valid</li></ul></li><li><p>Can we assume this fits memory?</p><ul><li>Yes\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile lru_cache.py class Node(object):</li></ul><p>def <strong>init</strong>(self, results): self.results = results self.prev = None self.next = None</p></li></ul><p>class LinkedList(object):</p><pre><code>def __init__(self):
    self.head = None
    self.tail = None

def move_to_front(self, node):  # ...
def append_to_front(self, node):  # ...
def remove_from_tail(self):  # ...
</code></pre><p>class Cache(object):</p><pre><code>def __init__(self, MAX_SIZE):
    self.MAX_SIZE = MAX_SIZE
    self.size = 0
    self.lookup = {}  # key: query, value: node
    self.linked_list = LinkedList()

def get(self, query)
    &quot;&quot;&quot;Get the stored query result from the cache.
    
    Accessing a node updates its position to the front of the LRU list.
    &quot;&quot;&quot;
    node = self.lookup.get(query)
    if node is None:
        return None
    self.linked_list.move_to_front(node)
    return node.results

def set(self, results, query):
    &quot;&quot;&quot;Set the result for the given query key in the cache.
    
    When updating an entry, updates its position to the front of the LRU list.
    If the entry is new and the cache is at capacity, removes the oldest entry
    before the new entry is added.
    &quot;&quot;&quot;
    node = self.lookup.get(query)
    if node is not None:
        # Key exists in cache, update the value
        node.results = results
        self.linked_list.move_to_front(node)
    else:
        # Key does not exist in cache
        if self.size == self.MAX_SIZE:
            # Remove the oldest entry from the linked list and lookup
            self.lookup.pop(self.linked_list.tail.query, None)
            self.linked_list.remove_from_tail()
        else:
            self.size += 1
        # Add the new key and value
        new_node = Node(results)
        self.linked_list.append_to_front(new_node)
        self.lookup[query] = new_node\\n\`\`\`
</code></pre>`,6)])])}const p=n(l,[["render",i]]);export{c as __pageData,p as default};
