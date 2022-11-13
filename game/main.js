import { contain, keyboard, hitTestRectangle, sceneLimit } from "/game/helperFunction.js";

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

var state, player, scene1, scene2, block, block2, gameScene,
  playerContainer, scene1Container, scene2Container;

let app = new Application({
  width: 1024,
  height: 648,
  resolution: 1
}
);

let mainCanvas = document.getElementById("main-canvas");
mainCanvas.appendChild(app.view);

loader
  .add("scene1", "./img/scene1.png")
  .add("scene2", "./img/scene2.png")
  .add("player", "./img/player.png")
  .add("playerAnimate", "./img/player/playerAnimate.json")
  .add("block", "./img/block.png")
  .add("block2", "./img/block2.png")
  .load(setUp);

  // let playerAnimateTextures = [];
  // for(let i=0; i<6; i++){
  //   playerAnimateTextures.push(PIXI.Texture.fromFrame(`1${i}.png`))
  // }
  // const playerGoLeft = new PIXI.extras.AnimatedSprite(playerAnimateTextures);
  // playerGoLeft.infinite = true;
  // playerGoLeft.play();

function setUp() {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  scene1Container = new Container();
  scene2Container = new Container();

  app.stage.addChild(scene1Container);
  scene1 = new Sprite(resources.scene1.texture);
  scene1.width = app.screen.width * 2;
  scene1.height = app.screen.height * 3;
  scene1Container.addChild(scene1);
  block = new Sprite(resources.block.texture);
  block.x = app.screen.width * 0.5 + 70;
  block.y = app.screen.height * 0.5;
  block.width = 32;
  block.height = 32;
  scene1Container.addChild(block);

  app.stage.addChild(scene2Container);
  scene2 = new Sprite(resources.scene2.texture);
  scene2.width = app.screen.width * 4;
  scene2.height = app.screen.height * 4;
  scene2Container.addChild(scene2);
  block2 = new Sprite(resources.block2.texture);
  block2.x = app.screen.width * 0.5 + 180;
  block2.y = app.screen.height * 0.5;
  block2.width = 32;
  block2.height = 32;
  scene2Container.addChild(block2);
  scene2Container.visible = false;

  playerContainer = new Container();
  app.stage.addChild(playerContainer);
  player = new Sprite(resources.player.texture);
  player.anchor.set(0.5, 0.5);
  player.x = app.screen.width * 0.8;
  player.y = app.screen.height * 0.8;
  player.vx = 0;
  player.vy = 0;
  playerContainer.addChild(player);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function () {
    player.vx = -5;
    player.vy = 0;
  };
  left.release = function () {
    if (!right.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };
  up.press = function () {
    player.vy = -5;
    player.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };
  right.press = function () {
    player.vx = 5;
    player.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };
  down.press = function () {
    player.vy = 5;
    player.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };

  state = play;
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  player.x += player.vx;
  player.y += player.vy;

  contain(player, { x: 0, y: 0, width: 2048, height: 1944 });

  if (scene1Container.visible) {
    sceneLimit(player, playerContainer, scene1, scene1Container, app);

    if (hitTestRectangle(player, block)) {
      scene1Container.visible = false;
      scene2Container.visible = true;
      state = goToScene2;
      console.log("hit 1");
    }
  }
}

function goToScene2() {
  player.x += player.vx;
  player.y += player.vy;

  if (scene2Container.visible) {
    sceneLimit(player, playerContainer, scene2, scene2Container, app);

    if (hitTestRectangle(player, block2)) {
      scene2Container.visible = false;
      scene1Container.visible = true;
      state = play;
      console.log("hit 2");
    }
  }

}