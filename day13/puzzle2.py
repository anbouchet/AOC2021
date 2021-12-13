import numpy as np
from lib import makeMatrix, prettyPrintMat, foldMatrix
from input import points, folds

mat = makeMatrix(points)

folded = mat
for axis, rank in folds:
    folded = foldMatrix(folded, axis, rank)

prettyPrintMat(folded)
