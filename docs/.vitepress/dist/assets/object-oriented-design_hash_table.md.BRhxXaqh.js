import{_ as n,o as i,c as t,a3 as s}from"./chunks/framework.B5WAEDB7.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/hash_table.md","filePath":"object-oriented-design/hash_table.md"}'),a={name:"object-oriented-design/hash_table.md"};function l(r,e,o,f,h,d){return i(),t("div",null,[...e[0]||(e[0]=[s(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design a hash map\\n\\n## Constraints and assumptions</p><ul><li><p>For simplicity, are the keys integers only?</p><ul><li>Yes</li></ul></li><li><p>For collision resolution, can we use chaining?</p><ul><li>Yes</li></ul></li><li><p>Do we have to worry about load factors?</p><ul><li>No</li></ul></li><li><p>Can we assume inputs are valid or do we have to validate them?</p><ul><li>Assume they&#39;re valid</li></ul></li><li><p>Can we assume this fits memory?</p><ul><li>Yes\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile hash_map.py class Item(object):</li></ul><p>def <strong>init</strong>(self, key, value): self.key = key self.value = value</p></li></ul><p>class HashTable(object):</p><pre><code>def __init__(self, size):
    self.size = size
    self.table = [[] for _ in range(self.size)]

def _hash_function(self, key):
    return key % self.size

def set(self, key, value):
    hash_index = self._hash_function(key)
    for item in self.table[hash_index]:
        if item.key == key:
            item.value = value
            return
    self.table[hash_index].append(Item(key, value))

def get(self, key):
    hash_index = self._hash_function(key)
    for item in self.table[hash_index]:
        if item.key == key:
            return item.value
    raise KeyError(&#39;Key not found&#39;)

def remove(self, key):
    hash_index = self._hash_function(key)
    for index, item in enumerate(self.table[hash_index]):
        if item.key == key:
            del self.table[hash_index][index]
            return
    raise KeyError(&#39;Key not found&#39;)\\n\`\`\`
</code></pre>`,4)])])}const p=n(a,[["render",l]]);export{_ as __pageData,p as default};
