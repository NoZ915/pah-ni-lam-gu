export function showTempleScene(templeSceneContainer) {
  let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
  let DaChengFang, PanChi, LingXingMen, YiLu, LiMen, DaChengDian, MingHuanCi, XiaoZiCi, RuDeZhiMen, WenChangGe, Wu;

  loader
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
    .load(setup)

  function setup() {
    createWestDaChengFang(templeSceneContainer);
    createEastDaChengFang(templeSceneContainer);
    createPanChi(templeSceneContainer);
    createLingXingMen(templeSceneContainer);
    createYiLu(templeSceneContainer);
    createLiMen(templeSceneContainer);
    createMingHuanCi(templeSceneContainer);
    createXiaoZiCi(templeSceneContainer);
    createDaChengDian(templeSceneContainer);
    createRuDeZhiMen(templeSceneContainer);
    createWenChangGe(templeSceneContainer);
    createWestWu(templeSceneContainer);
    createEastWu(templeSceneContainer);
  }

  function createWestDaChengFang(templeSceneContainer) {
    DaChengFang = new Sprite(resources.DaChengFang.texture);
    DaChengFang.x = 35;
    DaChengFang.y = 3350;
    templeSceneContainer.addChild(DaChengFang);
  }
  function createEastDaChengFang(templeSceneContainer) {
    DaChengFang = new Sprite(resources.DaChengFang.texture);
    DaChengFang.x = 3325;
    DaChengFang.y = 3350;
    templeSceneContainer.addChild(DaChengFang);
  }
  function createPanChi(templeSceneContainer) {
    PanChi = new Sprite(resources.PanChi.texture);
    PanChi.x = 1220;
    PanChi.y = 4080;
    templeSceneContainer.addChild(PanChi);
  }
  function createLingXingMen(templeSceneContainer) {
    LingXingMen = new Sprite(resources.LingXingMen.texture);
    LingXingMen.x = 1265;
    LingXingMen.y = 3480;
    templeSceneContainer.addChild(LingXingMen);
  }
  function createYiLu(templeSceneContainer) {
    YiLu = new Sprite(resources.YiLu.texture);
    YiLu.x = 700;
    YiLu.y = 2620;
    templeSceneContainer.addChild(YiLu);
  }
  function createLiMen(templeSceneContainer) {
    LiMen = new Sprite(resources.LiMen.texture);
    LiMen.x = 1970;
    LiMen.y = 2620;
    templeSceneContainer.addChild(LiMen);
  }
  function createDaChengDian(templeSceneContainer) {
    DaChengDian = new Sprite(resources.DaChengDian.texture);
    DaChengDian.x = 1050;
    DaChengDian.y = 900;
    templeSceneContainer.addChild(DaChengDian);
  }
  function createMingHuanCi(templeSceneContainer) {
    MingHuanCi = new Sprite(resources.MingHuanCi.texture);
    MingHuanCi.x = 1880;
    MingHuanCi.y = 1800;
    templeSceneContainer.addChild(MingHuanCi);
  }
  function createXiaoZiCi(templeSceneContainer) {
    XiaoZiCi = new Sprite(resources.XiaoZiCi.texture);
    XiaoZiCi.x = 560;
    XiaoZiCi.y = 1800;
    templeSceneContainer.addChild(XiaoZiCi);
  }
  function createRuDeZhiMen(templeSceneContainer) {
    RuDeZhiMen = new Sprite(resources.RuDeZhiMen.texture);
    RuDeZhiMen.x = 2400;
    RuDeZhiMen.y = 1820;
    templeSceneContainer.addChild(RuDeZhiMen);
  }
  function createWenChangGe(templeSceneContainer) {
    WenChangGe = new Sprite(resources.WenChangGe.texture);
    WenChangGe.x = 2925;
    WenChangGe.y = 250;
    templeSceneContainer.addChild(WenChangGe);
  }
  function createWestWu(templeSceneContainer) {
    Wu = new Sprite(resources.Wu.texture);
    Wu.x = 700;
    Wu.y = 1370;
    templeSceneContainer.addChild(Wu);
  }
  function createEastWu(templeSceneContainer) {
    Wu = new Sprite(resources.Wu.texture);
    Wu.x = 1985;
    Wu.y = 1370;
    templeSceneContainer.addChild(Wu);
  }
}