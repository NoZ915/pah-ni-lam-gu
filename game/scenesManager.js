export default class ScenesManager{
    constructor(){
        this.scenes = {};
        this.currentScene = null;
        this.renderer = PIXI.renderer;
    }
    createScene(id, TScene){
        scenesManager.scenes[id] = TScene;
    }
    goToScene(id){
        if(scenesManager.scenes[id]){
            scenesManager.currentScene = scenesManager.scenes[id];
            scenesManager.scenes[id]();
            return id;
        }
    }
}

const scenesManager = new ScenesManager();