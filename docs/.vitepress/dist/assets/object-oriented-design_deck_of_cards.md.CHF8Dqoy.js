import{_ as n,o as a,c as s,a3 as r}from"./chunks/framework.B5WAEDB7.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"object-oriented-design/deck_of_cards.md","filePath":"object-oriented-design/deck_of_cards.md"}'),l={name:"object-oriented-design/deck_of_cards.md"};function t(d,e,c,o,i,_){return a(),s("div",null,[...e[0]||(e[0]=[r(`<p>This notebook was prepared by <a href="https://github.com/donnemartin" target="_blank" rel="noreferrer">Donne Martin</a>. Source and license info is on <a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer">GitHub</a>.\\n\\n# Design a deck of cards\\n\\n## Constraints and assumptions</p><ul><li>Is this a generic deck of cards for games like poker and black jack? <ul><li>Yes, design a generic deck then extend it to black jack</li></ul></li><li>Can we assume the deck has 52 cards (2-10, Jack, Queen, King, Ace) and 4 suits? <ul><li>Yes</li></ul></li><li>Can we assume inputs are valid or do we have to validate them? <ul><li>Assume they&#39;re valid\\n\\n## Solution\\n\\n\`\`\`python\\n%%writefile deck_of_cards.py from abc import ABCMeta, abstractmethod from enum import Enum import sys</li></ul></li></ul><p>class Suit(Enum):</p><pre><code>HEART = 0
DIAMOND = 1
CLUBS = 2
SPADE = 3
</code></pre><p>class Card(metaclass=ABCMeta):</p><pre><code>def __init__(self, value, suit):
    self.value = value
    self.suit = suit
    self.is_available = True

@property
@abstractmethod
def value(self):
    pass

@value.setter
@abstractmethod
def value(self, other):
    pass
</code></pre><p>class BlackJackCard(Card):</p><pre><code>def __init__(self, value, suit):
    super(BlackJackCard, self).__init__(value, suit)

def is_ace(self):
    return self._value == 1

def is_face_card(self):
    &quot;&quot;&quot;Jack = 11, Queen = 12, King = 13&quot;&quot;&quot;
    return 10 &lt; self._value &lt;= 13

@property
def value(self):
    if self.is_ace() == 1:
        return 1
    elif self.is_face_card():
        return 10
    else:
        return self._value

@value.setter
def value(self, new_value):
    if 1 &lt;= new_value &lt;= 13:
        self._value = new_value
    else:
        raise ValueError(&#39;Invalid card value: {}&#39;.format(new_value))
</code></pre><p>class Hand(object):</p><pre><code>def __init__(self, cards):
    self.cards = cards

def add_card(self, card):
    self.cards.append(card)

def score(self):
    total_value = 0
    for card in self.cards:
        total_value += card.value
    return total_value
</code></pre><p>class BlackJackHand(Hand):</p><pre><code>BLACKJACK = 21

def __init__(self, cards):
    super(BlackJackHand, self).__init__(cards)

def score(self):
    min_over = sys.MAXSIZE
    max_under = -sys.MAXSIZE
    for score in self.possible_scores():
        if self.BLACKJACK &lt; score &lt; min_over:
            min_over = score
        elif max_under &lt; score &lt;= self.BLACKJACK:
            max_under = score
    return max_under if max_under != -sys.MAXSIZE else min_over

def possible_scores(self):
    &quot;&quot;&quot;Return a list of possible scores, taking Aces into account.&quot;&quot;&quot;
    # ...
</code></pre><p>class Deck(object):</p><pre><code>def __init__(self, cards):
    self.cards = cards
    self.deal_index = 0

def remaining_cards(self):
    return len(self.cards) - deal_index

def deal_card():
    try:
        card = self.cards[self.deal_index]
        card.is_available = False
        self.deal_index += 1
    except IndexError:
        return None
    return card

def shuffle(self):  # ...\\n\`\`\`
</code></pre>`,14)])])}const p=n(l,[["render",t]]);export{u as __pageData,p as default};
