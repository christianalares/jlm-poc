import * as PIXI from 'pixi.js'
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

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

const W = window.innerWidth
const H = window.innerHeight

const app = new PIXI.Application({
  view: canvas,
  width: W,
  height: H,
})

class Ball {
  constructor(x, y, radius) {
    this.gfx = new PIXI.Graphics()
    this.gfx.x = x
    this.gfx.y = y
    this.radius = radius
    this.speed = random(1, 5)

    app.stage.addChild(this.gfx)
    this.render()
  }

  render() {
    this.gfx.beginFill(0xff0000)
    this.gfx.drawCircle(this.x, this.y, this.radius)
    this.gfx.endFill()
  }

  move() {
    this.gfx.position.x += this.speed
  }

  check() {
    if (this.gfx.x + this.radius >= app.renderer.width || this.gfx.x - this.radius <= 0) {
      this.speed *= -1
    }
  }
}

const balls = []
for (let i = 0; i < 15; i++) {
  balls.push(new Ball(50, (i + 1) * 50, 20))
}
const animate = () => {
  balls.forEach((b) => {
    b.move()
    b.check()
  })
}

app.ticker.add(animate)
