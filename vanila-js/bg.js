const body = document.querySelector('body');

const IMG_Number = 4;

function paintImage(imageNumber){
    const image = new Image();
    image.src = `./picture/${imageNumber + 1}.jpg`;
    body.appendChild(image);

}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_Number);
    return number
}

function init(){
    const randomNunber = genRandom();
    paintImage(randomNunber)
}


init();