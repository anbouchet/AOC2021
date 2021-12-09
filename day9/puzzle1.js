(() => {
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
    const minimums = data.flatMap((l, i) =>
        l.filter(
            (e, j) =>
                e !== Infinity &&
                [data[i + 1][j], data[i][j + 1], data[i - 1][j], data[i][j - 1]].every(
                    (neighbor) => neighbor > e,
                ),
        ),
    );
    console.log(minimums);
    const dangerLevels = minimums.map((x) => x + 1);
    const dangerSum = dangerLevels.reduce((l, r) => l + r);
    console.log(dangerSum);
})();
