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
let TaiWenMuseumSheet = {};
let JudicialMuseumSheet = {};
let space = keyboard(32);
let speed = 10;

let mainCanvas = document.getElementById("main-canvas");

let state, player, homeIcon,
  mainScene, templeMap, TaiWenMuseumMap,
  statue, temple, TaiWenMuseum, JudicialMuseum, gameScene,
  playerContainer, MainSceneContainer, templeSceneContainer, TaiWenMuseumSceneContainer;

//temple內部
let WestDaChengFang, EastDaChengFang, PanChi, LingXingMen, YiLu, LiMen, DaChengDian, MingHuanCi, XiaoZiCi, RuDeZhiMen, WenChangGe, EastWu, WestWu;
//TaiWenMuseum內部
let TaiWenMuseumTopView, back, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, num0, num1, num2, num3, num4, num5, num6;

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
    .add("TaiWenMuseumMap", "./img/TaiWenMuseumScene/TaiWenMuseumMap.jpg")
    .add("homeIcon", "./img/home.png")
    .add("playerAnimate", "./img/player/playerAnimate.png")
    .add("statueAnimate", "./img/statue/statueAnimate.png")
    .add("templeAnimate", "./img/temple/templeAnimate.png")
    .add("TaiWenMuseumAnimate", "./img/TaiWenMuseum/TaiWenMuseum.png")
    .add("JudicialMuseumAnimate", "./img/JudicialMuseum/JudicialMuseum.png")
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
    .add("TaiWenMuseumTopView", "./img/TaiWenMuseumScene/TaiWenMuseumTopView.png")
    .add("A", "./img/TaiWenMuseumScene/box/A.jpg")
    .add("B", "./img/TaiWenMuseumScene/box/B.jpg")
    .add("C", "./img/TaiWenMuseumScene/box/C.jpg")
    .add("D", "./img/TaiWenMuseumScene/box/D.jpg")
    .add("E", "./img/TaiWenMuseumScene/box/E.jpg")
    .add("F", "./img/TaiWenMuseumScene/box/F.jpg")
    .add("G", "./img/TaiWenMuseumScene/box/G.jpg")
    .add("H", "./img/TaiWenMuseumScene/box/H.jpg")
    .add("I", "./img/TaiWenMuseumScene/box/I.jpg")
    .add("J", "./img/TaiWenMuseumScene/box/J.jpg")
    .add("K", "./img/TaiWenMuseumScene/box/K.jpg")
    .add("L", "./img/TaiWenMuseumScene/box/L.jpg")
    .add("M", "./img/TaiWenMuseumScene/box/M.jpg")
    .add("N", "./img/TaiWenMuseumScene/box/N.jpg")
    .add("O", "./img/TaiWenMuseumScene/box/O.jpg")
    .add("P", "./img/TaiWenMuseumScene/box/P.jpg")
    .add("Q", "./img/TaiWenMuseumScene/box/Q.jpg")
    .add("R", "./img/TaiWenMuseumScene/box/R.jpg")
    .add("S", "./img/TaiWenMuseumScene/box/S.jpg")
    .add("T", "./img/TaiWenMuseumScene/box/T.jpg")
    .add("U", "./img/TaiWenMuseumScene/box/U.jpg")
    .add("V", "./img/TaiWenMuseumScene/box/V.jpg")
    .add("W", "./img/TaiWenMuseumScene/box/W.jpg")
    .add("X", "./img/TaiWenMuseumScene/box/X.jpg")
    .add("Y", "./img/TaiWenMuseumScene/box/Y.jpg")
    .add("Z", "./img/TaiWenMuseumScene/box/Z.jpg")
    .add("num0", "./img/TaiWenMuseumScene/box/num0.jpg")
    .add("num1", "./img/TaiWenMuseumScene/box/num1.jpg")
    .add("num2", "./img/TaiWenMuseumScene/box/num2.jpg")
    .add("num3", "./img/TaiWenMuseumScene/box/num3.jpg")
    .add("num4", "./img/TaiWenMuseumScene/box/num4.jpg")
    .add("num5", "./img/TaiWenMuseumScene/box/num5.jpg")
    .add("num6", "./img/TaiWenMuseumScene/box/num6.jpg")
    .add("back", "./img/TaiWenMuseumScene/back.png")
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

    TaiWenMuseumSceneContainer = new Container();
    app.stage.addChild(TaiWenMuseumSceneContainer);
    TaiWenMuseumMap = new Sprite(resources.TaiWenMuseumMap.texture);
    TaiWenMuseumSceneContainer.addChild(TaiWenMuseumMap);
    createTaiWenMuseumTopView();
    createA();
    createB();
    createC();
    createD();
    createE();
    createF();
    createG();
    createH();
    createI();
    createJ();
    createK();
    createL();
    createM();
    createN();
    createO();
    createP();
    createQ();
    createR();
    createS();
    createT();
    createU();
    createV();
    createW();
    createX();
    createY();
    createZ();
    createNum0();
    createNum1();
    createNum2();
    createNum3();
    createNum4();
    createNum5();
    createNum6();
    createBack();
    TaiWenMuseumSceneContainer.visible = false;

    createStatueSheet();
    createStatue();

    createTempleSheet();
    createTemple();

    createTaiWenMuseumSheet();
    createTaiWenMuseum();

    createJudicialMuseumSheet();
    createJudicialMuseum();

    createPlayerSheet();
    createPlayer();

    //Capture the keyboard arrow keys
    let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

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
  // state = play
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
        turnOnText("temple-text", `這裡是孔廟，位於南門路上，在清朝時期這裡被稱作檨仔林，孔廟在當時又名為府文廟。>>>`)
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
      //撞文學館
      if (hitTestRectangle(player, TaiWenMuseum)) {
        turnOnText("TaiWenMuseum-text", "這裡是台灣文學館，在日治時期這裡可是臺南州廳，戰後時期則作為空軍後勤司令部，是過去非常重要的地標... >>>")
        if (!TaiWenMuseum.playing) {
          turnOnAnimate(TaiWenMuseum, TaiWenMuseumSheet.on);
        }
      } else {
        turnOffAnimate(TaiWenMuseum, TaiWenMuseumSheet.off);
        turnOffText("TaiWenMuseum-text");
        if (textBox.classList.contains("goToTaiWenMuseumConfirm")) {
          turnOffText("goToTaiWenMuseumConfirm");
        }
      }
      //撞司法博物館
      if (hitTestRectangle(player, JudicialMuseum)) {
        turnOnText("JudicialMuseum-text", "這裡是司法博物館，在日治時期是臺南地方法院，當時的地址是南門町二丁目... >>>")
        if (!JudicialMuseum.playing) {
          turnOnAnimate(JudicialMuseum, JudicialMuseumSheet.on);
        }
      } else {
        turnOffAnimate(JudicialMuseum, JudicialMuseumSheet.off);
        turnOffText("JudicialMuseum-text");
      }
    }
  }
  //state = goToTempleScene
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
  //state = goToTaiWenMuseum
  function goToTaiWenMuseum() {
    player.x += player.vx;
    player.y += player.vy;

    contain(player, { x: 0, y: 0, width: 2500, height: 1887 });

    sceneLimit(player, playerContainer, TaiWenMuseumMap, TaiWenMuseumSceneContainer, app);

    //撞back鍵
    if (hitTestRectangle(player, back)) {
      turnOnText("back-text", "要回到南門路上嗎？ >>>")
    } else {
      turnOffText("back-text")
    }
    //撞箱子
    if (hitTestRectangle(player, A)) {
      turnOnText("A-text", `【燈箱A】<br><br>只有砲火蒸餾過的酒<br>特別清醒<br>每一滴都會讓你的舌尖<br>舔到刺刀<br><br>白靈〈金門高粱〉2000`)
    } else {
      turnOffText("A-text")
    }
    if (hitTestRectangle(player, B)) {
      turnOnText("B-text", `【燈箱B】<br><br>心裡藏著的是繁複美麗的冬瓜盅。我有時候羨慕冬瓜煮過就透明了，人生卻要經歷多少的烹煮，才能夠明明白白？<br><br>張曼娟〈一片薄薄的冬瓜〉2004`)
    } else {
      turnOffText("B-text")
    }
    if (hitTestRectangle(player, C)) {
      turnOnText("C-text", `【燈箱D】<br><br>湯底是時間淬鍊出來的魂，時間拉長了滋味的餘韻，最貴的成本，其實是跟食材對話的耐性。<br><br>米果〈湯頭是熬煮的心意不是化學添加的魔術〉2015`)
    } else {
      turnOffText("C-text")
    }
    if (hitTestRectangle(player, D)) {
      turnOnText("D-text", `【燈箱D】<br><br>杯中美色奪桃花，<br>妙釀如斯有幾家。<br>不但麴生風味好，<br>且教縱飲若餐霞。<br><br>許柱珠〈紅酒〉1933`)
    } else {
      turnOffText("D-text")
    }
    if (hitTestRectangle(player, E)) {
      turnOnText("E-text", `【燈箱E】<br><br>微軀秋後最驚風，<br>十月綿衣苦未縫。<br>燉得隔年紅面鴨，<br>茶油薑酒補三冬。<br><br>林緝熙〈辛卯秋冬雜詩之二〉1951`)
    } else {
      turnOffText("E-text")
    }
    if (hitTestRectangle(player, F)) {
      turnOnText("F-text", `【燈箱F】<br><br>豐原月餅出名鬆，<br>竹塹糖多氣味濃。<br>粵製不能閩製比，<br>說來瘦肉遜莎蓉。<br><br>林知義〈中秋竹枝詞之三〉日治`)
    } else {
      turnOffText("F-text")
    }
    if (hitTestRectangle(player, G)) {
      turnOnText("G-text", `【燈箱G】<br><br>糕餌炊成正月天，<br>春盤流盡老饕涎。<br>香甘好下屠蘇酒，<br>片片山妻手自煎。<br><br>傅錫祺〈年糕之二〉1911`)
    } else {
      turnOffText("G-text")
    }
    if (hitTestRectangle(player, H)) {
      turnOnText("H-text", `【燈箱H】<br><br>武巒名物醍醐味，<br>愛玉凍堪並一雙。<br>玉屑玄霜相醞釀，<br>盡教頭腦熱能降。<br><br>王炳南〈仙草冰〉1941`)
    } else {
      turnOffText("H-text")
    }
    if (hitTestRectangle(player, I)) {
      turnOnText("I-text", `【燈箱I】<br><br>金桔醬黃澄澄的，看了就讓人食指大動，……晚餐吃炸排骨，沾上金桔醬吃，有一點酸酸的，又有一點甜，爸爸和我都多吃了一碗飯。`)
    } else {
      turnOffText("I-text")
    }
    if (hitTestRectangle(player, J)) {
      turnOnText("J-text", `【燈箱J】<br><br>圓滾滾的潤餅握在手上，就如同白色芳香的記憶，從手心傳到心坎裡。<br><br>李敏勇〈清明之憶，潤餅之味〉2015`)
    } else {
      turnOffText("J-text")
    }
    if (hitTestRectangle(player, K)) {
      turnOnText("K-text", `【燈箱K】<br><br>灌了花生、糯米的豬大腸，若說出食材，恐怕會嚇壞日本人，……最好別問：「這外層有點嚼勁的皮是什麼？」<br><br>辛永清〈血液料理知多少？〉2012`)
    } else {
      turnOffText("K-text")
    }
    if (hitTestRectangle(player, L)) {
      turnOnText("L-text", `【燈箱L】<br><br>油燜苦瓜需要時間淬鍊，……起鍋時，一番柔軟新面貌，滋味先苦後甘，彷彿重新振作的人生。<br><br>朱國珍〈廚房的八字〉2016`)
    } else {
      turnOffText("L-text")
    }
    if (hitTestRectangle(player, M)) {
      turnOnText("M-text", `【燈箱M】<br><br>尋常鴨卵製偏奇，<br>食品新傳合品題。<br>不是霜刀探破殼，<br>分明認得一丸泥。<br><br>李逢時 〈皮蛋〉寫於咸豐年間`)
    } else {
      turnOffText("M-text")
    }
    if (hitTestRectangle(player, N)) {
      turnOnText("N-text", `【燈箱N】<br><br>如波似浪送清香，<br>沙士味奇力特強，<br>冰冷一瓶常在握，<br>消炎猶可潤吟腸。<br><br>何木火〈汽水〉1958`)
    } else {
      turnOffText("N-text")
    }
    if (hitTestRectangle(player, O)) {
      turnOnText("O-text", `【燈箱O】<br><br>菜尾，是我記憶中的佳餚，心中的「絕饗」，菜尾不只是食物，是一段歷史的味道。<br><br>方梓〈歷史的味道〉2008`)
    } else {
      turnOffText("O-text")
    }
    if (hitTestRectangle(player, P)) {
      turnOnText("P-text", `【燈箱P】<br><br>鍋巴上灑著一點點的鹽，切了薑片，再加上罐頭的魚，真是好吃極了。我對著外公說：「外公，怎麼那麼好吃！」<br><br>亞榮隆．撒可努〈外公的海〉2011`)
    } else {
      turnOffText("P-text")
    }
    if (hitTestRectangle(player, Q)) {
      turnOnText("Q-text", `【燈箱Q】<br><br>「菜燕切塊」，以菱形呈現，不會很甜，可以直接就口，咬下有爽脆彈牙的感覺，冬瓜口味、黑糖口味是主流，這是夏天午後的傳統涼品點心，沁涼爽滑。<br><br>王浩一〈嘉義．朴子〉2016`)
    } else {
      turnOffText("Q-text")
    }
    if (hitTestRectangle(player, R)) {
      turnOnText("R-text", `【燈箱R】<br><br>冬季的烏魚儲夠能量洄游產卵，也正是青蒜最軟嫩當時的季節，把兩者煮成米粉湯，那可真是老天爺的傑作。<br><br>凌煙〈烏魚米粉和白鯧米粉〉2019`)
    } else {
      turnOffText("R-text")
    }
    if (hitTestRectangle(player, S)) {
      turnOnText("S-text", `【燈箱S】<br><br>斑文浮點點，一片認魚皮。<br>冒鼓聲鞺鞳，藏弓服陸離。<br>蒸成鱗已脫，剔去骨無遺。<br>至味都包裹，真堪佐酒卮。<br><br>毛士釗〈魚皮五律〉寫於道光期間`)
    } else {
      turnOffText("S-text")
    }
    if (hitTestRectangle(player, T)) {
      turnOnText("T-text", `【燈箱T】<br><br>吃完一枝杏仁鹹冰棒，……他說愚公移山移的如果是鹽山，許多人會來幫忙挑擔吧。<br><br>宇文正〈他說的，關於愛〉2017`)
    } else {
      turnOffText("T-text")
    }
    if (hitTestRectangle(player, U)) {
      turnOnText("U-text", `【燈箱U】<br><br>想往過煮鹹糜，……若有豬油、蔥頭khiàn芳，閣有thang摻che肉粕仔，就sut kah m̄知影thang飽--lò͘！<br><br>蕭平治〈菜豆仔糜〉2002`)
    } else {
      turnOffText("U-text")
    }
    if (hitTestRectangle(player, V)) {
      turnOnText("V-text", `【燈箱V】<br><br>啊！鹹菜！煮豬血！我歡呼一聲。鹹菜，尤其鹹菜婆的鹹菜，煮豬血最好吃了，每次我都吃三碗！<br><br>李喬〈鹹菜婆〉1967`)
    } else {
      turnOffText("V-text")
    }
    if (hitTestRectangle(player, W)) {
      turnOnText("W-text", `【燈箱W】<br><br>蔗甘原有種，葉白自成奇。<br>芽長滋清露，風搖動素旗。<br>既分姜尚鬢，微奪馬良眉。<br>壓搾寒漿出，如流碧玉脂。<br><br>王竹修〈白葉蔗之一〉1939`)
    } else {
      turnOffText("W-text")
    }
    if (hitTestRectangle(player, X)) {
      turnOnText("X-text", `【燈箱X】<br><br>甜粄个味緒<br>細細口緊食<br>阿姆个艱苦啊<br>映入做妹儕心肝肚<br>續無半屑甜味<br><br>張芳慈〈甜粄味〉2001`)
    } else {
      turnOffText("X-text")
    }
    if (hitTestRectangle(player, Y)) {
      turnOnText("Y-text", `【燈箱Y】<br><br>絲纏葉裹總紛紛，<br>頭角應須露幾分。<br>只愛菱形蘸糖食，<br>誰知粒粒盡辛勤。<br><br>許炯軒〈角黍〉1932`)
    } else {
      turnOffText("Y-text")
    }
    if (hitTestRectangle(player, Z)) {
      turnOnText("Z-text", `【燈箱Z】<br><br>她小心而珍惜的把山羌醃肉從竹筒倒在碗裡，醃肉特有的香味頓時充滿了小小的病房。<br><br>里慕伊．阿紀〈探病〉2010`)
    } else {
      turnOffText("Z-text")
    }
    if (hitTestRectangle(player, num0)) {
      turnOnText("num0-text", `【燈箱0】<br><br>無法標示出酒精濃度<br>具有「流連忘返在霧中」的香味<br>用族人的感覺<br>釀製而成<br>的《小米酒》<br><br>沙力浪．達凱斯茀萊藍〈我在圖書館找一本酒〉2011`)
    } else {
      turnOffText("num0-text")
    }
    if (hitTestRectangle(player, num1)) {
      turnOnText("num1-text", `【燈箱1】<br><br>達悟人吃魚，是吃魚在海裡的曼妙游姿，吃魚的漂亮，吃魚的聰明，吃魚的堅韌性格，吃魚的團結。<br><br>夏曼．藍波安〈達悟族吃魚的文化〉2002`)
    } else {
      turnOffText("num1-text")
    }
    if (hitTestRectangle(player, num2)) {
      turnOnText("num2-text", `【燈箱2】<br><br>登盤肉重螯雙剪，<br>入饌膏肥殼一筐。<br>且向樽前陪蟻綠，<br>不容口裡肆雌黃。<br>當筵知有調羹者，<br>早備紅椒和紫薑。<br><br>林資銓〈蟹之三〉日治`)
    } else {
      turnOffText("num2-text")
    }
    if (hitTestRectangle(player, num3)) {
      turnOnText("num3-text", `【燈箱3】<br><br>鐵板上先放進蚵仔、青菜，再舀入兌過水的番薯粉，打蛋進去，香味隨著熱氣蒸騰四散，油花亢奮地跳舞<br><br>焦桐〈蚵仔煎〉 2009`)
    } else {
      turnOffText("num3-text")
    }
    if (hitTestRectangle(player, num4)) {
      turnOnText("num4-text", `【燈箱4】<br><br>囡仔的耳孔特別利，枝仔冰販仔猶未夠，猶原佇真遠的所在，猴囡仔已經聽著叫賣枝仔冰聲。<br><br>胡民祥〈糖蔥及枝仔冰〉1996`)
    } else {
      turnOffText("num4-text")
    }
    if (hitTestRectangle(player, num5)) {
      turnOnText("num5-text", `【燈箱5】<br><br>有一股熟悉的氣味從爐上的水鍋中飄進了他的鼻孔裡……是肉燥！速食麵的肉燥包！<br><br>郭強生〈何必回味〉1997`)
    } else {
      turnOffText("num5-text")
    }
    if (hitTestRectangle(player, num6)) {
      turnOnText("num6-text", `【燈箱6】<br><br>一剝開竹皮，一股清香就撲鼻而來，而且那糯米和花生米蒸得黏軟恰到好處，有入口就化的感覺。<br><br>葉石濤〈吃菜粽〉1994`)
    } else {
      turnOffText("num6-text")
    }
  }

  // 按下空白鍵會執行的內容
  function spaceFunction() {
    if (hitTestRectangle(player, statue)) {
      text.innerText = `這座雕像名為「迎風之舞」，注意雕像面向的道路。`;
    }
    if (hitTestRectangle(player, temple)) {
      if (textBox.classList.contains("temple-text")) {
        text.innerText = `是否進入孔廟？ >>>`;
        textBox.classList.add("goToTempleConfirm");
        textBox.classList.remove("temple-text");
      } else if (textBox.classList.contains("goToTempleConfirm")) {
        state = goToTempleScene;
        turnOffText("goToTempleConfirm");
        MainSceneContainer.visible = false;
        player.x = EastDaChengFang.x + EastDaChengFang.width / 2;
        player.y = EastDaChengFang.y + EastDaChengFang.height + 20;
        showLoadingPage(app, () => {
          templeSceneContainer.visible = true;
        });
      }
    }
    if (hitTestRectangle(player, WestDaChengFang)) {
      if (textBox.classList.contains("WestDaChengFang-text")) {
        text.innerText = `是否離開孔廟？ >>>`;
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
        text.innerText = `是否離開孔廟？ >>>`;
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
    if (hitTestRectangle(player, TaiWenMuseum)) {
      if (textBox.classList.contains("TaiWenMuseum-text")) {
        text.innerText = "話說它的地址在2022年似乎有了很大的改變？要到文學館周圍的文學步道走走逛逛嗎？ >>>"
        textBox.classList.add("goToTaiWenMuseumConfirm");
        textBox.classList.remove("TaiWenMuseum-text");
      } else if (textBox.classList.contains("goToTaiWenMuseumConfirm")) {
        state = goToTaiWenMuseum;
        turnOffText("goToTaiWenMuseumConfirm");
        MainSceneContainer.visible = false;
        player.x = back.x + back.width / 2;
        player.y = back.y + back.height + 20;
        showLoadingPage(app, () => {
          TaiWenMuseumSceneContainer.visible = true;
        });
      }
    }
    if (hitTestRectangle(player, back)) {
      console.log("hi")
      state = play;
      turnOffText("back-text");
      TaiWenMuseumSceneContainer.visible = false;
      showLoadingPage(app, () => {
        player.x = TaiWenMuseum.x + TaiWenMuseum.width / 2;
        player.y = TaiWenMuseum.y + TaiWenMuseum.height - 30;
        MainSceneContainer.visible = true;
      });
    }
    if (hitTestRectangle(player, JudicialMuseum)) {
      text.innerText = "不覺得這建築風格很眼熟嗎？這都是出自於「森山松之助」之手...進去司法博物館看看嗎？ >>>"
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
    player.x = 850;
    player.y = 750;
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
    statue.x = mainScene.width - statue.width - 115;
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
    temple.y = 1150;
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

  //TaiWenMuseum
  function createTaiWenMuseumSheet() {
    let ssheet = PIXI.Texture.from(resources.TaiWenMuseumAnimate.texture);
    let w = 512;
    let h = 486;

    TaiWenMuseumSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h))
    ];
    TaiWenMuseumSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createTaiWenMuseum() {
    TaiWenMuseum = new PIXI.extras.AnimatedSprite(TaiWenMuseumSheet.off);
    TaiWenMuseum.animationSpeed = 0.1;
    TaiWenMuseum.loop = false;
    TaiWenMuseum.x = 1040;
    TaiWenMuseum.y = 1200;
    MainSceneContainer.addChild(TaiWenMuseum);
  }
  //TaiWenMuseum內部
  function createTaiWenMuseumTopView() {
    TaiWenMuseumTopView = new Sprite(resources.TaiWenMuseumTopView.texture);
    TaiWenMuseumSceneContainer.addChild(TaiWenMuseumTopView);
  }
  function createBack() {
    back = new Sprite(resources.back.texture);
    back.x = 2300;
    back.y = 1550;
    TaiWenMuseumSceneContainer.addChild(back);
  }
  function createA() {
    A = new Sprite(resources.A.texture);
    A.x = 100;
    A.y = 1400;
    TaiWenMuseumSceneContainer.addChild(A);
  }
  function createB() {
    B = new Sprite(resources.B.texture);
    B.x = 180;
    B.y = 1400;
    TaiWenMuseumSceneContainer.addChild(B);
  }
  function createC() {
    C = new Sprite(resources.C.texture);
    C.x = 260;
    C.y = 1400;
    TaiWenMuseumSceneContainer.addChild(C);
  }
  function createD() {
    D = new Sprite(resources.D.texture);
    D.x = 340;
    D.y = 1400;
    TaiWenMuseumSceneContainer.addChild(D);
  }
  function createE() {
    E = new Sprite(resources.E.texture);
    E.x = 420;
    E.y = 1400;
    TaiWenMuseumSceneContainer.addChild(E);
  }
  function createF() {
    F = new Sprite(resources.F.texture);
    F.x = 500;
    F.y = 1400;
    TaiWenMuseumSceneContainer.addChild(F);
  }
  function createG() {
    G = new Sprite(resources.G.texture);
    G.x = 580;
    G.y = 1400;
    TaiWenMuseumSceneContainer.addChild(G);
  }
  function createH() {
    H = new Sprite(resources.H.texture);
    H.x = 780;
    H.y = 1400;
    TaiWenMuseumSceneContainer.addChild(H);
  }
  function createI() {
    I = new Sprite(resources.I.texture);
    I.x = 780;
    I.y = 1480;
    TaiWenMuseumSceneContainer.addChild(I);
  }
  function createJ() {
    J = new Sprite(resources.J.texture);
    J.x = 860;
    J.y = 1480;
    TaiWenMuseumSceneContainer.addChild(J);
  }
  function createK() {
    K = new Sprite(resources.K.texture);
    K.x = 940;
    K.y = 1480;
    TaiWenMuseumSceneContainer.addChild(K);
  }
  function createL() {
    L = new Sprite(resources.L.texture);
    L.x = 1020;
    L.y = 1480;
    TaiWenMuseumSceneContainer.addChild(L);
  }
  function createM() {
    M = new Sprite(resources.M.texture);
    M.x = 1100;
    M.y = 1480;
    TaiWenMuseumSceneContainer.addChild(M);
  }
  function createN() {
    N = new Sprite(resources.N.texture);
    N.x = 1180;
    N.y = 1480;
    TaiWenMuseumSceneContainer.addChild(N);
  }
  function createO() {
    O = new Sprite(resources.O.texture);
    O.x = 1260;
    O.y = 1480;
    TaiWenMuseumSceneContainer.addChild(O);
  }
  function createP() {
    P = new Sprite(resources.P.texture);
    P.x = 1340;
    P.y = 1480;
    TaiWenMuseumSceneContainer.addChild(P);
  }
  function createQ() {
    Q = new Sprite(resources.Q.texture);
    Q.x = 1420;
    Q.y = 1480;
    TaiWenMuseumSceneContainer.addChild(Q);
  }
  function createR() {
    R = new Sprite(resources.R.texture);
    R.x = 1500;
    R.y = 1480;
    TaiWenMuseumSceneContainer.addChild(R);
  }
  function createS() {
    S = new Sprite(resources.S.texture);
    S.x = 1580;
    S.y = 1480;
    TaiWenMuseumSceneContainer.addChild(S);
  }
  function createT() {
    T = new Sprite(resources.T.texture);
    T.x = 1660;
    T.y = 1400;
    TaiWenMuseumSceneContainer.addChild(T);
  }
  function createU() {
    U = new Sprite(resources.U.texture);
    U.x = 1740;
    U.y = 1320;
    TaiWenMuseumSceneContainer.addChild(U);
  }
  function createV() {
    V = new Sprite(resources.V.texture);
    V.x = 1820;
    V.y = 1240;
    TaiWenMuseumSceneContainer.addChild(V);
  }
  function createW() {
    W = new Sprite(resources.W.texture);
    W.x = 1980;
    W.y = 1000;
    TaiWenMuseumSceneContainer.addChild(W);
  }
  function createX() {
    X = new Sprite(resources.X.texture);
    X.x = 2060;
    X.y = 920;
    TaiWenMuseumSceneContainer.addChild(X);
  }
  function createY() {
    Y = new Sprite(resources.Y.texture);
    Y.x = 2140;
    Y.y = 840;
    TaiWenMuseumSceneContainer.addChild(Y);
  }
  function createZ() {
    Z = new Sprite(resources.Z.texture);
    Z.x = 2140;
    Z.y = 650;
    TaiWenMuseumSceneContainer.addChild(Z);
  }
  function createNum0() {
    num0 = new Sprite(resources.num0.texture);
    num0.x = 2100;
    num0.y = 560;
    TaiWenMuseumSceneContainer.addChild(num0);
  }
  function createNum1() {
    num1 = new Sprite(resources.num1.texture);
    num1.x = 2060;
    num1.y = 470;
    TaiWenMuseumSceneContainer.addChild(num1);
  }
  function createNum2() {
    num2 = new Sprite(resources.num2.texture);
    num2.x = 2020;
    num2.y = 380;
    TaiWenMuseumSceneContainer.addChild(num2);
  }
  function createNum3() {
    num3 = new Sprite(resources.num3.texture);
    num3.x = 1980;
    num3.y = 290;
    TaiWenMuseumSceneContainer.addChild(num3);
  }
  function createNum4() {
    num4 = new Sprite(resources.num4.texture);
    num4.x = 1940;
    num4.y = 200;
    TaiWenMuseumSceneContainer.addChild(num4);
  }
  function createNum5() {
    num5 = new Sprite(resources.num5.texture);
    num5.x = 1900;
    num5.y = 110;
    TaiWenMuseumSceneContainer.addChild(num5);
  }
  function createNum6() {
    num6 = new Sprite(resources.num6.texture);
    num6.x = 1860;
    num6.y = 20;
    TaiWenMuseumSceneContainer.addChild(num6);
  }
  //JudicialMuseum
  function createJudicialMuseumSheet() {
    let ssheet = PIXI.Texture.from(resources.JudicialMuseumAnimate.texture);
    let w = 546;
    let h = 420;

    JudicialMuseumSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 2 * h, w, h))
    ];
    JudicialMuseumSheet["off"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h))
    ]
  }
  function createJudicialMuseum() {
    JudicialMuseum = new PIXI.extras.AnimatedSprite(JudicialMuseumSheet.off);
    JudicialMuseum.animationSpeed = 0.1;
    JudicialMuseum.loop = false;
    JudicialMuseum.x = 0;
    JudicialMuseum.y = 250;
    MainSceneContainer.addChild(JudicialMuseum);
  }
}
