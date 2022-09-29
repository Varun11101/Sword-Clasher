const pix = 39; //this is the ground height offset

class Fighter {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.health = 101;
    this.isDead = false;
    this.lastKeyPressed;
    this.offset = offset;
    this.mode = 1;
    this.attackLimit = 30;
    this.attackTimer = 60;
    this.attackBox = {
      position: {
        x: this.position.x + this.offset.x,
        y: this.position.y + this.offset.y,
      },
      width: 200,
      height: 70,
    };
    this.color = color;
    this.isAttacking;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Drawing the attackBox
    if (this.isAttacking) {
      c.fillStyle = "red";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.attackBox.position.x = this.position.x + this.offset.x;
    this.attackBox.position.y = this.position.y + this.offset.y;
    this.attackTimer += deltaTime;
    this.draw();

    //Gravity stuff
    this.position.y += this.velocity.y;
    this.position.y = Math.min(canvas.height - this.height - pix, this.position.y);
    if (this.position.y + this.height + this.velocity.y >= canvas.height - pix) {
      // this.velocity.y = 0;
      this.velocity.y = canvas.height - (pix + this.position.y + this.height);
    } else {
      this.velocity.y += gravity;
    }

    //Horizontal movement
    this.position.x += this.velocity.x;
    this.velocity.x = 0;

    //To prevent out of bounds:
    if (this.position.x + this.width > canvas.width)
      this.position.x = canvas.width - this.width;
    if (this.position.x < 0) this.position.x = 0;
  }

  attack() {
    if (this.attackLimit > 0) this.isAttacking = true;
    // sfx.swing.play();
    this.attackLimit--;
    this.attackLimit = Math.max(0, this.attackLimit);
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}



//////////////////////////////// SPRITE CLASS ///////////////////////////////////
class Sprite {
  constructor({ position, imgSrc, scale, framesMax = 1 }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.scale = scale;
    this.image = new Image();
    this.image.src = imgSrc;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 4;
    this.framesMax = framesMax;
  }

  draw() {
    c.drawImage(
      this.image,
      //crop arguements begins
      this.currentFrame * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      //crop arguements ends
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
      this.draw();
      this.framesElapsed++;
      if(this.framesElapsed >= this.framesHold){
        this.currentFrame++;
        this.currentFrame %= this.framesMax;
        this.framesElapsed = 0;
      }
    }
  }

