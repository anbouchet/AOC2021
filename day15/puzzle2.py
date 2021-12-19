from lib import format_node_name, process_input, to_grid, wrap_num
from input import raw
import networkx as nx

# preprocessing
grid = to_grid(raw)
og_height = len(grid)
og_width = len(grid[0])
for i in range(4):
    for j in range(og_height):
        new = [wrap_num(el + i + 1, 1, 9) for el in grid[j][:og_width]]
        grid[j].extend(new)
for i in range(4):
    og_lines = grid[:og_height]
    new = [[wrap_num(v + i + 1, 1, 9) for v in l] for l in og_lines]
    grid.extend(new)
grid_str = '\n'.join(''.join(str(v) for v in l) for l in grid)
print(grid_str)

data, width, height = process_input(grid_str)
print(f"{data = !s}")

path = nx.algorithms.shortest_paths.shortest_path_length(
    data,
    format_node_name(0, 0),
    format_node_name(width - 1, height - 1),
    'weight'
)
print(f"{path = }")
