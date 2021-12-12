(() => {
    const data = document.querySelector("pre").textContent.trim().split(",");
    const fishesObject = data.reduce((obj, val) => ({ ...obj, [val]: (obj[val] ?? 0) + 1 }), {});
    console.log(fishesObject);
    const populationAfterDays = Array(80)
        .fill(0)
        .reduce((acc) => {
            const updated = Object.fromEntries(
                Object.entries(acc).map(([timer, count]) => [timer - 1, count]),
            );
            updated[8] = updated[-1] ?? 0;
            updated[6] = (updated[6] ?? 0) + (updated[-1] ?? 0);
            delete updated[-1];
            return updated;
        }, fishesObject);
    console.log(populationAfterDays);
    const count = Object.values(populationAfterDays).reduce((l, r) => l + r);
    console.log(count);
})();
