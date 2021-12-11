#!/usr/bin/python3.10
import numpy as np
# too lazy to set up a thing to download this from the advent of code API
input = """4472562264
8631517827
7232144146
2447163824
1235272671
5133527146
6511372417
3841841614
8621368782
3246336677""".splitlines(False)

data = np.asarray(list(map(lambda l: list(map(lambda e: int(e), list(l))), input)))
print(data)