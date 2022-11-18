export function turnOnAnimate(sprite, animateState) {
    sprite.textures = animateState;
    sprite.loop = true;
    sprite.play();
}
export function turnOffAnimate(sprite, animateState) {
    sprite.loop = false;
    sprite.textures = animateState;
}