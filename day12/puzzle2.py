from lib import adjacency_list, find_all_paths
from input import data


print(data)

neighbor_map = adjacency_list(data)
paths = list(find_all_paths(neighbor_map, "start", "end", 1))
print(paths)
print(len(paths))