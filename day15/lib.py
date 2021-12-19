from typing import List, Tuple
import networkx as nx


def get_neighbor_pos(grid: List[List[str]], x: int, y: int) -> List[Tuple[int, int]]:
    height = len(grid)
    width = len(grid[0])

    res = []
    if x - 1 >= 0:
        res.append((x - 1, y))
    if y - 1 >= 0:
        res.append((x, y - 1))
    if x + 1 < width:
        res.append((x + 1, y))
    if y + 1 < height:
        res.append((x, y + 1))
    return res


def get_neighbor_values(grid: List[List[str]], x: int, y: int) -> List[int]:
    neighbor_positions = get_neighbor_pos(grid, x, y)
    return [grid[y][x] for x, y in neighbor_positions]


def format_node_name(x, y) -> str:
    return f"{x},{y}"


def to_grid(raw_data: str):
    return [[int(n) for n in list(line)] for line in raw_data.split('\n')]


def process_input(raw_data: str):
    res = nx.DiGraph()
    grid = to_grid(raw_data)
    height = len(grid)
    width = len(grid[0])
    for y in range(height):
        for x in range(width):
            current_name = format_node_name(x, y)
            neighbors = get_neighbor_pos(grid, x, y)
            res.add_weighted_edges_from(
                [
                    (format_node_name(xn, yn), current_name, grid[y][x])
                    for xn, yn in neighbors
                ]
            )
    return res, height, width


def wrap_num(n: int, l: int, u: int) -> int:
    return (n - l) % (u - l + 1) + l
