export function showSecondCourt(itemContainer, mainApp) {
  let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

  let secondCourtCaontainer, secondCourtAll, secondCourtGreen, secondCourtRed, secondCourtPurple, secondCourtWhite, backButton,
    messagePurple, messageRed, messageGreen, messageWhite;

  loader
    .add("secondCourtAll", "./img/JudicialMuseumScene/secondCourt/all.png")
    .add("secondCourtGreen", "./img/JudicialMuseumScene/secondCourt/green.png")
    .add("secondCourtRed", "./img/JudicialMuseumScene/secondCourt/red.png")
    .add("secondCourtPurple", "./img/JudicialMuseumScene/secondCourt/purple.png")
    .add("secondCourtWhite", "./img/JudicialMuseumScene/secondCourt/white.png")
    .add("backButton", "./img/JudicialMuseumScene/secondCourt/backButton.png")
    .load(setup)

  function setup() {
    secondCourtCaontainer = new Container;
    itemContainer.addChild(secondCourtCaontainer);

    createSecondCourtAll();
    createSecondCourtPurple();
    createSecondCourtRed();
    createSecondCourtWhite();
    createSecondCourtGreen();
    createBackButton();

    secondCourtCaontainer.scale.set(0.75);
    secondCourtCaontainer.x = mainApp.screen.width / 2 - secondCourtCaontainer.width / 2;
    secondCourtCaontainer.y = 20;
  }

  function createSecondCourtAll() {
    secondCourtAll = new Sprite(resources.secondCourtAll.texture);
    secondCourtCaontainer.addChild(secondCourtAll);
  }
  function createSecondCourtPurple() {
    secondCourtPurple = new Sprite(resources.secondCourtPurple.texture);
    secondCourtCaontainer.addChild(secondCourtPurple);

    secondCourtPurple.x = 20;
    secondCourtPurple.y = 180;

    secondCourtPurple.interactive = true;
    secondCourtPurple.buttonMode = true;

    let style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 23,
      fill: "black"
    });
    messagePurple = new Text(`日治時期的判官就是現今的法官， \n負責指揮訴訟進行及審判工作。`, style);
    messagePurple.x = secondCourtCaontainer.width / 2 - messagePurple.width / 2;
    messagePurple.y = 20;
    secondCourtCaontainer.addChild(messagePurple);
    messagePurple.visible = false;

    secondCourtPurple.pointerover = function () {
      messagePurple.visible = true;
    }
    secondCourtPurple.pointerout = function () {
      messagePurple.visible = false;
    }
  }

  function createSecondCourtRed() {
    secondCourtRed = new Sprite(resources.secondCourtRed.texture);
    secondCourtCaontainer.addChild(secondCourtRed);

    secondCourtRed.x = 230;
    secondCourtRed.y = 153;

    secondCourtRed.interactive = true;
    secondCourtRed.buttonMode = true;

    let style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 23,
      fill: "black"
    });
    messageRed = new Text(`日治時期臺灣稱檢察官， \n負責偵查及起訴犯罪的人。`, style);
    messageRed.x = secondCourtCaontainer.width / 2 - messageRed.width / 2;
    messageRed.y = 20;
    secondCourtCaontainer.addChild(messageRed);
    messageRed.visible = false;

    secondCourtRed.pointerover = function () {
      messageRed.visible = true;
    }
    secondCourtRed.pointerout = function () {
      messageRed.visible = false;
    }
  }

  function createSecondCourtWhite() {
    secondCourtWhite = new Sprite(resources.secondCourtWhite.texture);
    secondCourtCaontainer.addChild(secondCourtWhite);

    secondCourtWhite.x = 430;
    secondCourtWhite.y = 150;

    secondCourtWhite.interactive = true;
    secondCourtWhite.buttonMode = true;

    let style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 23,
      fill: "black"
    });
    messageWhite = new Text(`日治時期的辯護士就是現今的律師， \n負責訴訟中為刑事被告 \n進行辯護及民事訴訟的代理人。`, style);
    messageWhite.x = secondCourtCaontainer.width / 2 - messageWhite.width / 2;
    messageWhite.y = 20;
    secondCourtCaontainer.addChild(messageWhite);
    messageWhite.visible = false;

    secondCourtWhite.pointerover = function () {
      messageWhite.visible = true;
    }
    secondCourtWhite.pointerout = function () {
      messageWhite.visible = false;
    }
  }

  function createSecondCourtGreen() {
    secondCourtGreen = new Sprite(resources.secondCourtGreen.texture);
    secondCourtCaontainer.addChild(secondCourtGreen);

    secondCourtGreen.x = 680;
    secondCourtGreen.y = 190;

    secondCourtGreen.interactive = true;
    secondCourtGreen.buttonMode = true;

    let style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 23,
      fill: "black"
    });
    messageGreen = new Text(`日治時期的的書記就是現今的書記官， \n負責法庭上審判過程的紀錄。`, style);
    messageGreen.x = secondCourtCaontainer.width / 2 - messageGreen.width / 2;
    messageGreen.y = 20;
    secondCourtCaontainer.addChild(messageGreen);
    messageGreen.visible = false;

    secondCourtGreen.pointerover = function () {
      messageGreen.visible = true;
    }
    secondCourtGreen.pointerout = function () {
      messageGreen.visible = false;
    }
  }

  function createBackButton() {
    backButton = new Sprite(resources.backButton.texture);
    backButton.x = secondCourtCaontainer.width - backButton.width - 20;
    backButton.y = 20;
    secondCourtCaontainer.addChild(backButton);

    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.pointerdown = function () {
      secondCourtCaontainer.destroy();
      loader.reset();
    }
    backButton.pointerover = function () {
      backButton.scale.x = 0.99;
      backButton.scale.y = 0.99;
    }
    backButton.pointerout = function () {
      backButton.scale.x = 1;
      backButton.scale.y = 1;
    }
  }
}