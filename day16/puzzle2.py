from lib import *
from input import raw

raw_bin = hex_str_to_bin_str(raw)
print(raw_bin)

parsed, = parse(raw_bin)
print(parsed)

result = eval_tree(parsed)
print(result)