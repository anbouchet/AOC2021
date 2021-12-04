(() => {
    const data = document.querySelector("pre").textContent.trim();
    const content = data
        .split("\n")
        .map((x) => parseInt(x, 10));
    console.log(content);
    const [count, last] = content.reduce(
        ([count, before], current) => (current > before ? [count + 1, current] : [count, current]),
        [0, content.shift()],
    );
    console.log({ count, last });
})();
