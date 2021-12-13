import numpy as np
from lib import makeMatrix, prettyPrintMat, foldMatrix
from input import points, folds

mat = makeMatrix(points)

axis, rank = folds[0]
folded = foldMatrix(mat, axis, rank)
prettyPrintMat(folded)

print(np.sum(folded))