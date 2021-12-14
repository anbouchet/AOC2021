from collections import Counter
from typing import List, Tuple


def build_pair_map(string: str):
    res: dict[str, int] = {}
    for i in range(len(string)-1):
        pair = string[i:i+2]
        res[pair] = res.get(pair, 0)+1
    return res


def step(pair_map: dict[str, int], rules: List[Tuple[str, str]], letter_counter: Counter):
    res: dict[str, int] = {}
    for template, insert in rules:
        left = template[0] + insert
        right = insert + template[1]
        matches = pair_map.get(template, 0)
        res[left] = res.get(left, 0) + matches
        res[right] = res.get(right, 0) + matches
        letter_counter[insert] += matches
    return res, letter_counter


def sim_steps(iterations: int, init: str, rules: List[Tuple[str, str]]):
    res = build_pair_map(init)
    counter = Counter(init)
    for i in range(iterations):
        print(f"simulating step {i+1}...")
        res, counter = step(res, rules, counter)
    return res, counter


def find_min_max_occurrences(hist: Counter):
    t = hist.most_common()
    return t[-1][1], t[0][1]
