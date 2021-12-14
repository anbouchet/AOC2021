# cSpell: disable
raw = """NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C"""
# cSpell: enable
start, rules = raw.split('\n\n')

rules = [tuple(r.split(' -> ')) for r in rules.split('\n')]
