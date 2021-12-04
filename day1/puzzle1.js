(() => {
    const pre = document.querySelector("pre");
    const content = pre.textContent
        .split("\n")
        .map((x) => parseInt(x, 10))
        .filter((x) => !Number.isNaN(x));
    console.log(content);
    const [count, last] = content.reduce(
        ([count, before], current) => (current > before ? [count + 1, current] : [count, current]),
        [0, content.shift()],
    );
    console.log({ count, last });
})();
