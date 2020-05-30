class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0

    this.bg = new Background(ctx)
    this.helicopter = new Helicopter(ctx)
    this.obstacles = []
  }

  start() {
    this.intervalId =  setInterval(() => {
      this._gameOver()
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._checkCollisions()
      this._clearObstacles()
    }, FRAMES);    
    // TODO: loop. clear, draw, move, addObstacle, checkCollisions, clearObstacles
  }

  _clearObstacles() {
    // TODO: filter only visible obstacles (call o.isVisible())
  }

  _addObstacle() {
    // TODO: add new Obstacle every 100 ticks
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
    // TODO: check helicopter on floor?
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