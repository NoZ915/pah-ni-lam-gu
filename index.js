import { showLoadingPage } from "../loading.js";

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;
let startBackgroundSheet = {};
let startButtonSheet = {};
let startBackground, startButton, lineQRcode;

let mainCanvas = document.getElementById("main-canvas");

window.onload = function () {
  let app = new Application({
    width: 1024,
    height: 648,
    resolution: 1
  });
  mainCanvas.appendChild(app.view);

  loader
    .add("start_backgroundAnimate", "./img/start/start_background.png")
    .add("start_buttonAnimate", "./img/start/start_button.png")
    // .add("lineQRcode", "./img/lineQRcode.jpg")
    .load(setup)

  function setup() {
    createStartBackgroundSheet();
    createStartBackground();

    createStartButtonSheet();
    createStartButton();

    // lineQRcode = new Sprite(resources.lineQRcode.texture);
    // lineQRcode.width = 64;
    // lineQRcode.height = 64;
    // lineQRcode.x = app.screen.width * 0.5 - lineQRcode.width / 2;
    // lineQRcode.y = startButton.y - lineQRcode.height - 20;

    // app.stage.addChild(lineQRcode);
  }

  function createStartBackgroundSheet() {
    let ssheet = PIXI.Texture.from(resources.start_backgroundAnimate.texture);
    let w = 1024;
    let h = 648;

    startBackgroundSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ]
    startBackgroundSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createStartBackground() {
    startBackground = new PIXI.extras.AnimatedSprite(startBackgroundSheet.off);
    startBackground.animationSpeed = 0.1;
    startBackground.loop = false;
    startBackground.x = 0;
    startBackground.y = 0;
    app.stage.addChild(startBackground);
    startBackground.play();
  }

  function createStartButtonSheet() {
    let ssheet = PIXI.Texture.from(resources.start_buttonAnimate.texture);
    let w = 230;
    let h = 89;

    startButtonSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ]
    startButtonSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createStartButton() {
    startButton = new PIXI.extras.AnimatedSprite(startButtonSheet.off);
    startButton.animationSpeed = 0.1;
    startButton.loop = false;
    startButton.x = app.screen.width * 0.5 - startButton.width / 2;
    startButton.y = app.screen.width * 0.5 - startButton.height / 2;

    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.pointerdown = function () {
      showLoadingPage(app, () => {
        app.stage.visible = false;
        window.location.href = "main.html"
      });
    }
    startButton.pointerover = function () {
      startButton.textures = startButtonSheet.on;
      startButton.loop = true;
      startButton.play();

      startBackground.textures = startBackgroundSheet.on;
      startBackground.loop = true;
      startBackground.play();
    }
    startButton.pointerout = function () {
      startButton.loop = false;
      startBackground.loop = false;
    }

    app.stage.addChild(startButton);
    startButton.play();
  }
}