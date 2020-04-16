const W = window.innerWidth
const H = window.innerHeight

const random = (...args) => {
  switch (args.length) {
    // If one argument generate between 0 and arg
    case 1:
      return Math.floor(Math.random() * (args[0] + 1))

    // If two arguments generate between arg[0] and arg[1]
    case 2:
      return Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0]

    // Otherwise generate between 0 and 1
    default:
      return Math.random()
  }
}

const randomColor = () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`

const elem = document.createElement('canvas')
document.body.appendChild(elem)

const ctx = elem.getContext('2d')

elem.width = W
elem.height = H

class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speed = random(1, 7)
    this.color = randomColor()
    this.size = random(5, 25)
  }

  render() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  move() {
    this.x += this.speed
  }

  checkHit() {
    if (this.x >= W || this.x <= 0) {
      this.speed *= -1
    }
  }
}

const circles = []
for (let i = 0; i < 10; i++) {
  circles.push(new Circle(50, (i + 1) * 25))
}

const start = () => {
  ctx.clearRect(0, 0, W, H)
  circles.forEach((c) => {
    c.render()
    c.move()
    c.checkHit()
  })

  window.requestAnimationFrame(start)
}

// setInterval(() => {
//   start()
// }, 1000)

start()
