(()=>{
  const data = document.querySelector('pre')
    .textContent
    .trim()
    .split('\n')
    .map(x => x.split(' '))
    .map(([a, b]) => [a, parseInt(b)])
  console.log(data)
  
  const [x, y] = data.reduce(([x, y],[command, value]) => {
    switch(command) {
      case 'forward':
        return [ x + value, y ]
      case 'up':
        return [ x, y - value ]
      case 'down':
        return [ x, y + value ]
    }
  },[0,0])

  console.log({x, y})
  console.log(x * y)
})()