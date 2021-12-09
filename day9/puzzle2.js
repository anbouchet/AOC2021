(() => {
    function findBasin(start, grid) {
        const queue = [start];
        const visited = Array(grid.length)
            .fill(0)
            .map(() => Array(grid[0].length).fill(false));
        const positions = [];

        let x, y;
        const neighborDiff = [
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
        ];
        while (queue.length) {
            ({ x, y } = queue.shift());

            if (visited[x][y]) {
                continue;
            }
            visited[x][y] = true;

            if (grid[x][y] < 9) {
                positions.push({ x, y });
                for (const { dx, dy } of neighborDiff) {
                    if (!visited[x + dx][y + dy]) {
                        queue.push({ x: x + dx, y: y + dy });
                    }
                }
            }
        }
        return positions;
    }

    const data = document
        .querySelector("pre")
        .textContent.trim()
        .split("\n")
        .map((l) => l.split("").map((x) => parseInt(x)))
        .map((l) => [Infinity, ...l, Infinity]);
    const pad = Array(data[0].length).fill(Infinity);
    data.unshift(pad);
    data.push(pad);
    console.log(data);
    const minimumsIndices = data.flatMap((l, i) =>
        l
            .map((_, j) => ({ x: i, y: j }))
            .filter(
                ({ x, y }) =>
                    data[x][y] !== Infinity &&
                    [data[x + 1][y], data[x][y + 1], data[x - 1][y], data[x][y - 1]].every(
                        (neighbor) => neighbor > data[x][y],
                    ),
            ),
    );

    const basins = minimumsIndices
        .map((i) => findBasin(i, data))
        .sort((l, r) => r.length - l.length);
    const largestBasins = basins.slice(0, 3);
    const result = largestBasins.map((b) => b.length).reduce((l, r) => l * r);
    console.log(result);
})();
