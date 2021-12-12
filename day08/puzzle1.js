(() => {
    const data = document
        .querySelector("pre")
        .textContent.trim()
        .split("\n")
        .map((l) => l.split("|").map((s) => s.trim().split(" ")));
    console.log(data);
    const uniqueLengths = [2, 3, 4, 7];
    const count = data
        .map(([, output]) => output.filter((v) => uniqueLengths.includes(v.length)).length)
        .reduce((l, r) => l + r);
    console.log(count)
})();
