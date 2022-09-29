let count = 101;
const timer = document.querySelector("#timer");

function countDown() {
  setTimeout(() => {
    if (count == 100) {
      player.health -= 1;
      enemy.health -= 1;
      document.querySelector(".top-hp2").style.width = `${enemy.health}%`;
      document.querySelector(".top-hp").style.width = `${player.health}%`;
    }
    if (count > 0) {
      count--;
      timer.innerHTML = count;
      if(player.isDead==false && enemy.isDead==false){
        countDown();
      }
    } else if (count == 0) {
        setTimeout(() => {
            determineWinner({player, enemy});  
        }, 1000);
    }
  }, 1000);
}

countDown();
