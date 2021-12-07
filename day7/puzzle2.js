(() => {
    function arithmeticSum(s, i, n) {
        return ((s + (s + i * n)) / 2) * (n + 1)
    }
    const computeCrabFuelValue = (n) => arithmeticSum(0, 1, n)
    const data = document.querySelector('pre').textContent.trim().split(',').map(x => parseInt(x))
    const { min, max } = data
        .reduce(
            ({min, max}, val) => ({
                min: val < min ? val : min,
                max: val > max ? val : max
            }),
            {min: Infinity, max: -Infinity}
        )
    console.log({min,max, diff: max-min})
    const fuelValues = Array(max - min)
        .fill(0)
        .map((_, i) => min + i)
        .map(
            pos => ({
                value: data
                    .map(v => computeCrabFuelValue(Math.abs(v - pos)))
                    .reduce((l, r) => l + r),
                pos
            })
        )
    const minFuelValue = fuelValues.reduce((a, v) => v.value < a.value ? v : a)
    console.log(minFuelValue)
})()