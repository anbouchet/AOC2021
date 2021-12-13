import numpy as np
from typing import List


def parsePoint(p: str):
    x, y = [int(i) for i in p.split(',')]
    return (x, y)


def parseFold(f: str):
    axis, value = f.removeprefix('fold along ').split('=')
    return (axis, int(value))


def makeMatrix(points: List[tuple[int, int]]):
    indices = [[], []]
    maxX = 0
    maxY = 0
    for x, y in points:
        maxY = max(maxY, y)
        maxX = max(maxX, x)
        indices[0].append(x)
        indices[1].append(y)
    mat = np.full((maxX + 1, maxY + 1), False, dtype=bool)
    mat[indices] = True
    return mat


def prettyPrintMat(mat: np.ndarray):
    chars = np.where(mat == True, '#', '.')
    print('\n'.join([' '.join(r) for r in chars.T]))


def foldMatrixVertical(mat: np.ndarray, column: int):
    result = np.ndarray((column, mat.shape[1]), dtype=mat.dtype)
    result[...] = mat[:column, :] | mat[:column:-1, :]
    return result


def foldMatrixHorizontal(mat: np.ndarray, line: int):
    result = np.ndarray((mat.shape[0], line), dtype=mat.dtype)
    result[...] = mat[:, :line] | mat[:, :line:-1]
    return result


def foldMatrix(mat: np.ndarray, axis: str, rank: int):
    if (axis == 'y'):
        return foldMatrixHorizontal(mat, rank)
    else:
        return foldMatrixVertical(mat, rank)
