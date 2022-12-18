let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

let backButtonSheet = {};
let LuHingIDcard, message, backButton;

let mainCanvas = document.getElementById("main-canvas");

window.onload = function () {
  let app = new Application({
    width: 1024,
    height: 648,
    resolution: 1
  });
  mainCanvas.appendChild(app.view);

  loader
    .add("back_buttonAnimate", "./img/help/back_button.png")
    .load(setup)

  function setup() {
    let style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 23,
      fill: "white"
    });
    message = new Text(`↑↓→← & spacebar & click`, style);
    message.x = app.screen.width / 2 - message.width / 2;
    message.y = app.screen.height / 2 - message.height / 2;
    app.stage.addChild(message);

    createBackButtonSheet();
    createBackButton();
  }

  //BackButton
  function createBackButtonSheet() {
    let ssheet = PIXI.Texture.from(resources.back_buttonAnimate.texture);
    let w = 230;
    let h = 89;

    backButtonSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ]
    backButtonSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createBackButton() {
    backButton = new PIXI.extras.AnimatedSprite(backButtonSheet.off);
    backButton.animationSpeed = 0.1;
    backButton.loop = false;
    backButton.x = app.screen.width * 0.5 - backButton.width / 2;
    backButton.y = message.y + message.height + 20;

    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.pointerdown = function () {
      window.location.href = "index.html"
    }
    backButton.pointerover = function () {
      backButton.textures = backButtonSheet.on;
      backButton.loop = true;
      backButton.play();
    }
    backButton.pointerout = function () {
      backButton.loop = false;
    }

    app.stage.addChild(backButton);
    backButton.play();
  }
}