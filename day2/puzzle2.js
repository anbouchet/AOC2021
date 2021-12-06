(()=>{
    const data = document.querySelector('pre')
      .textContent
      .trim()
      .split('\n')
      .map(x => x.split(' '))
      .map(([a, b]) => [a, parseInt(b)])
    console.log(data)
    
    const [x, y, aim] = data.reduce(
      ([x, y, aim],[command, value]) => {
        switch(command) {
          case 'forward':
            return [ x + value, y + (aim * value), aim ]
          case 'up':
            return [ x, y, aim - value ]
          case 'down':
            return [ x, y, aim + value ]
        }
      },
      [0, 0, 0]
    )
  
    console.log({x, y, aim})
    console.log(x * y)
  })()