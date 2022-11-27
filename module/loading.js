export function showLoadingPage(mainApp, func) {
  let loader = PIXI.loader,
    resources = PIXI.loader.resources;
  let loading;
  let loadingSheet = {};
  loader
    .add("loadingAnimate", "./img/loading/loading.png")
    .load(setup)

  function setup() {
    createloadingSheet();
    createloading();

    let percent = 0;
    let timer = setInterval(function () {
      percent += 1;
      console.log(percent)
      if (percent > 100) {
        func();
        clearInterval(timer);
        loading.destroy();
        loader.reset();
      }
    }, 20)
  }

  function createloadingSheet() {
    let ssheet = PIXI.Texture.from(resources.loadingAnimate.texture);
    let w = 1024;
    let h = 648;

    loadingSheet["on"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 2 * h, w, h))
    ];
  }
  function createloading() {
    loading = new PIXI.extras.AnimatedSprite(loadingSheet.on);
    loading.animationSpeed = 0.1;
    loading.loop = true;
    loading.x = 0;
    loading.y = 0;
    loading.play();
    mainApp.stage.addChild(loading);
  }
}