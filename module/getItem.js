//getItem模板
export function getItem(itemContainer, mainApp) {
    let loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Container = PIXI.Container;

    let getItemMessage, ok, getItemContainer;

    loader
        .add("getItemMessage", "./img/getItem/getItemMessage.png")
        .add("ok", "./img/getItem/ok.png")
        .load(setup)

    function setup() {
        getItemContainer = new Container;
        itemContainer.addChild(getItemContainer);

        creategetItemMessage();
        createOk();

        getItemContainer.x = mainApp.screen.width / 2 - getItemContainer.width / 2;
        getItemContainer.y = mainApp.screen.height / 2 - getItemContainer.height / 2;
    }
    function creategetItemMessage() {
        getItemMessage = new Sprite(resources.getItemMessage.texture);
        getItemMessage.x = 0;
        getItemMessage.y = 0;
        getItemContainer.addChild(getItemMessage);
    }
    function createOk() {
        ok = new Sprite(resources.ok.texture);
        ok.x = getItemMessage.width / 2 - ok.width / 2;
        ok.y = getItemMessage.height - 110;
        getItemContainer.addChild(ok);

        ok.interactive = true;
        ok.buttonMode = true;
        ok.pointerdown = function () {
            getItemContainer.destroy();
            loader.reset();
        }
        ok.pointerover = function () {
            ok.scale.x = 0.99;
            ok.scale.y = 0.99;
        }
        ok.pointerout = function () {
            ok.scale.x = 1;
            ok.scale.y = 1;
        }
    }
}

//獲得孔廟地圖
export function getTempleMap(itemContainer, mainApp) {
    let loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Container = PIXI.Container;

    let getTempleMap, templeMap, bigTempleMap, ok, getItemContainer;

    loader
        .add("getTempleMap", "./img/getItem/getTempleMap.png")
        .add("templeMap", "./img/getItem/templeMap.png")
        .add("bigTempleMap", "./img/getItem/bigTempleMap.png")
        .add("ok", "./img/getItem/ok.png")
        .load(setup)

    function setup() {
        getItemContainer = new Container;
        itemContainer.addChild(getItemContainer);

        creategetTempleMap();
        createTempleMapItem();
        createbigTempleMap()
        createOk();

        getItemContainer.x = mainApp.screen.width / 2 - getItemContainer.width / 2;
        getItemContainer.y = mainApp.screen.height / 2 - getItemContainer.height / 2;
    }
    //建立獲得孔廟地圖道具對話框
    function creategetTempleMap() {
        getTempleMap = new Sprite(resources.getTempleMap.texture);
        getTempleMap.x = 0;
        getTempleMap.y = 0;
        getItemContainer.addChild(getTempleMap);
    }
    //建立道具顯示
    function createbigTempleMap() {
        bigTempleMap = new Sprite(resources.bigTempleMap.texture);
        bigTempleMap.anchor.set(0.5);
        bigTempleMap.x = mainApp.screen.width / 2;
        bigTempleMap.y = 324;
        bigTempleMap.scale.x = 0.5;
        bigTempleMap.scale.y = 0.5;
        itemContainer.addChild(bigTempleMap);
        bigTempleMap.visible = false;

        bigTempleMap.interactive = true;
        bigTempleMap.buttonMode = true;
        bigTempleMap.pointerdown = function () {
            bigTempleMap.visible = false;
        }
    }
    //建立左上角道具小圖
    function createTempleMapItem() {
        templeMap = new Sprite(resources.templeMap.texture);
        templeMap.width = 64;
        templeMap.height = 64;
        templeMap.x = 850;
        templeMap.y = 10;
        itemContainer.addChild(templeMap);
        templeMap.visible = false;

        templeMap.interactive = true;
        templeMap.buttonMode = true;
        templeMap.pointerdown = function () {
            if (!bigTempleMap.visible) {
                bigTempleMap.visible = true;
            }
        }
    }
    function createOk() {
        ok = new Sprite(resources.ok.texture);
        ok.x = getTempleMap.width / 2 - ok.width / 2;
        ok.y = getTempleMap.height - 110;
        getItemContainer.addChild(ok);

        ok.interactive = true;
        ok.buttonMode = true;
        ok.pointerdown = function () {
            getItemContainer.destroy();
            if (!templeMap.visible) {
                templeMap.visible = true;
            }
            loader.reset();
        }
        ok.pointerover = function () {
            ok.scale.x = 0.99;
            ok.scale.y = 0.99;
        }
        ok.pointerout = function () {
            ok.scale.x = 1;
            ok.scale.y = 1;
        }
    }
}