class Helicopter {
  constructor(ctx) {
    this.ctx = ctx
    this.tick = 0

    this.x = 100
    this.y = 0
    this.y0 = this.ctx.canvas.height - this.w

    this.w = 100
    this.h = 40

    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.ax = 0
    this.g = 0.1

    this.img = new Image()
    this.img.src = "https://2.bp.blogspot.com/-P6ZbLE-rnFM/WPTQh65UtMI/AAAAAAAABF8/9iYl-cIUEtIhj2JDTixyqZNeBn183AdmQCLcB/s1600/helicopter-spritesheet.png"
    this.img.frames = 4
    this.img.frameIndex = 0

    this.weapon = new Weapon(this)

    this._setListeners()
  }

  draw() {
    // TODO: draw helicopter image
    this.ctx.drawImage(
      this.img,
      0,
      this.img.frameIndex * this.img.height / this.img.frames,
      this.img.width,
      this.img.height / this.img.frames,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.weapon.draw()
  }

  isFloor() {
    // TODO: check if floor
    return this.y + this.h >= this.ctx.canvas.height * 0.95

  }

  move() {
    
    this.vx += this.ax;
    this.vy += this.ay;
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;

    /** if(this.y + this.h >= this.ctx.canvas.height) {
      this.vy = 0;
      this.y = this.y0;
    }**/
  }

  _setListeners() {
    document.addEventListener('keydown', e => {
      // TODO
      switch (e.keyCode) {
        case UP:
          this.y -= 2;
          this.vy -= 2
          //this.ay -= 0.5
          break
        case RIGHT:
          this.x += 1
          this.vx += 1
          //this.ay = 0
          break
        case LEFT :
          this.x -= 1
          this.vx -= 1
          //this.ay = 0
          break
        case SPACE :
          this.weapon.shoot()
          //this.ay = 0
          break;

      }
    })

    document.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case UP:
          this.y -= 0;
          this.vy -= 0
          break
        case RIGHT:
          this.x += 0
          this.vx += 0
          break
        case LEFT :
          this.x -= 0
          this.vx -= 0
          break
          case SPACE :
            this.weapon.move()
            break;
      }
    })
  }
/**   _switchAction (key, action) {
    switch (key) {
      case UP:
        this._move(action)
        break;
    }
  }*/
}
