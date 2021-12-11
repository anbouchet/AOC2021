#!/usr/bin/python3.10
import numpy as np
# too lazy to set up a thing to download this from the advent of code API
input = """5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526""".splitlines(False)

data = np.asarray(list(map(lambda l: list(map(lambda e: int(e), list(l))), input)))
print(data)