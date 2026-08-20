import{_ as l,o as a,c as n,a3 as s}from"./chunks/framework.B5WAEDB7.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/call_center.md","filePath":"object-oriented-design/call_center.md"}'),t={name:"object-oriented-design/call_center.md"};function o(r,e,c,i,p,_){return a(),n("div",null,[...e[0]||(e[0]=[s(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design a call center\\n\\n## Constraints and assumptions</p><ul><li>What levels of employees are in the call center? <ul><li>Operator, supervisor, director</li></ul></li><li>Can we assume operators always get the initial calls? <ul><li>Yes</li></ul></li><li>If there is no available operators or the operator can&#39;t handle the call, does the call go to the supervisors? <ul><li>Yes</li></ul></li><li>If there is no available supervisors or the supervisor can&#39;t handle the call, does the call go to the directors? <ul><li>Yes</li></ul></li><li>Can we assume the directors can handle all calls? <ul><li>Yes</li></ul></li><li>What happens if nobody can answer the call? <ul><li>It gets queued</li></ul></li><li>Do we need to handle &#39;VIP&#39; calls where we put someone to the front of the line? <ul><li>No</li></ul></li><li>Can we assume inputs are valid or do we have to validate them? <ul><li>Assume they&#39;re valid\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile call_center.py from abc import ABCMeta, abstractmethod from collections import deque from enum import Enum</li></ul></li></ul><p>class Rank(Enum):</p><pre><code>OPERATOR = 0
SUPERVISOR = 1
DIRECTOR = 2
</code></pre><p>class Employee(metaclass=ABCMeta):</p><pre><code>def __init__(self, employee_id, name, rank, call_center):
    self.employee_id = employee_id
    self.name = name
    self.rank = rank
    self.call = None
    self.call_center = call_center

def take_call(self, call):
    &quot;&quot;&quot;Assume the employee will always successfully take the call.&quot;&quot;&quot;
    self.call = call
    self.call.employee = self
    self.call.state = CallState.IN_PROGRESS

def complete_call(self):
    self.call.state = CallState.COMPLETE
    self.call_center.notify_call_completed(self.call)

@abstractmethod
def escalate_call(self):
    pass

def _escalate_call(self):
    self.call.state = CallState.READY
    call = self.call
    self.call = None
    self.call_center.notify_call_escalated(call)
</code></pre><p>class Operator(Employee):</p><pre><code>def __init__(self, employee_id, name):
    super(Operator, self).__init__(employee_id, name, Rank.OPERATOR)

def escalate_call(self):
    self.call.level = Rank.SUPERVISOR
    self._escalate_call()
</code></pre><p>class Supervisor(Employee):</p><pre><code>def __init__(self, employee_id, name):
    super(Operator, self).__init__(employee_id, name, Rank.SUPERVISOR)

def escalate_call(self):
    self.call.level = Rank.DIRECTOR
    self._escalate_call()
</code></pre><p>class Director(Employee):</p><pre><code>def __init__(self, employee_id, name):
    super(Operator, self).__init__(employee_id, name, Rank.DIRECTOR)

def escalate_call(self):
    raise NotImplemented(&#39;Directors must be able to handle any call&#39;)
</code></pre><p>class CallState(Enum):</p><pre><code>READY = 0
IN_PROGRESS = 1
COMPLETE = 2
</code></pre><p>class Call(object):</p><pre><code>def __init__(self, rank):
    self.state = CallState.READY
    self.rank = rank
    self.employee = None
</code></pre><p>class CallCenter(object):</p><pre><code>def __init__(self, operators, supervisors, directors):
    self.operators = operators
    self.supervisors = supervisors
    self.directors = directors
    self.queued_calls = deque()

def dispatch_call(self, call):
    if call.rank not in (Rank.OPERATOR, Rank.SUPERVISOR, Rank.DIRECTOR):
        raise ValueError(&#39;Invalid call rank: {}&#39;.format(call.rank))
    employee = None
    if call.rank == Rank.OPERATOR:
        employee = self._dispatch_call(call, self.operators)
    if call.rank == Rank.SUPERVISOR or employee is None:
        employee = self._dispatch_call(call, self.supervisors)
    if call.rank == Rank.DIRECTOR or employee is None:
        employee = self._dispatch_call(call, self.directors)
    if employee is None:
        self.queued_calls.append(call)

def _dispatch_call(self, call, employees):
    for employee in employees:
        if employee.call is None:
            employee.take_call(call)
            return employee
    return None

def notify_call_escalated(self, call):  # ...
def notify_call_completed(self, call):  # ...
def dispatch_queued_call_to_newly_freed_employee(self, call, employee):  # ...\\n\`\`\`
</code></pre>`,18)])])}const m=l(t,[["render",o]]);export{d as __pageData,m as default};
