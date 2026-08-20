import{_ as s,o as r,c as i,a3 as n}from"./chunks/framework.B5WAEDB7.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/online_chat.md","filePath":"object-oriented-design/online_chat.md"}'),t={name:"object-oriented-design/online_chat.md"};function a(d,e,_,l,o,f){return r(),i("div",null,[...e[0]||(e[0]=[n(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design an online chat\\n\\n## Constraints and assumptions</p><ul><li>Assume we&#39;ll focus on the following workflows: <ul><li>Text conversations only</li><li>Users <ul><li>Add a user</li><li>Remove a user</li><li>Update a user</li><li>Add to a user&#39;s friends list <ul><li>Add friend request <ul><li>Approve friend request</li><li>Reject friend request</li></ul></li></ul></li><li>Remove from a user&#39;s friends list</li></ul></li><li>Create a group chat <ul><li>Invite friends to a group chat</li><li>Post a message to a group chat</li></ul></li><li>Private 1-1 chat <ul><li>Invite a friend to a private chat</li><li>Post a meesage to a private chat</li></ul></li></ul></li><li>No need to worry about scaling initially\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile online_chat.py from abc import ABCMeta</li></ul><p>class UserService(object):</p><pre><code>def __init__(self):
    self.users_by_id = {}  # key: user id, value: User

def add_user(self, user_id, name, pass_hash):  # ...
def remove_user(self, user_id):  # ...
def add_friend_request(self, from_user_id, to_user_id):  # ...
def approve_friend_request(self, from_user_id, to_user_id):  # ...
def reject_friend_request(self, from_user_id, to_user_id):  # ...
</code></pre><p>class User(object):</p><pre><code>def __init__(self, user_id, name, pass_hash):
    self.user_id = user_id
    self.name = name
    self.pass_hash = pass_hash
    self.friends_by_id = {}  # key: friend id, value: User
    self.friend_ids_to_private_chats = {}  # key: friend id, value: private chats
    self.group_chats_by_id = {}  # key: chat id, value: GroupChat
    self.received_friend_requests_by_friend_id = {}  # key: friend id, value: AddRequest
    self.sent_friend_requests_by_friend_id = {}  # key: friend id, value: AddRequest

def message_user(self, friend_id, message):  # ...
def message_group(self, group_id, message):  # ...
def send_friend_request(self, friend_id):  # ...
def receive_friend_request(self, friend_id):  # ...
def approve_friend_request(self, friend_id):  # ...
def reject_friend_request(self, friend_id):  # ...
</code></pre><p>class Chat(metaclass=ABCMeta):</p><pre><code>def __init__(self, chat_id):
    self.chat_id = chat_id
    self.users = []
    self.messages = []
</code></pre><p>class PrivateChat(Chat):</p><pre><code>def __init__(self, first_user, second_user):
    super(PrivateChat, self).__init__()
    self.users.append(first_user)
    self.users.append(second_user)
</code></pre><p>class GroupChat(Chat):</p><pre><code>def add_user(self, user):  # ...
def remove_user(self, user):  # ... 
</code></pre><p>class Message(object):</p><pre><code>def __init__(self, message_id, message, timestamp):
    self.message_id = message_id
    self.message = message
    self.timestamp = timestamp
</code></pre><p>class AddRequest(object):</p><pre><code>def __init__(self, from_user_id, to_user_id, request_status, timestamp):
    self.from_user_id = from_user_id
    self.to_user_id = to_user_id
    self.request_status = request_status
    self.timestamp = timestamp
</code></pre><p>class RequestStatus(Enum):</p><pre><code>UNREAD = 0
READ = 1
ACCEPTED = 2
REJECTED = 3\\n\`\`\`
</code></pre>`,18)])])}const c=s(t,[["render",a]]);export{p as __pageData,c as default};
