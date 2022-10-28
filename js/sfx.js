// Sound effects
var sfx = {
  startBgm: new Howl({
    src: ["./sounds/bgm.mp3"],
  }),

  swing: new Howl({
    src: ["./sounds/swing.mp3"],
  }),

  jump: new Howl({
    src: ["./sounds/jump.mp3"],
  }),

  vegetaEntry: new Howl({
    src: ["./sounds/vegeta_entry.ogg"],
  }),

  vegetaAttackOne: new Howl({
    src: ["./sounds/vegetaAttackOne.ogg"],
  }),

  vegetaAttackThree: new Howl({
    src: ["./sounds/vegetaAttackThree.ogg"],
  }),

  vegetaWin: new Howl({
    src: ["./sounds/vegetaWin.ogg"],
  }),

  vegetaDamage: new Howl({
    src: ["./sounds/vegetaDamage.ogg"],
  }),

  vegetaJump: new Howl({
    src: ["./sounds/vegetaJump.ogg"],
  }),

  cellAttackOne: new Howl({
    src: ["./sounds/cellAttackOne.ogg"],
  }),

  cellAttackTwo: new Howl({
    src: ["./sounds/cellAttackTwo.ogg"],
  }),

  cellDamage: new Howl({
    src: ["./sounds/cellDamage.ogg"],
  }),

  cellAttackThree: new Howl({
    src: ["./sounds/cellAttackThree.ogg"],
  }),

  cellEntry: new Howl({
    src: ["./sounds/cellEntry.ogg"]
  })
};

sfx.startBgm.play();
// setTimeout(() => {
//     sfx.cellEntry.play();
// }, 5000);
// setTimeout(() => {
//     sfx.vegetaEntry.play();
// }, 2000);
