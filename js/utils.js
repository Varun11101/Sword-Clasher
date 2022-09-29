//Checking if two rectangles are colliding or not:
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy }) {
  if (player.health == enemy.health) {
    document.querySelector("#display-result").innerHTML = "DRAW";
    player.isDead = true;
    enemy.isDead = true;
  } else if (player.health < enemy.health) {
    document.querySelector("#display-result").innerHTML = "Player 2 Wins!";
  } else if (player.health > enemy.health) {
    document.querySelector("#display-result").innerHTML = "Player 1 Wins!";
  }
  document.querySelector(".game-over-outer").style.display = "flex";
}