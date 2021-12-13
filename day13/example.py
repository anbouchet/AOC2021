from lib import parseFold, parsePoint


raw = """6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5"""

points, folds = [part.split('\n') for part in raw.split('\n\n')]

points = [parsePoint(p) for p in points]
folds = [parseFold(f) for f in folds]
