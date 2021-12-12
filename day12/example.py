
from lib import Edge


value = """start-A
start-b
A-c
A-b
b-d
A-end
b-end"""

data = [Edge(*l.split('-')) for l in value.split('\n')]
