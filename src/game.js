class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = []
    this.bullets = this.helicopter.weapon.bullets
    console.log(this.bullets);

  }

  start() {
    this.intervalId =  setInterval(() => {
      //this._gameOver()
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._checkCollisions()
      this._clearObstacles()
      this.tick++
      if (this.tick >= 10000) {
        this.tick = 0
      }
    }, 1000 / 60);    
    // TODO: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
  }

  _clearObstacles() {
    this.obstacles = this.obstacles.filter(o => o.isVisible())
  }

  _addObstacle() {
    if (this.tick % 100) return
    this.obstacles.push(new Obstacle(this.ctx))
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    // TODO: draw everything
    this.bg.draw()
    this.helicopter.draw()
    this.obstacles.forEach(obstacle => obstacle.draw())
  }

  _move() {
    this.bg.move()
    this.helicopter.move()
    this.obstacles.forEach(obstacle => obstacle.move())
  }

  _checkCollisions() {
   if (this.helicopter.isFloor()) {
      this._gameOver();
    } 
    
    const heli = this.helicopter


    this.obstacles.forEach(obstacle => {
    const obstX = obstacle.x < (heli.x + heli.w) && (obstacle.x + obstacle.w) > heli.x;
    const obstY = (obstacle.y + obstacle.h) > heli.y && obstacle.y < (heli.y + heli.h);

    if (obstX && obstY) {
      this._gameOver();
    }
    this.bullets.forEach(bullet => { 
      const bulletX = obstacle.x < (bullet.x + bullet.r) && (obstacle.x + obstacle.r) > bullet.x;
      

      if (bulletX) {
        this.obstacles = this.obstacles.filter(obs => obs !== obstacle)
      }
    })
    })


    // TODO: iterate obstacles. check colX and colY
  }

  _gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}