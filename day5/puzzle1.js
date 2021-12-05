(() => {
    function* range(a, b, inclusiveEnd = true) {
        if (a === b) {
            if (inclusiveEnd) yield a;
            return;
        }
        const increment = Math.sign(b - a);
        const pred =
            increment > 0
                ? (i) => i < b || (inclusiveEnd && i <= b)
                : (i) => i > b || (inclusiveEnd && i >= b);
        for (let i = a; pred(i); i += increment) {
            yield i;
        }
    }
    function* drawLine({ start: { x: startX, y: startY }, end: { x: endX, y: endY } }) {
        if (startX === endX) {
            for (const p of range(startY, endY)) {
                yield [startX, p];
            }
        } else if (startY === endY) {
            for (const p of range(startX, endX)) {
                yield [p, startY];
            }
        }
    }
    const data = document.querySelector("pre").textContent.trim().split("\n");
    const lines = data.map((l) => {
        const [start, end] = l.split("->").map((p) => {
            const [x, y] = p
                .trim()
                .split(",")
                .map((v) => parseInt(v));
            return { x, y };
        });
        return { start, end };
    });
    console.log(lines);
    const { maxX, maxY } = lines
        .flatMap(({ start, end }) => [start, end])
        .reduce(
            ({ maxX, maxY }, { x, y }) => ({
                maxX: x > maxX ? x : maxX,
                maxY: y > maxY ? y : maxY,
            }),
            { maxX: 0, maxY: 0 },
        );
    console.log({ maxX, maxY });
    const grid = Array(maxX + 1)
        .fill(0)
        .map(() => Array(maxY + 1).fill(0));
    for (const line of lines) {
        for (const [x, y] of drawLine(line)) {
            grid[x][y] = grid[x][y] + 1;
        }
    }
    console.log(grid);
    const overTwo = grid.reduce(
        (acc, row) => acc + row.map((val) => +(val >= 2)).reduce((l, r) => l + r),
        0,
    );
    console.log(overTwo);
})();
