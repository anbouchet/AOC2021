(() => {
    const data = document.querySelector('pre').textContent.trim().split('\n').map(x => x.split(''))
    console.log(data)
    const BIT_COUNT = 12
    function findWithCriteria(data, bitCount, criteria) {
        let result = data
        for (let i = 0; i < bitCount && result.length > 1; ++i) {
            const referenceCount = result
                .map(x => x[i])
                .reduce(
                    (c, v) => ({
                        ...c,
                        [v]: c[v] + 1
                    }),
                    { '0': 0, '1': 0 }
                )
            const selector = criteria(referenceCount)
            result = result.filter(v => v[i] === selector)
        }
        return result
    }

    const oxygenString = findWithCriteria(data, BIT_COUNT, c => c[0] > c[1] ? '0' : '1')[0].join('')
    const carbonString = findWithCriteria(data, BIT_COUNT, c => c[0] <= c[1] ? '0' : '1')[0].join('')
    console.log({oxygenString, carbonString})
    const oxygen = parseInt(oxygenString, 2)
    const carbon = parseInt(carbonString, 2)
    console.log({oxygen, carbon})
    console.log('life support rating: ', oxygen*carbon)
})()