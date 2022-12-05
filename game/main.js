import { contain, keyboard, hitTestRectangle, sceneLimit } from "../module/helperFunction.js";
import { turnOnAnimate, turnOffAnimate, turnOnText, turnOffText, textBox, text } from "../module/animateSwitch.js";
import { showLoadingPage } from "../module/loading.js";


let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

let playerSheet = {};
let statueSheet = {};
let templeSheet = {};
let space = keyboard(32);

let mainCanvas = document.getElementById("main-canvas");

let state, player, homeIcon,
  mainScene, templeMap,
  statue, temple, blo2, gameScene,
  playerContainer, MainSceneContainer, templeSceneContainer;

let WestDaChengFang, EastDaChengFang, PanChi, LingXingMen, YiLu, LiMen, DaChengDian, MingHuanCi, XiaoZiCi, RuDeZhiMen, WenChangGe, EastWu, WestWu;

window.onload = function () {
  let app = new Application({
    width: 1024,
    height: 648,
    resolution: 1
  }
  );
  mainCanvas.appendChild(app.view);

  loader
    .add("mainScene", "./img/mainScene.jpg")
    .add("templeMap", "./img/templeScene/templeMap.jpg")
    .add("homeIcon", "./img/home.png")
    .add("playerAnimate", "./img/player/playerAnimate.png")
    .add("statueAnimate", "./img/statue/statueAnimate.png")
    .add("templeAnimate", "./img/temple/templeAnimate.png")
    .add("blo2", "./img/blo2.png")
    .add("DaChengFang", "./img/templeScene/DaChengFang.png")
    .add("PanChi", "./img/templeScene/PanChi.png")
    .add("LingXingMen", "./img/templeScene/LingXingMen.png")
    .add("YiLu", "./img/templeScene/YiLu.png")
    .add("LiMen", "./img/templeScene/LiMen.png")
    .add("DaChengDian", "./img/templeScene/DaChengDian.png")
    .add("MingHuanCi", "./img/templeScene/MingHuanCi.png")
    .add("XiaoZiCi", "./img/templeScene/XiaoZiCi.png")
    .add("RuDeZhiMen", "./img/templeScene/RuDeZhiMen.png")
    .add("WenChangGe", "./img/templeScene/WenChangGe.png")
    .add("Wu", "./img/templeScene/Wu.png")
    .load(setUp);

  function setUp() {
    gameScene = new Container();
    app.stage.addChild(gameScene);

    MainSceneContainer = new Container();
    app.stage.addChild(MainSceneContainer);

    mainScene = new Sprite(resources.mainScene.texture);
    mainScene.width = app.screen.width * 2;
    mainScene.height = app.screen.height * 3;
    MainSceneContainer.addChild(mainScene);

    homeIcon = new Sprite(resources.homeIcon.texture);
    homeIcon.anchor.set(0.5)
    homeIcon.x = 40;
    homeIcon.y = 40;
    app.stage.addChild(homeIcon);
    homeIcon.interactive = true;
    homeIcon.buttonMode = true;
    homeIcon.pointerdown = function () {
      window.location.href = "index.html"
    }
    homeIcon.pointerover = function () {
      homeIcon.scale.x = 0.8;
      homeIcon.scale.y = 0.8;
    }
    homeIcon.pointerout = function () {
      homeIcon.scale.x = 1;
      homeIcon.scale.y = 1;
    }

    templeSceneContainer = new Container();
    app.stage.addChild(templeSceneContainer);
    templeMap = new Sprite(resources.templeMap.texture);
    templeMap.width = 3840;
    templeMap.height = 5040;
    templeSceneContainer.addChild(templeMap);
    createWestDaChengFang();
    createEastDaChengFang();
    createPanChi();
    createLingXingMen();
    createYiLu();
    createLiMen();
    createMingHuanCi();
    createXiaoZiCi();
    createDaChengDian();
    createRuDeZhiMen();
    createWenChangGe();
    createWestWu();
    createEastWu();
    templeSceneContainer.visible = false;

    blo2 = new Sprite(resources.blo2.texture);
    blo2.x = app.screen.width * 0.5 + 180;
    blo2.y = app.screen.height * 0.5;
    blo2.width = 32;
    blo2.height = 32;
    templeSceneContainer.addChild(blo2);

    createStatueSheet();
    createStatue();

    createTempleSheet();
    createTemple();

    createPlayerSheet();
    createPlayer();

    //Capture the keyboard arrow keys
    let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

    let speed = 25;

    left.press = function () {
      turnOnAnimate(player, playerSheet.walkLeft);
      player.vx = -speed;
      player.vy = 0;
    };
    left.release = function () {
      if (!right.isDown && player.vy === 0) {
        turnOffAnimate(player, playerSheet.standLeft);
        player.vx = 0;
      }
    };
    up.press = function () {
      turnOnAnimate(player, playerSheet.walkUp);
      player.vy = -speed;
      player.vx = 0;
    };
    up.release = function () {
      if (!down.isDown && player.vx === 0) {
        turnOffAnimate(player, playerSheet.standUp);
        player.vy = 0;
      }
    };
    right.press = function () {
      turnOnAnimate(player, playerSheet.walkRight);
      player.vx = speed;
      player.vy = 0;
    };
    right.release = function () {
      if (!left.isDown && player.vy === 0) {
        turnOffAnimate(player, playerSheet.standRight);
        player.vx = 0;
      }
    };
    down.press = function () {
      turnOnAnimate(player, playerSheet.walkDown);
      player.vy = speed;
      player.vx = 0;
    };
    down.release = function () {
      if (!up.isDown && player.vx === 0) {
        turnOffAnimate(player, playerSheet.standDown);
        player.vy = 0;
      }
    };
    space.press = function () {
      spaceFunction();
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

    if (MainSceneContainer.visible) {
      sceneLimit(player, playerContainer, mainScene, MainSceneContainer, app);

      //撞雕像
      if (hitTestRectangle(player, statue)) {
        turnOnText("statue-text", `這裡是湯德章公園...  >>> `);
        if (!statue.playing) {
          turnOnAnimate(statue, statueSheet.on);
        }
      } else {
        turnOffAnimate(statue, statueSheet.off);
        turnOffText("statue-text");
      }
      //撞孔廟
      if (hitTestRectangle(player, temple)) {
        turnOnText("temple-text", `這裡是孔廟，位於南門路上，在清朝時期這裡被稱作檨仔林，孔廟在當時又名為府文廟。`)
        if (!temple.playing) {
          turnOnAnimate(temple, templeSheet.on);
        }
      } else {
        turnOffAnimate(temple, templeSheet.off);
        turnOffText("temple-text");
        if (textBox.classList.contains("goToTempleConfirm")) {
          turnOffText("goToTempleConfirm");
        }
      }
    }
  }

  function goToTempleScene() {
    player.x += player.vx;
    player.y += player.vy;

    contain(player, { x: 0, y: 0, width: 3840, height: 5040 });

    sceneLimit(player, playerContainer, templeMap, templeSceneContainer, app);

    //撞西大成坊
    if (hitTestRectangle(player, WestDaChengFang)) {
      turnOnText("WestDaChengFang-text", `大成坊是孔子廟中三處以「大成」為命名的空間之一，分成東西兩座，這裡是西大成坊，若從這裡出去會看見忠義國小。>>>`);
    } else {
      turnOffText("WestDaChengFang-text");
      if (textBox.classList.contains("leaveWestDaChengFangConfirm")) {
        turnOffText("leaveWestDaChengFangConfirm");
      }
    }
    //撞東大成坊
    if (hitTestRectangle(player, EastDaChengFang)) {
      turnOnText("EastDaChengFang-text", `大成坊是孔子廟中三處以「大成」為命名的空間之一，分成東西兩座，這裡是東大成坊，若從這裡出去會來到南門路，這裡也是目前孔廟的總入口。>>>`);
    } else {
      turnOffText("EastDaChengFang-text");
      if (textBox.classList.contains("leaveEastDaChengFangConfirm")) {
        turnOffText("leaveEastDaChengFangConfirm");
      }
    }
    //撞櫺星門
    if (hitTestRectangle(player, LingXingMen)) {
      turnOnText("LingXingMen-text", `這裡是櫺星門，在2013年因為大成門前面一棵百年榕樹病枯倒塌而意外重見天日。`);
    } else {
      turnOffText("LingXingMen-text");
    }
    //撞泮池
    if (hitTestRectangle(player, PanChi)) {
      turnOnText("PanChi-text", `孔廟的前方通常會設一座半圓形的水池，稱為「泮」池，象徵孔廟與學校相結合的概念。你也可以試著像古時的秀才們一樣「遊泮」哦`);
    } else {
      turnOffText("PanChi-text");
    }
    //撞義路
    if (hitTestRectangle(player, YiLu)) {
      turnOnText("YiLu-text", `進入孔廟的殿堂必須經過禮門、義路兩個路徑，表示請求孔子之道，必須遵循禮義！而這裡就是義路。`);
    } else {
      turnOffText("YiLu-text");
    }
    //撞禮門
    if (hitTestRectangle(player, LiMen)) {
      turnOnText("LiMen-text", `進入孔廟的殿堂必須經過禮門、義路兩個路徑，表示請求孔子之道，必須遵循禮義！而這裡就是禮門。`);
    } else {
      turnOffText("LiMen-text");
    }
    //撞孝子祠
    if (hitTestRectangle(player, XiaoZiCi)) {
      turnOnText("XiaoZiCi-text", `這裡是節孝祠與「孝子祠」，是奉祀節孝婦女與孝子之祠堂，事實上這裡在清朝時可是鄉賢祠！至於何時所改建的，說法不一。而目前節孝祠孝子祠內供奉有節孝婦女二百多人，孝子則只有侯瑞珍一人，可見要成為公認的孝子是很難的事。 `);
    } else {
      turnOffText("XiaoZiCi-text");
    }
    //撞名宦祠
    if (hitTestRectangle(player, MingHuanCi)) {
      turnOnText("MingHuanCi-text", `這裡是名宦祠與鄉賢祠，是孔子廟為了崇德報功，供奉祭禮朝遷功臣及受地方尊崇士紳之祠堂。 事實上清朝時期這裡只是名宦祠，是直到後來鄉賢祠被改建為節孝祠與孝子祠，鄉賢祠便與名宦祠合而為一。`);
    } else {
      turnOffText("MingHuanCi-text");
    }
    //撞東廡
    if (hitTestRectangle(player, EastWu)) {
      turnOnText("EastWu-text", `大成殿兩側廟房之南段分別有為東廡與西廡，是孔子廟中供奉先賢先儒之處。而這裡是東廡。目前東廡中有先賢四十一位先儒三十九位，其中包括有先賢周敦頤、程顥、先儒顧炎武、董仲舒、韓愈、范仲淹、文天祥等人。`);
    } else {
      turnOffText("EastWu-text");
    }
    //撞西廡
    if (hitTestRectangle(player, WestWu)) {
      turnOnText("WestWu-text", `大成殿兩側廟房之南段分別有為東廡與西廡，是孔子廟中供奉先賢先儒之處。而這裡是西廡。目前西廡中有先賢四十位先儒三十八位，其中包括有先賢張載、邵雍、先儒諸葛亮、歐陽修、司馬光、黃宗羲等人。`);
    } else {
      turnOffText("WestWu-text");
    }
    //撞入德之門
    if (hitTestRectangle(player, RuDeZhiMen)) {
      turnOnText("RuDeZhiMen-text", `這裡是入德之門，是進入明倫堂空間之象徵性入口。門口兩側分別提有聖域、賢關，過去由各地選出的學子，必須經過此門才得入內，表明了學子若要成為聖賢，一定要從修養品行開始。`);
    } else {
      turnOffText("RuDeZhiMen-text");
    }
    //撞大成殿
    if (hitTestRectangle(player, DaChengDian)) {
      turnOnText("DaChengDian-text", `這裡是孔子廟建築組群中層級最高的建築--大成殿。 大成殿前有露台，是釋奠禮祭孔時，表演佾舞之場所。露台正面有御路，在大清會典圖卷中則稱之為螭陛。`);
    } else {
      turnOffText("DaChengDian-text");
    }
    //撞文昌閣
    if (hitTestRectangle(player, WenChangGe)) {
      turnOnText("WenChangGe-text", `這裡是文昌閣，文昌閣並不一定與孔子廟有關，而文昌帝君與魁星更與孔子無關，只是因為歷代重視科考，才會在孔子廟中興建文昌閣。`);
    } else {
      turnOffText("WenChangGe-text");
    }
  }

  // 按下空白鍵會執行的內容
  function spaceFunction() {
    if (hitTestRectangle(player, statue)) {
      if (!textBox.classList.contains("display-none")) {
        console.log(space.press)
        text.innerText = `這座雕像名為「迎風之舞」，注意雕像面向的位置。`;
        textBox.classList.add("display-none");
        textBox.classList.remove("display-none");
      }
    }
    if (hitTestRectangle(player, temple)) {
      if (textBox.classList.contains("temple-text")) {
        text.innerText = `是否進入孔廟？`;
        textBox.classList.add("goToTempleConfirm");
        textBox.classList.remove("temple-text");
      } else if (textBox.classList.contains("goToTempleConfirm")) {
        state = goToTempleScene;
        turnOffText("goToTempleConfirm");
        MainSceneContainer.visible = false;
        showLoadingPage(app, () => {
          player.x = EastDaChengFang.x + EastDaChengFang.width / 2;
          player.y = EastDaChengFang.y + EastDaChengFang.height;
          templeSceneContainer.visible = true;
        });
      }
    }
    if (hitTestRectangle(player, WestDaChengFang)) {
      if (textBox.classList.contains("WestDaChengFang-text")) {
        text.innerText = `是否離開孔廟？`;
        textBox.classList.add("leaveWestDaChengFangConfirm");
        textBox.classList.remove("WestDaChengFang-text");
      } else if (textBox.classList.contains("leaveWestDaChengFangConfirm")) {
        state = play;
        turnOffText("leaveWestDaChengFangConfirm");
        templeSceneContainer.visible = false;
        showLoadingPage(app, () => {
          player.x = temple.x + temple.width / 2;
          player.y = temple.y - 20;
          MainSceneContainer.visible = true;
        });
      }
    }
    if (hitTestRectangle(player, EastDaChengFang)) {
      if (textBox.classList.contains("EastDaChengFang-text")) {
        text.innerText = `是否離開孔廟？`;
        textBox.classList.add("leaveEastDaChengFangConfirm");
        textBox.classList.remove("EastDaChengFang-text");
      } else if (textBox.classList.contains("leaveEastDaChengFangConfirm")) {
        state = play;
        turnOffText("leaveEastDaChengFangConfirm");
        templeSceneContainer.visible = false;
        showLoadingPage(app, () => {
          player.x = temple.x + temple.width / 2;
          player.y = temple.y - 20;
          MainSceneContainer.visible = true;
        });
      }
    }
  }

  //-----建立Sprites-----
  //player
  function createPlayerSheet() {
    let ssheet = PIXI.Texture.from(resources.playerAnimate.texture);
    let w = 100;
    let h = 100;

    playerSheet["standDown"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 3 * h, w, h))
    ];
    playerSheet["standUp"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 3 * h, w, h))
    ];
    playerSheet["standLeft"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0 * h, w, h))
    ];
    playerSheet["standRight"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ];
    playerSheet["walkDown"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 3 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 3 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 4 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 4 * h, w, h))
    ];
    playerSheet["walkUp"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 3 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 3 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 3 * h, w, h))
    ];
    playerSheet["walkLeft"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h))
    ];
    playerSheet["walkRight"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 2 * h, w, h))
    ];
  }
  function createPlayer() {
    player = new PIXI.extras.AnimatedSprite(playerSheet.standDown);
    player.anchor.set(0.5, 0.5);
    player.animationSpeed = 0.3;
    player.loop = false;
    player.x = app.screen.width * 0.5;
    player.y = app.screen.height * 0.5;
    player.vx = 0;
    player.vy = 0;
    playerContainer = new Container();
    app.stage.addChild(playerContainer);
    playerContainer.addChild(player);
    player.play();
  }

  //statue
  function createStatueSheet() {
    let ssheet = PIXI.Texture.from(resources.statueAnimate.texture);
    let w = 295;
    let h = 486;

    statueSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h))
    ];
    statueSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ];
  }
  function createStatue() {
    statue = new PIXI.extras.AnimatedSprite(statueSheet.off);
    statue.animationSpeed = 0.1;
    statue.loop = false;
    statue.x = mainScene.width - statue.width - 130;
    statue.y = mainScene.height - statue.height - 190;
    statue.width = 295;
    statue.height = 486;
    MainSceneContainer.addChild(statue);
    statue.play();
  }

  //temple
  function createTempleSheet() {
    let ssheet = PIXI.Texture.from(resources.templeAnimate.texture);
    let w = 512;
    let h = 486;

    templeSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ];
    templeSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createTemple() {
    temple = new PIXI.extras.AnimatedSprite(templeSheet.off);
    temple.animationSpeed = 0.1;
    temple.loop = false;
    temple.x = 400;
    temple.y = 1100;
    MainSceneContainer.addChild(temple);
  }
  //temple內部
  function createWestDaChengFang() {
    WestDaChengFang = new Sprite(resources.DaChengFang.texture);
    WestDaChengFang.x = 35;
    WestDaChengFang.y = 3350;
    templeSceneContainer.addChild(WestDaChengFang);
  }
  function createEastDaChengFang() {
    EastDaChengFang = new Sprite(resources.DaChengFang.texture);
    EastDaChengFang.x = 3325;
    EastDaChengFang.y = 3350;
    templeSceneContainer.addChild(EastDaChengFang);
  }
  function createPanChi() {
    PanChi = new Sprite(resources.PanChi.texture);
    PanChi.x = 1220;
    PanChi.y = 4080;
    templeSceneContainer.addChild(PanChi);
  }
  function createLingXingMen() {
    LingXingMen = new Sprite(resources.LingXingMen.texture);
    LingXingMen.x = 1265;
    LingXingMen.y = 3480;
    templeSceneContainer.addChild(LingXingMen);
  }
  function createYiLu() {
    YiLu = new Sprite(resources.YiLu.texture);
    YiLu.x = 700;
    YiLu.y = 2620;
    templeSceneContainer.addChild(YiLu);
  }
  function createLiMen() {
    LiMen = new Sprite(resources.LiMen.texture);
    LiMen.x = 1970;
    LiMen.y = 2620;
    templeSceneContainer.addChild(LiMen);
  }
  function createDaChengDian() {
    DaChengDian = new Sprite(resources.DaChengDian.texture);
    DaChengDian.x = 1050;
    DaChengDian.y = 900;
    templeSceneContainer.addChild(DaChengDian);
  }
  function createMingHuanCi() {
    MingHuanCi = new Sprite(resources.MingHuanCi.texture);
    MingHuanCi.x = 1880;
    MingHuanCi.y = 1800;
    templeSceneContainer.addChild(MingHuanCi);
  }
  function createXiaoZiCi() {
    XiaoZiCi = new Sprite(resources.XiaoZiCi.texture);
    XiaoZiCi.x = 560;
    XiaoZiCi.y = 1800;
    templeSceneContainer.addChild(XiaoZiCi);
  }
  function createRuDeZhiMen() {
    RuDeZhiMen = new Sprite(resources.RuDeZhiMen.texture);
    RuDeZhiMen.x = 2400;
    RuDeZhiMen.y = 1820;
    templeSceneContainer.addChild(RuDeZhiMen);
  }
  function createWenChangGe() {
    WenChangGe = new Sprite(resources.WenChangGe.texture);
    WenChangGe.x = 2925;
    WenChangGe.y = 250;
    templeSceneContainer.addChild(WenChangGe);
  }
  function createWestWu() {
    WestWu = new Sprite(resources.Wu.texture);
    WestWu.x = 700;
    WestWu.y = 1370;
    templeSceneContainer.addChild(WestWu);
  }
  function createEastWu() {
    EastWu = new Sprite(resources.Wu.texture);
    EastWu.x = 1985;
    EastWu.y = 1370;
    templeSceneContainer.addChild(EastWu);
  }
}
