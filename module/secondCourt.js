export function showSecondCourt(itemContainer) {
  let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;

  let secondCourtCaontainer, secondCourtAll, secondCourtGreen, secondCourtRed, secondCourtPurple, secondCourtWhite;

  loader
    .add("secondCourtAll", "./img/JudicialMuseumScene/secondCourt/all.png")
    .add("secondCourtGreen", "./img/JudicialMuseumScene/secondCourt/green.png")
    .add("secondCourtRed", "./img/JudicialMuseumScene/secondCourt/red.png")
    .add("secondCourtPurple", "./img/JudicialMuseumScene/secondCourt/purple.png")
    .add("secondCourtWhite", "./img/JudicialMuseumScene/secondCourt/white.png")
    .load(setup)

  function setup() {
    secondCourtCaontainer = new Container;
    itemContainer.addChild(secondCourtCaontainer);

    createSecondCourtAll();
  }

  function createSecondCourtAll() {
    secondCourtAll = new Sprite(resources.secondCourtAll.texture);
    secondCourtCaontainer.addChild(secondCourtAll);
  }
}