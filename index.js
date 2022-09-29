//  Step 1: Creating the canvas and setting it's width and height

const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
var TIME = 100;
canvas.width = 1400; //1024 -> default width
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

//Some global variables
// const pp = 33;
const gravity = 0.9;
const cooldownTime = 2;
const deltaTime = 0.1;

let keys  = {
    a: {
        pressed: false
    },
    
    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

    s: {
        pressed: false
    },
    
    ArrowUp: {
        pressed: false
    },
    
    ArrowDown: {
        pressed: false
    },
    
    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    }
}



// Step 2: Using OOPS to create player and enemy
//Check classes.js

//Create player and enemy -> passing in position object literal

const player = new Fighter({
    position: {
        x: 0, y: 0
    },
    velocity: {
        x: 0, y: 10
    }, 
    color : 'yellow',
    offset: {
        x: 0, y: 0
    }
});


const enemy = new Fighter({
    position: {
        x: canvas.width - 50, y: 0
    },
    velocity: {
        x: 0, y: 10
    }, 
    color : 'blue',
    offset: {
        x: -150, y: 0
    }
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },

  imgSrc: "img/oak_woods/testbg.png",
  scale: 1
});

const shop = new Sprite({
    position: {
        x: 920, 
        y: 185
    },
    
    imgSrc: "img/oak_woods/shop.png",
    scale: 2.75,
    framesMax: 6
});


//Restart game
const re = document.querySelector("#restart-game");
re.addEventListener("click", function(){
    window.location.reload();
})


//Creating an animation loop

function animate(){
    
    //Clearing the canvas before drawing the next frame
    c.fillStyle = 'gray';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    // player.update();
    // enemy.update();
    
    //Updating the player's horizontal movements:
    if(keys.a.pressed && keys.d.pressed){
        if(player.lastKeyPressed == 'a') player.velocity.x = -10;
        else player.velocity.x = 10;
    }
    else if(keys.a.pressed)  player.velocity.x = -8;
    else if(keys.d.pressed) player.velocity.x = 8;

    //Updating the player's vertical movements:
    if(keys.w.pressed){
        if(player.position.y + player.height == canvas.height - pix){ //Player can't jump mid-air
            // sfx.vegetaJump.play();
            sfx.jump.play();
            player.velocity.y = -25;
        }
    }

    if(keys.s.pressed){
        if (player.position.y + player.height != canvas.height){
            player.velocity.y += 2;
        }
    }

    //Updating the enemy's horizontal movements:
    if(keys.ArrowLeft.pressed && keys.ArrowRight.pressed){
        if(enemy.lastKeyPressed == "ArrowLeft") enemy.velocity.x = -10;
        else enemy.velocity.x = 10;
    }
    else if(keys.ArrowLeft.pressed) enemy.velocity.x = -8;
    else if(keys.ArrowRight.pressed) enemy.velocity.x = 8;

    //Updating the enemy's vertical movements:
    if(keys.ArrowUp.pressed){
        if(enemy.position.y + enemy.height == canvas.height - pix){
            sfx.jump.play();
            enemy.velocity.y = -25;
        }
    }

    if(keys.ArrowDown.pressed){
        if(enemy.position.y + enemy.height != canvas.height){
            enemy.velocity.y += 2;
        }
    }


    //Auto rotate:
    if(enemy.position.x < player.position.x){
        enemy.offset.x = 0;
        player.offset.x = -150;
    }
    else if(enemy.position.x >= player.position.x){
        player.offset.x = 0;
        enemy.offset.x = -150;
    }

    player.update();
    enemy.update();

    //Collision Detection:

    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking){
        console.log("Player has striked!");
        sfx.vegetaAttackThree.play();
        sfx.cellDamage.play();
        enemy.health -= 10;
        enemy.health = Math.max(enemy.health, 0);
        document.querySelector(".top-hp2").style.width = `${enemy.health}%`;
        player.isAttacking = false;
    }

    if(rectangularCollision({
        rectangle1: enemy, 
        rectangle2: player
    }) && enemy.isAttacking){
        console.log("Enemy has striked!");
        sfx.cellAttackThree.play();
        sfx.vegetaDamage.play();
        player.health -= 10;
        player.health = Math.max(player.health, 0);
        document.querySelector(".top-hp").style.width = `${player.health}%`;
        enemy.isAttacking = false;
    }

    if(player.health <= 0) player.isDead = true;
    if(enemy.health <= 0) enemy.isDead = true;
    if(player.health <= 0){

        setTimeout(() => {
            determineWinner({player, enemy});
        }, 1000);
    }

    if (enemy.health <= 0) {
        setTimeout(() => {
        determineWinner({ player, enemy });
        }, 1000);
    }


    //Attack limit:
    document.querySelector("#attack-limit-p1").innerHTML = player.attackLimit;
    document.querySelector("#attack-limit-p2").innerHTML = enemy.attackLimit;

    //Requesting for the next frame
    window.requestAnimationFrame(animate);
}

animate();


