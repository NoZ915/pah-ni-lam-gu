export function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  };

export function contain(sprite, container) {

    let collision = undefined;
  
    if (sprite.x < container.x) {
      sprite.x = container.x;
      collision = "left";
    }
    if (sprite.y < container.y) {
      sprite.y = container.y;
      collision = "top";
    }
    if (sprite.x + sprite.width > container.width) {
      sprite.x = container.width - sprite.width;
      collision = "right";
    }
    if (sprite.y + sprite.height > container.height) {
      sprite.y = container.height - sprite.height;
      collision = "bottom";
    }
  
    return collision;
}

export function hitTestRectangle(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;

  r1.centerX = r1.x + r1.width / 2; 
  r1.centerY = r1.y + r1.height / 2; 
  r2.centerX = r2.x + r2.width / 2; 
  r2.centerY = r2.y + r2.height / 2; 

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }
  return hit;
};

//保持玩家置中，並且讓場景保持在screen裡頭
//sprite 角色, scene 場景
//spriteConstainer 角色群組, sceneContainer 場景群組
export function sceneLimit(sprite, spriteContainer, scene, sceneContainer, app){
  let screenCenterX, screenCenterY,
    newScenePosX, newScenePosY;

  screenCenterX = app.screen.width * 0.5;
  screenCenterY = app.screen.height * 0.5;
  newScenePosX = -sprite.x + screenCenterX;
  newScenePosY = -sprite.y + screenCenterY;
  
  if(newScenePosX > 0){
    newScenePosX = 0;
  }
  if(newScenePosX < app.screen.width - scene.width){
    newScenePosX = app.screen.width - scene.width;
  }
  if(newScenePosY > 0){
    newScenePosY = 0;
  }
  if(newScenePosY < app.screen.height - scene.height){
    newScenePosY = app.screen.height - scene.height;
  }
  
  sceneContainer.x = newScenePosX;
  sceneContainer.y = newScenePosY;
  spriteContainer.x = newScenePosX;
  spriteContainer.y = newScenePosY;
}