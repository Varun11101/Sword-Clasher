window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKeyPressed = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKeyPressed = "a";
      break;
    case "w":
      keys.w.pressed = true;
      // sfx.vegetaJump.play();
      break;
      case "s":
        keys.s.pressed = true;
        break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      break;
      case "ArrowDown":
      keys.ArrowDown.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKeyPressed = "ArrowLeft";
      break;
      case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKeyPressed = "ArrowRight";
      break;
      case " ":
        if ((!player.isAttacking) && (!player.isDead) && (player.attackTimer >= cooldownTime)) {
        player.attackTimer = 0;
        sfx.swing.play();
        sfx.vegetaAttackOne.play();
        player.attack();
      }
      break;
    case "/":
      if ((!enemy.isAttacking) && (!enemy.isDead) && (enemy.attackTimer >= cooldownTime)) {
        enemy.attackTimer = 0;
        sfx.swing.play();
        sfx.cellAttackOne.play();
        enemy.attack();
      }
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    default:
      break;
  }
});
