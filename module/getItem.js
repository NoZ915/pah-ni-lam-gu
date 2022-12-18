let textBox = document.querySelector(".text-box");

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
            textBox.classList.remove("noBox");
            textBox.classList.add("display-none");
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

//獲得第一關謎題
export function getNote(itemContainer, mainApp) {
    let loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Container = PIXI.Container;

    let getNote, note, bigNote, ok, getItemContainer;

    loader
        .add("getNote", "./img/getItem/getNote.png")
        .add("note", "./img/getItem/note.png")
        .add("bigNote", "./img/getItem/bigNote.jpeg")
        .add("ok", "./img/getItem/ok.png")
        .load(setup)

    function setup() {
        getItemContainer = new Container;
        itemContainer.addChild(getItemContainer);

        creategetNote();
        createTempleMapItem();
        createbigTempleMap();
        createOk();

        getItemContainer.x = mainApp.screen.width / 2 - getItemContainer.width / 2;
        getItemContainer.y = mainApp.screen.height / 2 - getItemContainer.height / 2;
    }
    //建立獲得第一關謎題道具對話框
    function creategetNote() {
        getNote = new Sprite(resources.getNote.texture);
        getNote.x = 0;
        getNote.y = 0;
        getItemContainer.addChild(getNote);
    }
    //建立道具顯示
    function createbigTempleMap() {
        bigNote = new Sprite(resources.bigNote.texture);
        bigNote.anchor.set(0.5);
        bigNote.x = mainApp.screen.width / 2;
        bigNote.y = 324;
        bigNote.scale.x = 0.5;
        bigNote.scale.y = 0.5;
        itemContainer.addChild(bigNote);
        bigNote.visible = false;

        bigNote.interactive = true;
        bigNote.buttonMode = true;
        bigNote.pointerdown = function () {
            bigNote.visible = false;
        }
    }
    //建立左上角道具小圖
    function createTempleMapItem() {
        note = new Sprite(resources.note.texture);
        note.width = 100;
        note.height = 43;
        note.x = 920;
        note.y = 10;
        itemContainer.addChild(note);
        note.visible = false;

        note.interactive = true;
        note.buttonMode = true;
        note.pointerdown = function () {
            if (!bigNote.visible) {
                bigNote.visible = true;
            }
        }
    }
    function createOk() {
        ok = new Sprite(resources.ok.texture);
        ok.x = getNote.width / 2 - ok.width / 2;
        ok.y = getNote.height - 110;
        getItemContainer.addChild(ok);

        ok.interactive = true;
        ok.buttonMode = true;
        ok.pointerdown = function () {
            getItemContainer.destroy();
            textBox.classList.remove("noBox");
            textBox.classList.add("display-none");
            if (!note.visible) {
                note.visible = true;
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

//獲得識別證
export function getIDcard(itemContainer, mainApp) {
    let loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Container = PIXI.Container,
        Text = PIXI.Text,
        TextStyle = PIXI.TextStyle;

    let getIDcard, IDcard, bigIDcard, ok, getItemContainer, message;

    loader
        .add("getIDcard", "./img/getItem/getIDcard.png")
        .add("IDcard", "./img/getItem/IDcard.png")
        .add("bigIDcard", "./img/getItem/bigIDcard.png")
        .add("ok", "./img/getItem/ok.png")
        .load(setup)

    function setup() {
        getItemContainer = new Container;
        itemContainer.addChild(getItemContainer);

        creategetIDcard();
        createIDcardItem();
        createbigIDcard();
        createOk();

        getItemContainer.x = mainApp.screen.width / 2 - getItemContainer.width / 2;
        getItemContainer.y = mainApp.screen.height / 2 - getItemContainer.height / 2;
    }
    //建立獲得識別證道具對話框
    function creategetIDcard() {
        getIDcard = new Sprite(resources.getIDcard.texture);
        getIDcard.x = 0;
        getIDcard.y = 0;
        getItemContainer.addChild(getIDcard);
    }
    //建立道具顯示
    function createbigIDcard() {
        bigIDcard = new Sprite(resources.bigIDcard.texture);
        bigIDcard.anchor.set(0.5);
        bigIDcard.x = mainApp.screen.width / 2;
        bigIDcard.y = 324;
        itemContainer.addChild(bigIDcard);
        bigIDcard.visible = false;

        let style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 23,
            fill: "black"
        });
        message = new Text(`似乎可以透過這個QRcode聯繫到這張卡片的主人...\n試著聯繫看看，我也不清楚對方是否會有動靜，\n或許可以傳個卡片上的「編號」讓對方知道您的來歷？`, style);
        message.x = 250;
        message.y = getIDcard.y + getIDcard.height + 30;
        itemContainer.addChild(message);
        message.visible = false;

        bigIDcard.interactive = true;
        bigIDcard.buttonMode = true;
        bigIDcard.pointerdown = function () {
            bigIDcard.visible = false;
            message.visible = false;
        }
    }
    //建立左上角道具小圖
    function createIDcardItem() {
        IDcard = new Sprite(resources.IDcard.texture);
        IDcard.x = 740;
        IDcard.y = 10;
        itemContainer.addChild(IDcard);
        IDcard.visible = false;

        IDcard.interactive = true;
        IDcard.buttonMode = true;
        IDcard.pointerdown = function () {
            if (!bigIDcard.visible) {
                bigIDcard.visible = true;
                message.visible = true;
            }
        }
    }
    function createOk() {
        ok = new Sprite(resources.ok.texture);
        ok.x = getIDcard.width / 2 - ok.width / 2;
        ok.y = getIDcard.height - 110;
        getItemContainer.addChild(ok);

        ok.interactive = true;
        ok.buttonMode = true;
        ok.pointerdown = function () {
            getItemContainer.destroy();
            textBox.classList.remove("noBox");
            textBox.classList.add("display-none");
            if (!IDcard.visible) {
                IDcard.visible = true;
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