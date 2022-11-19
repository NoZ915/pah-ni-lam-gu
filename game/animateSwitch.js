let textBox = document.querySelector(".text-box");
let text = document.querySelector(".text");

export function turnOnAnimate(sprite, animateState) {
    sprite.textures = animateState;
    sprite.loop = true;
    sprite.play();
}
export function turnOffAnimate(sprite, animateState) {
    sprite.loop = false;
    sprite.textures = animateState;
}
export function turnOnText(textClassName, newText){
    if(textBox.classList.contains("display-none")){
        text.innerText = newText;
        textBox.classList.remove("display-none");
        textBox.classList.add(textClassName);
    }
}
export function turnOffText(textClassName){
    if(!textBox.classList.contains("display-none") && textBox.classList.contains(textClassName)){
        textBox.classList.add("display-none");
        textBox.classList.remove(textClassName);
    }
}