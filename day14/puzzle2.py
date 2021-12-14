from input import start, rules
from lib import sim_steps, find_min_max_occurrences
print(start, rules)

polymer_pairs, hist = sim_steps(40, start, rules)

lcc, mcc = find_min_max_occurrences(hist)

print(mcc - lcc)
