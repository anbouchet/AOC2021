from typing import List, NamedTuple


class Edge(NamedTuple):
    begin: str
    end: str

    def __repr__(self):
        return f"< {self.begin} - {self.end} >"


def adjacency_list(edgelist: List[Edge]):
    res: dict[str, List[str]] = {}
    for begin, end in edgelist:
        res[begin] = res.get(begin, []) + [end]
        res[end] = res.get(end, []) + [begin]
    return res


def find_all_paths(neighbor_map: dict[str, List[str]], start: str, end: str, single_small_max_repeats: int):
    path = []
    stack = [("visit", start)]
    small_cave_occurrence = None

    while stack:
        action = stack.pop()
        match action:
            case "dec_occ":
                node, count = small_cave_occurrence
                small_cave_occurrence = (node, count - 1)

            case "reset_occ":
                small_cave_occurrence = None

            case ("visit", node):
                # handle small cave specific behavior
                if node.islower() and node in path:
                    if single_small_max_repeats <= 0:
                        continue
                    if node == start:
                        continue
                    if small_cave_occurrence == None:
                        small_cave_occurrence = (node, 1)
                        stack.append("reset_occ")
                    elif small_cave_occurrence[0] != node:
                        continue
                    elif small_cave_occurrence[1] < single_small_max_repeats:
                        small_cave_occurrence = (
                            node,
                            small_cave_occurrence[1] + 1
                        )
                        stack.append("dec_occ")
                    else:
                        continue
                if node == end:
                    yield path + [end]
                    continue
                path.append(node)
                stack.append(("pop", node))
                stack.extend([("visit", n) for n in neighbor_map[node]])

            case ("pop", node):
                path.reverse()
                path.remove(node)
                path.reverse()
