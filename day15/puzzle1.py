from lib import format_node_name, process_input
from input import raw
import networkx as nx

data, width, height = process_input(raw)
print(raw)
print(f"{data = !s}")

path = nx.algorithms.shortest_paths.shortest_path_length(data,format_node_name(0,0),format_node_name(width-1,height-1),'weight')
print(f"{path = }")