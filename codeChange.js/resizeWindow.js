const body = document.querySelector(`body`);
const h1 = document.querySelector(`h1`)

function handleResize(){
    const size = window.innerWidth;
    h1.style.color = `white`;
    if(size > 1400){
        body.style.backgroundColor = `#f39c12`;
    }else if(size > 800 && size < 1400){
        body.style.backgroundColor = `#9b59b6`;
    }else if(size < 800){
        body.style.backgroundColor = `#3498db`;
    }
}



function init(){
    window.addEventListener(`resize`, handleResize)
}

init();