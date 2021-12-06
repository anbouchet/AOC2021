(()=>{
    const data = document.querySelector('pre').textContent.trim().split('\n').map(x => x.split(''))
    console.log(data)
    const init = Array(data[0].length).fill(0).map(() => ({ '0': 0, '1': 0 }))
    console.log(init)
    const counts = data.reduce(
        (a,v) => a.map(
            (c,i)=> ({
                ...c,
                [v[i]]: c[v[i]] + 1
            })
        ),
        init
    )
    console.log(counts)
    const gammaBitArray = counts.map(v => v[0] > v[1] ? '0': '1')
    const gammaString = gammaBitArray.join('')
    const epsilonString = gammaBitArray.map(v=> (+v ^ 1)+'').join('')

    console.log({gammaString,epsilonString})
    const gamma = parseInt(gammaString, 2)
    console.log(gamma)
    const epsilon = parseInt(epsilonString, 2)
    console.log(epsilon)
    console.log('power: ',gamma*epsilon)
})()