import {contain, keyboard, hitTestRectangle, sceneLimit} from "/game/helperFunction.js";
import ScenesManager from "/game/scenesManager.js";

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

let state, player, scene1, scene2, block, block2, gameScene,
    playerContainer,sceneContainer,scenesManager;

let app = new Application({ 
    width: 512, 
    height: 324,                       
    antialiasing: true, 
    transparent: false, 
    resolution: 1
  }
);  

document.body.appendChild(app.view);

loader
  .add("scene1","./img/scene1.png")
  .add("scene2","./img/scene2.png")
  .add("player","./img/player.png")
  .add("block","./img/block.png")
  .add("block2","./img/block2.png")
  .load(setUp);

function setUp(){
  gameScene = new Container();
  app.stage.addChild(gameScene); 
  
  // sceneContainer = new Container();
  // app.stage.addChild(sceneContainer);
  // scene1 = new Sprite(resources.scene1.texture);
  // scene1.width = app.screen.width * 4;
  // scene1.height = app.screen.height * 4;
  // sceneContainer.addChild(scene1); 

  // block = new Sprite(resources.block.texture);
  // block.x = app.screen.width * 0.5+70;
  // block.y = app.screen.height * 0.5;
  // block.width = 32;
  // block.height = 32;
  // sceneContainer.addChild(block);

  sceneContainer = new Container();
  app.stage.addChild(sceneContainer);
  scene1 = new Sprite(resources.scene1.texture);
  scene1.width = app.screen.width * 4;
  scene1.height = app.screen.height * 4;

  scene2 = new Sprite(resources.scene2.texture);
  scene2.width = app.screen.width * 4;
  scene2.height = app.screen.height * 4;

  block = new Sprite(resources.block.texture);
  block.x = app.screen.width * 0.5+70;
  block.y = app.screen.height * 0.5;
  block.width = 32;
  block.height = 32;
  block2 = new Sprite(resources.block2.texture);
  block2.x = app.screen.width * 0.5+70;
  block2.y = app.screen.height * 0.5;
  block2.width = 32;
  block2.height = 32;

  var drawScene1 = function(){
    sceneContainer.addChild(scene1); 
    sceneContainer.addChild(block);
  }
  var drawScene2 = function(){
    sceneContainer.addChild(scene2);
    sceneContainer.addChild(block2);
  }

  scenesManager = new ScenesManager();
  scenesManager.createScene("scene1", drawScene1);
  scenesManager.createScene("scene2", drawScene2);
  scenesManager.goToScene("scene1");

  playerContainer = new Container();
  app.stage.addChild(playerContainer);
  player = new Sprite(resources.player.texture);
  player.anchor.set(0.5,0.5);
  player.x = app.screen.width * 0.5;
  player.y = app.screen.height * 0.5;
  player.vx = 0;
  player.vy = 0;
  playerContainer.addChild(player);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = function() {
    player.vx = -5;
    player.vy = 0;
    console.log("player位置" + player.x+ "," + player.y)
    console.log("sceneContainer位置" + sceneContainer.x+ "," + sceneContainer.y)
  };
  left.release = function() {
    if (!right.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  up.press = function() {
    player.vy = -5;
    player.vx = 0;
    console.log("player位置" + player.x+ "," + player.y)
    console.log("sceneContainer位置" + sceneContainer.x+ "," + sceneContainer.y)
  };
  up.release = function() {
    if (!down.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };

  right.press = function() {
    player.vx = 5;
    player.vy = 0;
    console.log("player位置" + player.x+ "," + player.y)
    console.log("sceneContainer位置" + sceneContainer.x+ "," + sceneContainer.y)
  };
  right.release = function() {
    if (!left.isDown && player.vy === 0) {
      player.vx = 0;
    }
  };

  down.press = function() {
    player.vy = 5;
    player.vx = 0;
    console.log("player位置" + player.x+ "," + player.y)
    console.log("sceneContainer位置" + sceneContainer.x+ "," + sceneContainer.y)
  };
  down.release = function() {
    if (!up.isDown && player.vx === 0) {
      player.vy = 0;
    }
  };
  
  state = play;
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta){
  state(delta);
}

function play(delta){
  player.x += player.vx;
  player.y += player.vy;
  
  contain(player, {x: 0, y: 0, width: 2048, height: 1297});
  sceneLimit(player, playerContainer, scene1, sceneContainer, app);

  if(hitTestRectangle(player, block)){
    console.log("gotoblock2")
    app.stage.removeChild(block);
    scenesManager.goToScene("scene2");
  }
  if(block2){
    if(hitTestRectangle(player, block2)){
      console.log("gotoblock1")
      app.stage.removeChild(block2);
      scenesManager.goToScene("scene1");
    }
  }
}

