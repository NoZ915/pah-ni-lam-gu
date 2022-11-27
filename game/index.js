import { showLoadingPage } from "../module/loading.js";

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;
let startBackgroundSheet = {};
let startButtonSheet = {};
let helpButtonSheet = {};
let startBackground, startButton, helpButton, lineQRcode;

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
    .add("help_buttonAnimate", "./img/start/help_button.png")
    // .add("lineQRcode", "./img/lineQRcode.jpg")
    .load(setup)

  function setup() {
    createStartBackgroundSheet();
    createStartBackground();

    createStartButtonSheet();
    createStartButton();

    createHelpButtonSheet();
    createHelpButton();
  }

  //StartBackground
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


  //StartButton
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
    startButton.x = app.screen.width * 0.5 - startButton.width / 2 + 150;
    startButton.y = app.screen.height * 0.5 + 120;

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


  //HelpButton
  function createHelpButtonSheet() {
    let ssheet = PIXI.Texture.from(resources.help_buttonAnimate.texture);
    let w = 230;
    let h = 89;

    helpButtonSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ]
    helpButtonSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createHelpButton() {
    helpButton = new PIXI.extras.AnimatedSprite(helpButtonSheet.off);
    helpButton.animationSpeed = 0.1;
    helpButton.loop = false;
    helpButton.x = app.screen.width * 0.5 - helpButton.width / 2 - 150;
    helpButton.y = app.screen.height * 0.5 + 120;

    helpButton.interactive = true;
    helpButton.buttonMode = true;
    helpButton.pointerdown = function () {
      window.location.href = "help.html"
    }
    helpButton.pointerover = function () {
      helpButton.textures = helpButtonSheet.on;
      helpButton.loop = true;
      helpButton.play();
    }
    helpButton.pointerout = function () {
      helpButton.loop = false;
    }

    app.stage.addChild(helpButton);
    helpButton.play();
  }
}

