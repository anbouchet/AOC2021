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
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
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
            incomplete: stack.length !== 0
        }
    })

    const errors = parsed.filter(({ corrupted }) => corrupted)
    console.log(errors)
    const score = errors
        .map((e) => scoreMap[e.illegalChar])
        .reduce((l, r) => l + r)
    console.log(score)
})()