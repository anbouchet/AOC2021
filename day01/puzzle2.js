(() => {
    const data = document.querySelector('pre').textContent.trim();
    const content = data
        .split(",")
        .map((x) => parseInt(x, 10));
    console.log(content);
    const windows = content.map((_, i, a) => a.slice(i, i + 3)).filter((a) => a.length == 3);
    const sums = windows.map(([a, b, c]) => a + b + c);
    console.log(windows);
    console.log(sums);
    const [count, last] = sums.reduce(
        ([count, before], current) => (current > before ? [count + 1, current] : [count, current]),
        [0, sums.shift()],
    );
    console.log({ count, last });
})();
