(()=>{
    const map = {
        '(':')',
        '[':']',
        '{':'}',
        '<':'>',
        ')':'(',
        ']':'[',
        '}':'{',
        '>':'<'
    }
    const opening = [ '(', '[', '{', '<' ]
    const scoreMap = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    const data = document.querySelector('pre')
        .textContent
        .trim()
        .split('\n')
        .map(l => l.split(''))
    
    const parsed = data.map((line) => {
        const stack = []
        for(const char of line) {
            if(opening.includes(char)) {
                stack.push(char)
            } else {
                if (stack[stack.length - 1] !== map[char]) {
                    return {
                        value: line,
                        corrupted: true,
                        illegalChar: char,
                        stackTrace: stack
                    }
                }
                stack.pop()
            }
        }
        return {
            value: line,
            incomplete: stack.length !== 0,
            missing: stack.map(delim => map[delim]).reverse()
        }
    })

    const incomplete = parsed.filter(({ corrupted }) => !corrupted)
    console.log(incomplete)
    const scores = incomplete
        .map(({ missing }) => 
            missing
                .map(char => scoreMap[char])
                .reduce((a, v) => a * 5 + v, 0)
        )
    scores.sort((a, b) => a - b)
    console.log(scores)
    console.log(scores[(scores.length - 1) / 2])
})()